// @ts-check
const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class TransformFilesPlugin {
  /**
   * @param {{inputFile: string, transformToOutputs: { [outputFile: string]: (inputFile: string, existingFile?: string) => string | null } }} options
   */
  constructor(options) {
    this.inputFile = options.inputFile;
    this.transformToOutputs = options.transformToOutputs;
  }

  /** @param {import("webpack").Compiler} compiler */
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("TransformFilesPlugin", () =>
      readFileAsync(this.inputFile, "utf8").then((inputContents) =>
        Promise.all(
          Object.entries(this.transformToOutputs).map(([outPath, transform]) =>
            readFileAsync(outPath, "utf8")
              .catch((_noneExists) => null)
              .then((outPathContents) =>
                transform(inputContents, outPathContents)
              )
              .then((transformResult) =>
                transformResult != null
                  ? writeFileAsync(outPath, transformResult)
                  : Promise.resolve()
              )
          )
        )
      )
    );
  }
}

exports.TransformFilesPlugin = TransformFilesPlugin;
