import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {SharedModule} from "../shared/shared.module";
import {UserRoutingModule} from "./user-routing/user-routing.module";


@NgModule({
  declarations: [
    UserComponent,
    UserInfoComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ],
})
export class UserModule {

}
