use super::prelude::*;

// https://serde.rs/enum-representations.html
#[derive(Debug, Serialize, Deserialize, TypeScriptDefinition)]
#[serde(tag = "e", content = "c")]
#[ts(factory_return_name = "Executor")]
pub enum ToExecutor {
    Ping,
    SetDebug(bool),
}

// https://serde.rs/enum-representations.html
#[derive(Debug, Serialize, TypeScriptDefinition)]
#[serde(tag = "t", content = "c")]
#[ts(handler_name = "UI")]
pub enum ToUI {
    Pong,
    DebugMessage { context: String, message: String },
}

// https://serde.rs/enum-representations.html
#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct Position {
    x: usize,
    y: usize,
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
#[serde(tag = "t", content = "c")]
pub enum Renderable {
    Character(String),
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct Hero {}

#[derive(Debug, Serialize, TypeScriptDefinition)]
#[serde(tag = "t", content = "c")]
pub enum InputCommand {
    MoveDown,
    MoveUp,
    MoveLeft,
    MoveRight,
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct InputCommands(Vec<InputCommand>);