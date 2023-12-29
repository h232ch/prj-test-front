import {NgModule} from "@angular/core";
import {BoardComponent} from "./board.component";
import {BoardEditComponent} from "./board-edit/board-edit.component";
import {BoardListComponent} from "./board-list/board-list.component";
import {BoardDetailComponent} from "./board-detail/board-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {PaginationComponent} from "../shared/pagination/pagination.component";
import {AppRoutingModule} from "../app-routing.module";
import {DropdownDirective} from "../shared/dropdown/dropdown.directive";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    BoardComponent,
    BoardEditComponent,
    BoardListComponent,
    BoardDetailComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
  ],
})
export class BoardModule {

}
