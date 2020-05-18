import { ui } from "./executor";
import { invariant } from "@helpers";
import { World, iter, unique } from "shipyard";
import { GridRender } from './GridRender';

function NewGame(viewElt: HTMLCanvasElement) {
  invariant(
    viewElt instanceof HTMLCanvasElement,
    `Game element must be a HTMLCanvaseElement, but got ${viewElt.toString()}`
  );
  const renderer = new GridRender(viewElt.getContext("2d")!, 20, 20);
  const world = new World();
  let keypresses: ui.InputCommand[] = [];
  world.add_unique(ui.InputCommands, ui.InputCommands(keypresses));

  document.addEventListener("keydown", function ({ key }) {
    switch (key) {
      case "ArrowLeft":
        keypresses.push(ui.InputCommand.MoveLeft());
        break;
      case "ArrowRight":
        keypresses.push(ui.InputCommand.MoveRight());
        break;
      case "ArrowDown":
        keypresses.push(ui.InputCommand.MoveDown());
        break;
      case "ArrowUp":
        keypresses.push(ui.InputCommand.MoveUp());
        break;
      default:
        console.log(`Unhandled key "${key}"`);
        return;
    }

    world.run_default();
  });

  world.add_entity(
    [ui.Renderable, ui.Hero, ui.Position],
    [
      ui.Renderable.Character("&"),
      ui.Hero({}),
      ui.Position({
        x: 2,
        y: 6,
      }),
    ]
  );

  world
    .add_workload("default")
    .with_system(
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
    )
    .with_system(
      {
        pos: ui.Position,
        renderable: ui.Renderable,
      },
      (v) => {
        renderer.fillAll("white");
        for (const [renderable, pos] of iter(v.renderable, v.pos)) {
          ui.applyRenderable({
            onCharacter(char) {
              renderer.draw(pos.x, pos.y, char, "black");
            },
          })(renderable);
        }
      }
    )
    .build();
}

NewGame(document.getElementById("game") as HTMLCanvasElement);
