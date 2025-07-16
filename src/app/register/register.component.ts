import { Component } from '@angular/core';
import { PasswordIconComponent } from '../Icons/password-icon/password-icon.component';
import { EmailiconComponent } from '../Icons/emailicon/emailicon.component';

@Component({
  selector: 'app-register',
  imports: [PasswordIconComponent,EmailiconComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
