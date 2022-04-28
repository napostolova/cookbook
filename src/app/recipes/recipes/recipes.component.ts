import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/shared/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: IRecipe[] | undefined;

  constructor(
    private recipesService: RecipeService,

  ) { }

  ngOnInit(): void {
    this.fetchRecipes();
  }

  fetchRecipes(): void {
    this.recipesService.getRecipes().subscribe(response => {
      this.recipes = response;
    },
      error => {
        console.log(error);
      });
  }

}
