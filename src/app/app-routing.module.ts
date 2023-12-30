import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";


const appRoutes: Routes = [
   // Lazy loading
  {
    path: 'boards',
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  },
  {path: '', pathMatch: 'full', redirectTo: '/main'},
  {path: 'main', component: MainComponent},


]

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  imports: [RouterModule.forRoot(appRoutes,)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
