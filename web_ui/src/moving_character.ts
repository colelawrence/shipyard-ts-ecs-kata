import { ui } from "./executor";
import { iterComponents, unique, system } from "shipyard";

// TODO 2: Movement
// Make moving affect the velocity with a cap rather than affecting the position directly

export const moving_character = system(
  {
    inputCommands: unique(ui.InputCommands),
    hero: ui.Hero,
    pos: ui.Position,
  },
  (v) => {
    let command: ui.InputCommand | undefined;
    while ((command = v.inputCommands.shift())) {
      ui.applyInputCommand({
        onMoveDown() {
          for (const [{ speed }, pos] of iterComponents(v.hero, v.pos)) {
            pos.y += speed;
          }
        },
        onMoveLeft() {
          for (const [{ speed }, pos] of iterComponents(v.hero, v.pos)) {
            pos.x -= speed;
          }
        },
        onMoveRight() {
          for (const [{ speed }, pos] of iterComponents(v.hero, v.pos)) {
            pos.x += speed;
          }
        },
        onMoveUp() {
          for (const [{ speed }, pos] of iterComponents(v.hero, v.pos)) {
            pos.y -= speed;
          }
        },
      })(command);
      console.log(v.pos)
    }
  }
);
