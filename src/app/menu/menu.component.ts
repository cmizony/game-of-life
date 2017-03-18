import { Component, OnInit } from '@angular/core';
import { ReduxService } from '../redux/redux.service'
import { GameModel } from '../redux/game-model'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  rows: number | string
  cols: number | string
  play: boolean = false
  speed: number = 0.5
  timeout: number

  constructor(private reduxService: ReduxService) {}

  ngOnInit() {
    this.reduxService.getStore().subscribe((state: GameModel) => {
      this.rows = state.rows
      this.cols = state.cols
    })
  }

  startGame() {
    clearTimeout(this.timeout)
    if (this.play) {
      this.timeout = setInterval(() => {
        this.nextState()
      }, this.speed * 1000)
    }
  }

  togglePlay(): void {
    this.play = !this.play
    this.startGame()
  }

  reset(): void {
    clearTimeout(this.timeout)
    this.reduxService.getStore().dispatch({ type: 'RESET' })
  }

  nextState(): void {
    this.reduxService.getStore().dispatch({ type: 'NEXT' })
  }

  onKey():void {
    this.reduxService.getStore().dispatch({
      type: 'GRID_SIZE',
      payload: {
        first: Number.parseInt(<string>this.rows),
        second: Number.parseInt(<string>this.cols)
      }
    })
  }

}
