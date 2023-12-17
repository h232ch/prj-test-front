import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list.component";

const routes: Routes = [
  // change this to lazy loading
  // {path: 'shopping-list', component: ShoppingListComponent},
  {path: '', component: ShoppingListComponent},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}
