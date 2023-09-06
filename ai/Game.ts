import { WeightTable } from "./WeightTable";
import {
  Table,
  Dise,
  Die,
  Point,
  PointNumber,
  MoveTwo,
  MoveOne,
} from "./types";

export const NUMBER_OF_POINTS = 24;

let w = new WeightTable();

function getMovesWithOne(currTable: Table, currDie: Die): MoveOne[] {
  let moves: MoveOne[] = [];

  for (let i = 0; i < NUMBER_OF_POINTS; i++) {
    if (currTable[i] <= 0) continue; // No friendly pieces on this point
    if (i + currDie >= NUMBER_OF_POINTS) continue; // TODO: logic for end game
    if (currTable[i + currDie] < -1) continue; // Landing point has many enemy piences

    let temp: Table = [...currTable];
    temp[i]--;
    if (currTable[i + currDie] === -1) temp[i + currDie]++;
    temp[i + currDie]++;
    moves.push({
      tableBefore: currTable,
      tableAfter: temp,
      // @ts-ignore
      moveFrom: i,
      die: currDie,
      weight: w.getWeight(currTable[i], currTable[i + currDie]),
    });
  }

  return moves;
}

export class Game {
  private table: Table;
  private dise: Dise;

  constructor(table: Table, dise: Dise) {
    this.table = table;
    this.dise = dise;
  }

  private getMoves(die1: Die, die2: Die): MoveTwo[] {
    let firstMoves: MoveOne[] = getMovesWithOne(this.table, die1);
    let secondMoves: MoveTwo[] = [];

    for (let firstMove of firstMoves) {
      for (let secondMove of getMovesWithOne(firstMove.tableAfter, die2)) {
        secondMoves.push({
          firstMove,
          secondMove,
          weight: firstMove.weight + secondMove.weight,
        });
      }
    }

    return secondMoves;
  }

  public getAllMoves(): MoveTwo[] {
    let moves: MoveTwo[] = [
      ...this.getMoves(this.dise[0], this.dise[1]),
      ...this.getMoves(this.dise[1], this.dise[0]),
    ];

    return moves;
  }
}
