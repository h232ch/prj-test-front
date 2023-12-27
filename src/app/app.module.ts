import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { AuthComponent } from './auth/auth.component';
import { RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { MainComponent } from './main/main.component';
import { BoardListComponent } from './board/board-list/board-list.component';
import { BoardDetailComponent } from './board/board-detail/board-detail.component';
import { BoardEditComponent } from './board/board-edit/board-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import {ReactiveFormsModule} from "@angular/forms";
import { DropdownHeaderDirective } from './shared/dropdown-header.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {DataStorageService} from "./shared/data-storage.service";
import {BoardService} from "./board/board.service";
import { FormControlComponent } from './shared/form-control/form-control.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PaginationComponent } from './shared/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    AuthComponent,
    MainComponent,
    BoardListComponent,
    BoardDetailComponent,
    BoardEditComponent,
    DropdownDirective,
    DropdownHeaderDirective,
    FormControlComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLinkWithHref,
    RouterLinkActive,
    ReactiveFormsModule,
    // http client module
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
