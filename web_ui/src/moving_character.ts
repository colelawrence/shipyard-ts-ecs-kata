import { ui } from "./executor";
import { iter, unique, system } from "shipyard";
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
          for (const [_, pos] of iter(v.hero, v.pos)) {
            pos.y += 1;
          }
        },
        onMoveLeft() {
          for (const [_, pos] of iter(v.hero, v.pos)) {
            pos.x -= 1;
          }
        },
        onMoveRight() {
          for (const [_, pos] of iter(v.hero, v.pos)) {
            pos.x += 1;
          }
        },
        onMoveUp() {
          for (const [_, pos] of iter(v.hero, v.pos)) {
            pos.y -= 1;
          }
        },
      })(command);
    }
  }
);
