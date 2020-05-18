import { ui } from "./executor";
import { invariant } from "@helpers";
import { World, iter } from "shipyard";

const world = new World();

const gameElt = document.getElementById("game");
invariant(gameElt, "Game element must be present");

const pseudo = `
`;
const entity = world.add_entity(
  [ui.Renderable],
  [ui.Renderable.GridSquare("blue")]
);
world.add_component(
  entity,
  [ui.Point],
  [
    ui.Point({
      x: 0,
      y: 0,
    }),
  ]
);
console.log(world);

world.run(
  {
    renderable: ui.Renderable,
    points: ui.Point,
  },
  (v) => {
    for (const square of v.renderable.iter()) {
      console.log(square);
    }
    for (const [renderable, { x, y }] of iter(v.renderable, v.points)) {
      
    }
  }
);

setInterval(() => {}, 1000 / 60);
