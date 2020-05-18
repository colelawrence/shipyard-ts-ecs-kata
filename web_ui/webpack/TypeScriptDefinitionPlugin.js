// @ts-check
const prettier = require("prettier");
const { TransformFilesPlugin } = require("./TransformFilesPlugin");

module.exports = class TypeScriptDefinitionPlugin extends TransformFilesPlugin {
  /**
   *
   * @param {Object} options
   * @param {string} options.inputDTsFile
   * @param {string} options.outputTsFile for now, this must be in the same folder as index_bg.wasm & index_bg.js
   * @param {import("prettier").Options} [options.prettierOptions] specify some options for prettier output
   */
  constructor({ inputDTsFile, outputTsFile, prettierOptions = {} }) {
    super({
      inputFile: inputDTsFile,
      transformToOutputs: {
        // String replace content index.d.ts into writing index.fixed.ts
        [outputTsFile]: (input, prevOutputContents) => {
          let inputHashID = `#GenerationInputHash=${hash(input)}#`;
          if (
            prevOutputContents &&
            prevOutputContents.indexOf(inputHashID) > -1
          ) {
            // transform will have no effect since previous output was generated from the same input
            return null;
          }

          // start with hash so we can check in the future if the input is the same
          // This approach works even after formatting the file since we hash the input.
          let toWrite = `
            // ${inputHashID}
            // @ts-ignore
            import * as wasm from "./index_bg.wasm";
            export * from "./index_bg.js";
            wasm.__wbindgen_start();
          `;

          {
            // Unwrap all starts/ends value blocks
            const re = /type __StartValuesFor__(\w+)__ = `([\s\S]+)`\/\*EndValuesFor__\1__\*\//g;
            const seenEnums = new Set();
            toWrite += input
              .replace(re, "$2")
              .replace(
                /^export function (.+);$/gm,
                // add declaration for body-less functions
                "export declare function $1;"
              )
              // remove duplicate enums since they are included in both the value and declaration space
              .replace(/export enum (\w+)\s*\{[^\}]+\}/g, function (
                full,
                name
              ) {
                if (seenEnums.has(name)) {
                  return "";
                } else {
                  seenEnums.add(name);
                  return full;
                }
              });
          }

          return prettier.format(toWrite, {
            ...prettierOptions,
            parser: "typescript",
          });
        },
      },
    });
  }
};

// Hash string to string
function hash(str) {
  let hash = 0;
  let char;
  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return ((Math.abs(hash) % 10000) * 0.0001).toString(36).slice(2);
}
