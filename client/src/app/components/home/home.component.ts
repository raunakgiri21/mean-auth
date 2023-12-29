import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  name="";
  email="";
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){this.getUserByUserId()};
  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  getUserByUserId() {
    const userId = localStorage.getItem('userId');
    this.authService.getUserByID(userId as string).subscribe(
      (response) => {
        this.name = (response as any).name;
        this.email = (response as any).email;
      },
      (error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: error?.error?.error || 'Something went wrong',
        });
      }
    );
  }
}
