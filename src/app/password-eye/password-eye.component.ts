import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-eye',
  imports: [CommonModule],
  templateUrl: './password-eye.component.html',
  styleUrl: './password-eye.component.css'
})
export class PasswordEyeComponent {
  @Input() show:boolean = false
}
