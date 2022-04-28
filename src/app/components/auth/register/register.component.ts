import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { emailValidator, sameValue } from 'src/app/shared/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  form: FormGroup

  error: string = '';

  removeSubscription = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, sameValue(
        () => this.form?.get('password'), this.removeSubscription
      )]]
    });
  }
  register(): void {
    if (this.form.invalid) {
      console.log('Invalid form');
      return;
    }
    this.userService.register(this.form.value).subscribe({
      next: (user) => {      
        localStorage.setItem('user', user.username);
        localStorage.setItem('userId', user._id)
        localStorage.setItem('token', user.accessToken)
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.error = error.error.message;
      }
    })

  }
  ngOnDestroy(): void {
    this.removeSubscription.next();
    this.removeSubscription.complete();
  }

  closeMessage(): void {
    this.error = '';
  }

}
