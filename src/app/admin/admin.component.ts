import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  blogPosts = [
    { title: 'Angular Routing Basics', status: 'Published' },
    { title: 'Custom Pipes in Angular', status: 'Draft' },
    { title: 'Tailwind + Angular Integration', status: 'Published' },
  ];
}
