import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from './main/main.component';
import {AuthModule} from "./auth/auth.module";
import {BoardModule} from "./board/board.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {UserModule} from "./user/user.module";
import {HeaderModule} from "./header/header.module";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HeaderModule,
    SharedModule,
    AuthModule,
    BoardModule,
    UserModule,
    CoreModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
