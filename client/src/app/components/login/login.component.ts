import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { Response } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const postData = { ...this.loginForm.value };
    this.authService.loginUser(postData as User).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful',
        });
        localStorage.setItem(
          'userId',
          JSON.stringify((response as Response).userID)
        );
        this.router.navigate(['']);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: error?.error?.error || 'Something went wrong',
        });
      }
    );
  }
}
