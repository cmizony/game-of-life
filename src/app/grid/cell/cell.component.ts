import { Component, OnInit, Input } from '@angular/core';
import { ReduxService } from '../../redux/redux.service'

@Component({
  selector: 'grid-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor(private reduxService: ReduxService) {
  }

  @Input() x: number
  @Input() y: number
  @Input() value: number

  ngOnInit() {
  }

  clickCell() {
    this.reduxService.getStore().dispatch({
      type: 'TOGGLE',
      payload: {first: this.x, second: this.y}
    })
  }
}
