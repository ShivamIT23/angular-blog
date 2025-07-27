import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarqueeComponent } from '../marquee/marquee.component';
import { LogoIconComponent } from '../Icons/logo-icon/logo-icon.component';
import { BookIconComponent } from '../Icons/book-icon/book-icon.component';
import { OrbitingCirclesComponent } from '../orbiting-circles/orbiting-circles.component';
import { EmailiconComponent } from '../Icons/emailicon/emailicon.component';
import { PeopleIconComponent } from '../Icons/people-icon/people-icon.component';
import { WaveLineComponent } from '../wave-line/wave-line.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MarqueeComponent,
    CommonModule,
    LogoIconComponent,
    BookIconComponent,
    OrbitingCirclesComponent,
    EmailiconComponent,
    PeopleIconComponent,
    WaveLineComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  reviews = [
    {
      name: 'Ananya',
      username: '@Hobby Writer',
      body: "This platform feels like a cozy notebook where my thoughts finally have a home",
      img: '/girl4.jpg',
    },
    {
      name: 'Rajat',
      username: '@College Student',
      body: "I stumbled upon this site and ended up spending hours reading other people's stories. It's addictive!",
      img: '/man4.jpg',
    },
    {
      name: 'Neha',
      username: '@Poet & Dreamer',
      body: "A beautiful space to pour your heart out. The UI is minimal and lets the words shine.",
      img: '/girl2.jpg',
    },
    {
      name: 'Karan',
      username: '@Content Creator',
      body: "SoulScript helped me rediscover my love for storytelling. It feels like a community, not just a website.",
      img: '/man3.jpg',
    },
    {
      name: 'Rhea Sharma',
      username: '@Freelance Author',
      body: "As a writer, it's refreshing to find a platform that truly values creativity and clean presentation.",
      img: '/girl1.jpg',
    },
    {
      name: 'Aditya Joshi',
      username: '@Tech Blogger',
      body: "Whether you're reading or writing, this place inspires. A must-visit for bloggers and writers alike.",
      img: '/man1.jpg',
    },
    {
      name: 'Sneha',
      username: '@Community Member',
      body: "I never thought sharing my personal story would get so much love. The feedback I received was heartwarming.",
      img: '/girl3.jpg',
    },
    {
      name: 'Vikram',
      username: '@First-time Writer',
      body: "Feels like therapy. Writing here gave me clarity and peace. Thank you, SoulScript!",
      img: '/man2.jpg',
    },
  ];

  get firstRow() {
    return this.reviews.slice(0, this.reviews.length / 2);
  }

  get secondRow() {
    return this.reviews.slice(this.reviews.length / 2);
  }
}
