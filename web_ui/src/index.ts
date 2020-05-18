import "./index.css";

// must be code split for wasm to be loaded, because we use many type imports from index.fixed, which marks all dependents on src/executor as synchronously needing the WASM module
// WASM modules must be loaded behind an asynchronous module, though.
import("./app").catch(console.error.bind(console, "error importing app"));
