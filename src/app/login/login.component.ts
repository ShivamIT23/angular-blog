import { Component } from '@angular/core';
import { EmailiconComponent } from '../Icons/emailicon/emailicon.component';
import { PasswordIconComponent } from '../Icons/password-icon/password-icon.component';
import { PasswordEyeComponent } from '../password-eye/password-eye.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [EmailiconComponent,PasswordIconComponent,RouterLink, PasswordEyeComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';


  showPassword = false

  changeShow(){
    this.showPassword = !this.showPassword
  }

  constructor(private usersService: UsersService) {}

  async onLogin() {
    try {
      await this.usersService.loginUser(this.email,this.password);
      this.successMessage = `Login successfully!`;
      this.errorMessage = '';
      setTimeout(function () {
        window.location.href = '/blogs';
    }, 2000);
    } catch (error: any) {
      this.errorMessage = error?.error?.detail || 'Login failed. Wrong Credentials';
      this.successMessage = '';
    }
  }
}
