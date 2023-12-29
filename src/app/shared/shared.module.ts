import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert.component";
import {DropdownDirective} from "./dropdown/dropdown.directive";
import {DropdownHeaderDirective} from "./dropdown/dropdown-header.directive";
import {FormControlComponent} from "./form-control/form-control.component";
import {PaginationComponent} from "./pagination/pagination.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    DropdownHeaderDirective,
    FormControlComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    AlertComponent,
    DropdownDirective,
    DropdownHeaderDirective,
    FormControlComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    HttpClientModule,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SharedModule {

}
