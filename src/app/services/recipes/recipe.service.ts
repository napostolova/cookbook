import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { IRecipe } from "../../shared/interfaces/recipe";

const apiUrl = 'http://localhost:4000/recipes';

let token: any;
token = localStorage.getItem('token');

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'x-authorization': token
  })
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<IRecipe[]>(`${apiUrl}`);
  }

  createRecipe(data: any) {
    return this.http.post<IRecipe>(`${apiUrl}`, data, httpOptions);
  }
}
