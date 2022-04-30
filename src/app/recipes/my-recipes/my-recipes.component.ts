import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { UserService } from 'src/app/services/user/user.service';
import { IRecipe } from 'src/app/shared/interfaces/recipe';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.css']
})
export class MyRecipesComponent implements OnInit {

  recipes: IRecipe[] | undefined;

  constructor(
    private userService: UserService,
    private recipeService: RecipeService

  ) { }

  ngOnInit(): void {
    this.fetchMyRecipes();
  }

  fetchMyRecipes(): void {
    if (this.userService.user) {
      const userId = this.userService.user._id;
      this.recipeService.getMyRecipes(userId).subscribe(recipes => this.recipes = recipes);
    }
  }
}
