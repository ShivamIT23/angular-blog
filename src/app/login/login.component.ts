import { Component } from '@angular/core';
import { EmailiconComponent } from '../Icons/emailicon/emailicon.component';
import { PasswordIconComponent } from '../Icons/password-icon/password-icon.component';

@Component({
  selector: 'app-login',
  imports: [EmailiconComponent,PasswordIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
