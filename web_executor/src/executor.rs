use super::prelude::*;

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct Position {
    x: usize,
    y: usize,
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct Velocity {
    x: usize,
    y: usize,
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct Size {
    width: usize,
    height: usize,
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct WalkTowards {
    id: String,
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct Renderable {
    imageID: String,
    origin_x: usize,
    origin_y: usize,
    width: usize,
    height: usize,
}

#[derive(Debug, Serialize, TypeScriptDefinition)]
pub struct Hero {
    speed: i32,
}

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
