import hamburger from "./animations/hamburger.json";
import spinner from "./animations/spin.json";
import world from "./animations/world.json";
import search from "./animations/search.json";

const animations = {
  spinner,
  world,
  hamburger,
  search,
};

export type AnimationName = keyof typeof animations;

export { animations };
