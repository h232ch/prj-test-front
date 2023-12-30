import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "../user.component";
import {UserInfoComponent} from "../user-info/user-info.component";

const appRoutes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'info', component: UserInfoComponent }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {

}
