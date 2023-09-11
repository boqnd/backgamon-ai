import { WeightTable } from "./WeightTable";
import {
  Table,
  Dise,
  Die,
  Point,
  PointNumber,
  MoveTwo,
  MoveOne,
  TakenPieces,
} from "./types";

export const NUMBER_OF_POINTS = 24;

let w = new WeightTable();

function getMovesWithOne(
  currTable: Table,
  currDie: Die,
  takenPieces: TakenPieces
): MoveOne[] {
  let moves: MoveOne[] = [];

  if (takenPieces === 0) {
    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
      if (currTable[i] <= 0) continue; // No friendly pieces on this point

      if (i + currDie >= NUMBER_OF_POINTS) {
        if (!isEndGame(takenPieces, currTable)) continue;

        let temp: Table = [...currTable];
        temp[i]--;
        moves.push({
          tableBefore: currTable,
          tableAfter: temp,
          // @ts-ignore
          moveFrom: i,
          die: currDie,
          weight: w.getWeight(currTable[i], currTable[i + currDie]),
          takenPieces: 0,
        });
        continue;
      }

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
        takenPieces: 0,
      });
    }
  } else {
    if (currTable[currDie-1] < -1) return [];

    let temp: Table = [...currTable];

    if (currTable[currDie-1] === -1) temp[currDie-1]++;
    temp[currDie-1]++;

    moves.push({
      tableBefore: currTable,
      tableAfter: temp,
      // @ts-ignore
      moveFrom: -1,
      die: currDie,
      weight: w.getWeight(1, currTable[currDie-1]),
      // @ts-ignore
      takenPieces: takenPieces-1,
    });
  }

  return moves;
}

function isEndGame(takenPieces: TakenPieces, table: Table): boolean {
  if (takenPieces) return false;

  for (let i = 0; i < NUMBER_OF_POINTS - 6; i++) {
    if (table[i] > 0) return false;
  }

  return true;
}

export class Game {
  private table: Table;
  private dise: Dise;
  private takenPieces: TakenPieces;
  private enemyTakenPieces: TakenPieces;

  constructor(
    table: Table,
    dise: Dise,
    takenPieces: TakenPieces,
    enemyTakenPieces: TakenPieces
  ) {
    this.table = table;
    this.dise = dise;
    this.takenPieces = takenPieces;
    this.enemyTakenPieces = enemyTakenPieces;
  }

  private getMoves(die1: Die, die2: Die): MoveTwo[] {
    let firstMoves: MoveOne[] = getMovesWithOne(
      this.table,
      die1,
      this.takenPieces
    );
    let secondMoves: MoveTwo[] = [];

    for (let firstMove of firstMoves) {
      for (let secondMove of getMovesWithOne(firstMove.tableAfter, die2, firstMove.takenPieces)) {
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
