export class List {
  public static mergeLinear(...args: List[]): List {
    let retList = new List([]);
    args.forEach((value: List) => {
      retList = retList.merge(value);
    });
    return retList;
  }
  public static mergeTournament(...args: List[]): List {
    return List._mergeTournament(args);
  }
  private static _mergeTournament(args: List[]): List {
    let results: List[] = [];
    for (let i = 0; i < args.length; i = i + 2) {
      if (i + 1 < args.length) {
        results.push(args[i].merge(args[i + 1]));
      } else {
        results.push(args[i]);
      }
    }
    if (results.length === 0) {
      return new List([]);
    } else if (results.length === 1) {
      return results[0];
    } else {
      return List._mergeTournament(results);
    }
  }

  constructor(private _list: number[]) { }

  public merge(other: List): List {
    let i = 0, j = 0;
    let retArray: number[] = [];
    while (i < this._list.length || j < other._list.length) {
      if (j >= other._list.length) {
        // only this left
        retArray = retArray.concat(this._list.slice(i));
        i = this._list.length;
      } else if (i >= this._list.length) {
        // only other left
        retArray = retArray.concat(other._list.slice(j));
        j = other._list.length;

      } else if (this._list[i] <= other._list[j]) {
        retArray.push(this._list[i]);
        i++;
      } else {
        retArray.push(other._list[j]);
        j++;
      }
    }
    return new List(retArray);
  }

  public length(): number {
    return this._list.length;
  }
  public get(i: number): number {
    if (i >= this._list.length) {
      throw new RangeError('Index out of bounds.');
    }
    return this._list[i];
  }
}
