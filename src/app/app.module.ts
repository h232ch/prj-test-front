import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from "./auth/auth.component";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {AlertComponent} from "./shared/alert/alert.component";
import {PlaceholderDirective} from "./shared/placeholder/placeholder.directive";
import {RecipesModule} from "./recipes/recipes.module";
import {RecipesRoutingModule} from "./recipes/recipes.routing.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {DataStorageService} from "./shared/data-storage.service";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";
import {LoggingService} from "./logging.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent,
    // Move to recipes module (we changed recipes module to feature module)
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,

    // ShoppingListComponent,
    // ShoppingEditComponent,

    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    // You can remove below modules as we had those already from feature modules
    // FormsModule,
    // ReactiveFormsModule,
    AppRoutingModule,

    // It's really important to use HttpClient module!
    HttpClientModule,
    // Recipes, ShoppingList Modules (feature modules)

    // I removed RecipeModule, ShoppingListModule because of lazy loading setting from app routing module.
    // RecipesModule,
    // ShoppingListModule,
    AuthModule,
    // We need SHaredModule because our header component uses it (dropdown directive)
    SharedModule,
    CoreModule,
  ],
  providers: [
    // Move to CoreModule
    // ShoppingListService,
    // RecipeService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true,
    // }
    // I also add this service in the shopping list module (lazy loading)
    LoggingService,
  ],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule { }
