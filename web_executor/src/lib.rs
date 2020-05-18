//! This library is imported via wasm and bridges the gaps between the executor (rust/wasm) and the ui (typescript)
//! We are also providing generated type definitions shared between rust and typescript (rust being the source of truth)
//! The equivalent bridging code on the TypeScript side lives in src/web_executor.ts

// tutorial from https://www.youtube.com/watch?v=yEiGVCF99tA
// Extended references to https://rustwasm.github.io/docs/wasm-bindgen/print.html
// TODO:
// - Pass objects to and from JavaScript via "API" with proper type definitions
//      near here: https://rustwasm.github.io/docs/wasm-bindgen/print.html#send-it-to-javascript-with-jsvaluefrom_serde
extern crate console_error_panic_hook;

pub use serde;
pub use serde::{Deserialize, Serialize};
pub use serde_json;
pub use typescript_definitions;

use wasm_bindgen::prelude::*;

pub mod executor;

pub mod prelude {
    // needed for TypeScriptDefinition
    pub use wasm_bindgen::prelude::*;

    pub use serde;
    pub use serde_json;
    pub use typescript_definitions;

    pub use serde::{Deserialize, Serialize};

    pub use typescript_definitions::TypeScriptDefinition;
}

#[wasm_bindgen(start)]
pub fn start() -> Result<(), JsValue> {
    // print pretty errors in wasm https://github.com/rustwasm/console_error_panic_hook
    console_error_panic_hook::set_once();
    Ok(())
}
