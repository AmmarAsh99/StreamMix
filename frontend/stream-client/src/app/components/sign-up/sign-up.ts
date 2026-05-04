import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  email = '';
  password = '';
  isLoading = false;
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.isLoading) {
      this.isLoading = true;
    }
    const user = {
      email: this.email,
      password: this.password,
    };
    this.userService.createUser(user).subscribe({
      next: (value) => {
        this.router.navigate(['/stream']);
      },
      error: (err) => {
        console.log('Sign up failed', err);
        this.isLoading = false;
      },
    });
  }
}
