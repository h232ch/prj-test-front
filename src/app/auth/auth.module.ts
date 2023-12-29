import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthComponent} from "./auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from "../shared/alert/alert.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class AuthModule {

}
