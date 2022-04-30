import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: 'recipes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipesComponent
      },
      {
        path: ':recipeId',
        component: RecipeDetailsComponent
      }
    ]
  },
  {
    path: 'create',
    component: RecipeCreateComponent
  },
  {
    path: "my-recipes/:userId",
    component: MyRecipesComponent
  },
  {
    path: 'edit/:recipeId',
    component: RecipeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
