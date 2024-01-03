import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BoardComponent} from "../board.component";
import {AuthGuard} from "../../auth/auth-guard/auth.guard";
import {BoardsResolverService} from "../board-resolver/boards-resolver-service";
import {BoardEditComponent} from "../board-edit/board-edit.component";
import {BoardDetailComponent} from "../board-detail/board-detail.component";
import {BoardResolverService} from "../board-resolver/board-resolver-service";

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    canActivate: [AuthGuard],
    resolve: [BoardsResolverService],
    children: [
      { path: 'new', component: BoardEditComponent,},
      { path: ':id', component: BoardDetailComponent, resolve: [BoardResolverService]},
      { path: ':id/edit', component: BoardEditComponent,},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule {

}
