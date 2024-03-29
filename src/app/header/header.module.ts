import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {SharedModule} from "../shared/shared.module";
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    RouterLinkActive,
    RouterLinkWithHref,
  ],
})
export class HeaderModule {

}
