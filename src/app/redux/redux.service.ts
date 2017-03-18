import { Injectable } from '@angular/core'
import { GameModel } from './game-model'
import { Store } from './store'
import { ReducersService } from './reducers.service'

@Injectable()
export class ReduxService {
  private _store: Store<GameModel>

  constructor(reducersService: ReducersService) {
    this._store = new Store<GameModel>(
      reducersService.getReducers(),
      new GameModel(30, 30)
    )
  }

  public getStore(): Store<GameModel> {
    return this._store
  }
}
