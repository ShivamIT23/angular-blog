import { Component } from '@angular/core';
import { PasswordIconComponent } from '../Icons/password-icon/password-icon.component';
import { EmailiconComponent } from '../Icons/emailicon/emailicon.component';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import { PasswordEyeComponent } from '../password-eye/password-eye.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [PasswordIconComponent,EmailiconComponent,FormsModule,PasswordEyeComponent,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  fullName = '';
  errorMessage = '';
  successMessage = '';

  showPassword = false;

  changeShow(){
    this.showPassword = !this.showPassword
  }

  constructor(private usersService: UsersService) {}

  async onRegister() {
    try {
      const user = {
        email: this.email,
        password: this.password,
        fullName: this.fullName
      };
      const result = await this.usersService.registerUser(user);
      this.successMessage = `Registered successfully! Email: ${result.email}`;
      this.errorMessage = '';
    } catch (error: any) {
      this.errorMessage = error?.error?.detail || 'Registration failed.';
      this.successMessage = '';
    }
  }
}
