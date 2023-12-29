import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterLinkActive} from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import {AuthModule} from "./auth/auth.module";
import {BoardModule} from "./board/board.module";
import {HeaderModule} from "./header/header.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,

    MainComponent,
    UserComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLinkActive,

    SharedModule,
    AuthModule,
    BoardModule,
    HeaderModule,
    CoreModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
