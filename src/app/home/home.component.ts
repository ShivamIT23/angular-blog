import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarqueeComponent } from '../marquee/marquee.component';
import { LogoIconComponent } from '../Icons/logo-icon/logo-icon.component';
import { BookIconComponent } from '../Icons/book-icon/book-icon.component';
import { OrbitingCirclesComponent } from '../orbiting-circles/orbiting-circles.component';
import { EmailiconComponent } from '../Icons/emailicon/emailicon.component';
import { PeopleIconComponent } from '../Icons/people-icon/people-icon.component';
import { WaveLineComponent } from '../wave-line/wave-line.component';

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
    WaveLineComponent
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
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650210/girl4_riojtg.jpg',
    },
    {
      name: 'Rajat',
      username: '@College Student',
      body: "I stumbled upon this site and ended up spending hours reading other people's stories. It's addictive!",
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650210/man4_uunzgh.jpg',
    },
    {
      name: 'Neha',
      username: '@Poet & Dreamer',
      body: "A beautiful space to pour your heart out. The UI is minimal and lets the words shine.",
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650210/girl2_rvyq6c.jpg',
    },
    {
      name: 'Karan',
      username: '@Content Creator',
      body: "SoulScript helped me rediscover my love for storytelling. It feels like a community, not just a website.",
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650212/man3_pslsop.jpg',
    },
    {
      name: 'Rhea Sharma',
      username: '@Freelance Author',
      body: "As a writer, it's refreshing to find a platform that truly values creativity and clean presentation.",
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650211/girl1_ysvsaz.jpg',
    },
    {
      name: 'Aditya Joshi',
      username: '@Tech Blogger',
      body: "Whether you're reading or writing, this place inspires. A must-visit for bloggers and writers alike.",
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650213/man1_ysthc9.jpg',
    },
    {
      name: 'Sneha',
      username: '@Community Member',
      body: "I never thought sharing my personal story would get so much love. The feedback I received was heartwarming.",
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650211/girl3_n0hmqd.jpg',
    },
    {
      name: 'Vikram',
      username: '@First-time Writer',
      body: "Feels like therapy. Writing here gave me clarity and peace. Thank you, SoulScript!",
      img: 'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752650211/man2_ydh5ip.jpg',
    },
  ];

  get firstRow() {
    return this.reviews.slice(0, this.reviews.length / 2);
  }

  get secondRow() {
    return this.reviews.slice(this.reviews.length / 2);
  }
}
