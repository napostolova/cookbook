import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { UserService } from 'src/app/services/user/user.service';
import { IRecipe } from 'src/app/shared/interfaces/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  get userId(): any {
    return this.userService.userId
  }

  recipe: IRecipe | undefined;
  userID = localStorage.getItem('userId');
  
  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
  
   }

  ngOnInit(): void {
    this.fetchRecipe();
    }

  fetchRecipe(): void {
    const id = this.activatedRoute.snapshot.params.recipeId;
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;               
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  likeRecipe(id: string): void {
    this.recipeService.likeRecipe(id).subscribe({
      next: () => {
        console.log('like');
        this.router.navigate([`/recipes`]);
      },
     error: (error) =>{
       console.log(error);
       
     }
    })
  }
}
