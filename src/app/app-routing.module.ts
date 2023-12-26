import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BoardComponent} from "./board/board.component";
import {AuthComponent} from "./auth/auth.component";
import {MainComponent} from "./main/main.component";
import {BoardListComponent} from "./board/board-list/board-list.component";
import {BoardDetailComponent} from "./board/board-detail/board-detail.component";
import {BoardEditComponent} from "./board/board-edit/board-edit.component";
import {AuthGuard} from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'boards',
    component: BoardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: BoardEditComponent },
      { path: ':id', component: BoardDetailComponent },
      { path: ':id/edit', component: BoardEditComponent },
    ]
  },
  { path: 'auth', component: AuthComponent }
//   Guard
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
