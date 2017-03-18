import { Injectable } from '@angular/core'
import { GameModel } from './game-model'
import { Store } from './store'
import { Action } from './action'

interface Pair {
  first: number,
  second: number
}

@Injectable()
export class ReduxService {
  private _store: Store<GameModel>

  constructor() {
    const reducer = (state: GameModel, action: Action) => {
      console.log(`[Redux] Processing event "${action.type}"`, action.payload)
      switch (action.type) {
        case 'TOGGLE': return this.toggle(state, <Pair>action.payload)
        case 'GRID_SIZE': return this.resizeGrid(state,<Pair>action.payload)
        case 'NEXT': return this.nextState(state)
        case 'RESET': return this.resetState(state)
      }
      console.warn(`State ${action.type} not recognized`, action)
      return state
    }
    this._store = new Store<GameModel>(
      reducer,
      new GameModel(30, 30)
    )
  }

  public getStore(): Store<GameModel> {
    return this._store
  }

  private isInGrid = (gameModel: GameModel, x: number, y: number): boolean =>
    x > 0 && x < gameModel.rows && y > 0 && y < gameModel.cols

  /**
   * Look at 8 cells around within the grid
   */
  private numberNeighboor(
    gameModel: GameModel,
    x: number,
    y: number): number {
    let counter:number  = 0

    for(let i = x-1 ; i <= x+1; i++) {
      for(let j = y-1 ; j <= y+1; j++) {
        if (this.isInGrid(gameModel, i, j) &&
            !(i === x && j == y) &&
            gameModel.cells[i][j]) {
          counter++
        }
      }
    }

    return counter
  }

  /**
   * Rule 1 - Less two neighboor
   * Rule 2 - Two or three live
   * Rule 3 - More than 3
   * Rule 4 - Exactly 3
   */
  private nextState(state: GameModel): GameModel {
    let newGrid: boolean[][] = JSON.parse(JSON.stringify(state.cells))

    for (let x = 0 ; x < state.rows ; x++) {
      for(let y = 0 ; y < state.cols ; y++) {
        const neighboor: number = this.numberNeighboor(state, x, y)

        if (state.cells[x][y]) { // Living Cell

          if (neighboor < 2)  // Rule 1
            newGrid[x][y] = false
          else if (neighboor == 2 || neighboor == 3) // Rule 2
            newGrid[x][y] = true
          else // Rule 3
            newGrid[x][y] = false

        } else { // Dead Cell
          if (neighboor == 3) // Rule 3
            newGrid[x][y] = true
        }
      }
    }

    state.cells = newGrid
    return state
  }

  private resetState(state: GameModel) {
    return new GameModel(state.rows, state.cols)
  }

  private resizeGrid(state: GameModel, size: Pair): GameModel {
    const rows:number = size.first
    const cols:number = size.second

    if (!rows || !cols || rows <= 0 || cols <= 0) {
      console.error(`Invalid GRID_SIZE - values must be positive`, size)
      return state
    }

    return new GameModel(rows, cols)
  }

  private toggle(state: GameModel, position: Pair): GameModel {
    const x: number = position.first
    const y: number = position.second

    if (x >= state.rows ||
        y >= state.cols) {
      console.error(`Invalid toggle payload for given store size`, state, position)
      return state
    }

    state.cells[x][y] = !state.cells[x][y]
    return state
  }
}
