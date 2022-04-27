import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';
import { emailValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup

  error: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }
    this.userService.login(this.form.value).subscribe({
      next: (user) => {
        localStorage.setItem('user', user.username)
        this.router.navigate(['/recipes'])
      },
      error: (error) => {
        this.error = error.error.message;  
      }
    })
  }

  closeMessage(): void {
      this.error = '';
  }
}
