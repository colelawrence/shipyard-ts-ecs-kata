import { ui } from "./executor";
import { iterComponents, system } from "shipyard";

export const velocity_system = system(
  {
    velocity: ui.Velocity,
    position: ui.Position,
  },
  (v) => {
    for (const [pos, vel] of iterComponents(v.position, v.velocity)) {
      pos.x += vel.x;
      pos.y += vel.y;
    }
  }
);
