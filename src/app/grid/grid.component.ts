import { Component, OnInit } from '@angular/core';
import { ReduxService } from '../redux/redux.service'
import { GameModel } from '../redux/game-model'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  cells: boolean[][] = []

  constructor(private reduxService: ReduxService) {
  }

  ngOnInit() {
    this.reduxService.getStore().subscribe((state: GameModel) => {
      this.cells = state.cells
    })
  }
}
