import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { IRecipe } from "../../shared/interfaces/recipe";
import { UserService } from '../user/user.service';

const apiUrl = 'http://localhost:4000/recipes';

let token: any;


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'x-authorization': token
//   })
// }


@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  constructor(private http: HttpClient,
    public userService: UserService  ) {
      token= userService.token;
  }

  getRecipes() {
    return this.http.get<IRecipe[]>(`${apiUrl}`);
  }

  getRecipe(id: string) {
    return this.http.get<IRecipe>(`${apiUrl}/${id}`);
  }
  createRecipe(data: any) {
    return this.http.post<IRecipe>(`${apiUrl}`, data,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-authorization': token
      })
    }
    );
  }

  likeRecipe(id: string) {
    return this.http.get<IRecipe>(`${apiUrl}/likes/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-authorization': token
      })
    }
    )
  }
}
