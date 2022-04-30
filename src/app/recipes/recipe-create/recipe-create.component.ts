import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
  types = [
    { name: 'Appetizer recipe', value: 'Appetizer' },
    { name: 'Breakfast recipe', value: 'Breakfast' },
    { name: 'Dessert recipe', value: 'Dessert' },
    { name: 'Main-course recipe', value: 'Main-course' },
    { name: 'Salad recipe', value: 'Salad' },
    { name: 'Soup recipe', value: 'Soup' },
  ]

  error: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router
   ) { }

  createRecipe(form: NgForm): void {
    if (form.invalid) {
      console.log('form invalid');
      
      return;
    }
    this.recipeService.createRecipe(form.value).subscribe({
      next: () => {
        console.log(form.value);

        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        if (error.error.message) {
          this.error = error.error.message
        }
        console.log(error);
      }
    });
  }

  closeMessage(): void {
    this.error = '';
  }
}
