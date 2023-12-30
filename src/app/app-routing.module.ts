import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";


const appRoutes: Routes = [
  {path: 'main', component: MainComponent} ,
  {path: '', redirectTo: '/main', pathMatch: 'full',} ,
  // Lazy loading
  {
    path: 'boards',
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
