import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'auth', component: AuthComponent}
    ])
  ],
})
export class AuthModule {

}
