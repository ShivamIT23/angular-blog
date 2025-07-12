import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookIconComponent } from '../Icons/book-icon/book-icon.component';
import { PeopleIconComponent } from '../Icons/people-icon/people-icon.component';
import { ArrowIconComponent } from '../Icons/arrow-icon/arrow-icon.component';
import { SearchIconComponent } from '../Icons/search-icon/search-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterLink,
    BookIconComponent,
    PeopleIconComponent,
    ArrowIconComponent,
    SearchIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  blogPosts = [
    { id: 1, title: 'Getting Started with Angular', description: 'A beginner guide to Angular with real examples.' },
    { id: 2, title: 'Understanding Tailwind CSS', description: 'Style faster with utility-first CSS.' },
    { id: 3, title: 'Smooth Scrolling with Lenis', description: 'Improve UX with buttery scroll.' },
  ];

  isInputFocused = false;
}
