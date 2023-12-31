import {NgModule} from "@angular/core";
import {BoardComponent} from "./board.component";
import {BoardEditComponent} from "./board-edit/board-edit.component";
import {BoardListComponent} from "./board-list/board-list.component";
import {BoardDetailComponent} from "./board-detail/board-detail.component";
import {SharedModule} from "../shared/shared.module";
import {BoardRoutingModule} from "./board-routing/board-routing.module";
import {RouterOutlet} from "@angular/router";
import { BoardSearchComponent } from './board-search/board-search.component';


@NgModule({
  declarations: [
    BoardComponent,
    BoardEditComponent,
    BoardListComponent,
    BoardDetailComponent,
    BoardSearchComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
    BoardRoutingModule,
    RouterOutlet,
  ],
})
export class BoardModule {

}
