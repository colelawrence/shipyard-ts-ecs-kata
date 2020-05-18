import { ui } from "./executor";
import { invariant } from "@helpers";
import { World } from "shipyard";

const world = new World();

const gameElt = document.getElementById("game");
invariant(gameElt, "Game element must be present");

const pseudo = `
`;
world.add_entity([ui.Renderable], [ui.Renderable.GridSquare("blue")]);
console.log(world)

setInterval(() => {}, 1000 / 60);
