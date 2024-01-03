import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert.component";
import {DropdownDirective} from "./dropdown/dropdown.directive";
import {DropdownHeaderDirective} from "./dropdown/dropdown-header.directive";
import {PaginationComponent} from "./pagination/pagination.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    DropdownHeaderDirective,
    PaginationComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    AlertComponent,
    DropdownDirective,
    DropdownHeaderDirective,
    PaginationComponent,
    LoadingSpinnerComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class SharedModule {

}
