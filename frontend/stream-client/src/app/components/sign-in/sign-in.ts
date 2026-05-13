import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  email = '';
  password = '';
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  errorMessage = signal('');
  isLoading = signal(false);

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const user = { email: this.email, password: this.password };

    this.userService.loginUser(user).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.isLoading.set(false);
        this.router.navigate(['/stream']);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 401) {
          this.errorMessage.set('Invalid email or password.');
        } else if (err.status === 0) {
          this.errorMessage.set('Cannot reach server. Check your connection.');
        } else {
          this.errorMessage.set('Something went wrong. Please try again.');
        }
      },
    });
  }
}
