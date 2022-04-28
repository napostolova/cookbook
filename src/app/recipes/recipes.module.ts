import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
