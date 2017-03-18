import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { CellComponent } from './grid/cell/cell.component';
import { ReduxService } from './redux/redux.service';
import { ReducersService } from './redux/reducers.service'
import { MenuComponent } from './menu/menu.component'

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ReduxService,
    ReducersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
