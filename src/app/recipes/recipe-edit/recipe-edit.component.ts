import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { IRecipe } from 'src/app/shared/interfaces/recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  types = [
    { name: 'Appetizer recipe', value: 'Appetizer' },
    { name: 'Breakfast recipe', value: 'Breakfast' },
    { name: 'Dessert recipe', value: 'Dessert' },
    { name: 'Main-course recipe', value: 'Main-course' },
    { name: 'Salad recipe', value: 'Salad' },
    { name: 'Soup recipe', value: 'Soup' },
  ]

  error: string = '';

  recipe: IRecipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.fetchRecipe();
  }

  ngOnInit(): void {
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

  editRecipe(form: NgForm): void {
    const id = this.activatedRoute.snapshot.params.recipeId;
    if (form.invalid) {
      console.log('invalid form');
      console.log(form.value); 
      console.log(form); 
      
      return; }
    this.recipeService.editRecipe(form.value, id).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  closeMessage(): void {
    this.error = '';
  }
}
