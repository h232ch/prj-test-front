import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {SharedModule} from "../shared/shared.module";
import {UserRoutingModule} from "./user-routing/user-routing.module";
import {RouterOutlet} from "@angular/router";


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
        RouterOutlet,
    ],
})
export class UserModule {

}
