export class GameModel {
  public cells: boolean[][]
  public rows: number
  public cols: number

  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols
    this.cells = new Array(rows).fill([]).map(a => new Array(cols).fill(false))
  }
}
