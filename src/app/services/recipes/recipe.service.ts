import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { IRecipe } from "../../shared/interfaces/recipe";

const apiUrl = 'http://localhost:4000/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<IRecipe[]>(`${apiUrl}`);
  }
}
