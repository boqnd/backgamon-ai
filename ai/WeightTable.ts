import { Point } from "./types";

export class WeightTable {
  private weights;

  constructor() {
    this.weights = {
      one_one: 120,
      many_one: 110,
      one_two: 100,
      one_many: 90,

      many_two: 80,
      many_many: 70,

      one_zero: 60,
      two_one: 50,

      many_zero: 40,
      two_two: 30,
      two_many: 20,
      two_zero: 10,
    };
  }

  public getWeight(pointFrom: Point, pointTo: Point): number {
    if (pointFrom === 1) {
      if (pointTo === 0) return this.weights.one_zero;
      if (pointTo === 1) return this.weights.one_one;
      if (pointTo === 2) return this.weights.one_two;
      if (pointTo > 2) return this.weights.one_many;
      return 0;
    } else if (pointFrom === 2) {
      if (pointTo === 0) return this.weights.two_zero;
      if (pointTo === 1) return this.weights.two_one;
      if (pointTo === 2) return this.weights.two_two;
      if (pointTo > 2) return this.weights.two_many;
      return 0;
    } else if (pointFrom > 2) {
      if (pointTo === 0) return this.weights.many_zero;
      if (pointTo === 1) return this.weights.many_one;
      if (pointTo === 2) return this.weights.many_two;
      if (pointTo > 2) return this.weights.many_many;
      return 0;
    }
    return 0;
  }
}
