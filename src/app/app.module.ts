import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from './main/main.component';
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
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
    // It's really important to apply lazy-loading, skip the board, user module for this
    // BoardModule,
    // UserModule,
    CoreModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
