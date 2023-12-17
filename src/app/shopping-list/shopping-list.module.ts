import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingListRoutingModule} from "./shopping-list.routing.module";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  exports: [
    // ShoppingListComponent,
    // ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    // this module provides common libraries of Angular like 'ngFor', 'ngIf'
    // CommonModule,
    FormsModule,
    // There are shared modules in the SharedModule includes "CommonModule"
    SharedModule,
    ShoppingListRoutingModule,
  ],
  providers: [
    // It will be used in shopping list components only because we declared this here
    // It means the logging service instance is different with app component used (It's not an application wide instance)
    // Because we declared this in shopping list module like below
    // LoggingService,
  ]
})
export class ShoppingListModule {

}
