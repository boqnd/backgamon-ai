import { Table, Dise, Die, Point, PointNumber } from "./types";
import { Game } from "./Game";

const init_table: Table = [
  2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2,
];
const init_dise: Dise = [2, 1];

//тук трябва да мести по скоро първите
// const init_table: Table = [
//   2, 0, 0, 0, 0, -5, 0, -4, 0, 0, 0, 5, -4, 0, 0, 0, 2, 0, 4, 2, 0, 0, 0, -2,
// ];
// const init_dise: Dise = [5, 1];

//не съм направил взимане още
// const init_table: Table = [
//   0, 2, 0, 0, 0, -4, 0, -4, 0, 0, 0, 4, -4, 0, 0, -1, 3, 0, 3, 3, 0, -2, 0, 0,
// ];
// const init_dise: Dise = [5, 1];

// const init_table: Table = [
//   0, -1, 2, 0, -3, -2, -1, -3, 1, 0, 0, 4, -3, 0, 0, 0, 4, 0, 4, 0, 0, 0, -2, 0,
// ];
// const init_dise: Dise = [6,3];

//за еднакъв ход различно го смята, и е грешен хода
// const init_table: Table = [
//   0, 2, 0, 0, 0, -4, 0, -4, 0, -2, 0, 3, -3, 0, 0, 0, 3, 1, 2, 3, 0, -2, 1, 0,
// ];
// const init_dise: Dise = [4, 2];

let game = new Game(init_table, init_dise);

let m = game.getAllMoves();
m = m.sort((x, y) => {
  if (x.weight > y.weight) return 1;
  if (x.weight < y.weight) return -1;
  return 0;
});
console.log(m);
