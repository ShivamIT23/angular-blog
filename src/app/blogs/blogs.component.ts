import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BookIconComponent } from '../Icons/book-icon/book-icon.component';
import { PeopleIconComponent } from '../Icons/people-icon/people-icon.component';
import { ArrowIconComponent } from '../Icons/arrow-icon/arrow-icon.component';
import { SearchIconComponent } from '../Icons/search-icon/search-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  imports: [
    CommonModule,
    RouterLink,
    BookIconComponent,
    PeopleIconComponent,
    ArrowIconComponent,
    SearchIconComponent,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  blogPosts: {
    id: number;
    category: string;
    author: string;
    authorPhoto: string;
    date: string;
    readTime: string;
    title: string;
    summary: string;
    mainImage: string;
    likes: number;
  }[] = [];

  constructor(private route: ActivatedRoute) {
    const data = this.route.snapshot.data;
    this.blogPosts = data['blogPosts'] || [];
  }

  categoryList = [
    {
      name: 'All',
      color: 'bg-blue-200 dark:bg-blue-400/40',
    },
    {
      name: 'Business',
      color: 'bg-[#E0F7FA] dark:bg-[#004D4D60]',
    },
    {
      name: 'Health',
      color: 'bg-[#FFFBEA] dark:bg-[#4E342E60]',
    },
    {
      name: 'Lifestyle',
      color: 'bg-[#FDECF1] dark:bg-[#880E4F60]',
    },
    {
      name: 'Technology',
      color: 'bg-[#F1FBF2] dark:bg-[#1B5E2060]',
    },
    {
      name: 'Sports',
      color: 'bg-[#EDF7FE] dark:bg-[#0D47A160]',
    },
    {
      name: 'Education',
      color: 'bg-[#F8F0FB] dark:bg-[#4A148C60]',
    },
    {
      name: 'Food',
      color: 'bg-[#F7FBEC] dark:bg-[#33691E60]',
    },
    {
      name: 'Entertainment',
      color: 'bg-[#FFF9F0] dark:bg-[#E6510060]',
    },
    {
      name: 'Travel',
      color: 'bg-[#F2F0FA] dark:bg-[#1A237E60]',
    },
    {
      name: 'Finance',
      color: 'bg-[#FFF9DB] dark:bg-[#8D6E6360]',
    },
    {
      name: 'Fitness',
      color: 'bg-[#FFEFEA] dark:bg-[#BF360C60]',
    },
    {
      name: 'Environment',
      color: 'bg-[#F6FBEA] dark:bg-[#3E4C1F60]',
    },
    {
      name: 'General',
      color: 'bg-[#E0E0E0] dark:bg-[#2A2E3280]',
    },
  ];

  selectedCategory = 'All';

  isInputFocused = false;

  get filteredBlogPosts() {
    if (this.selectedCategory === 'All') {
      return this.blogPosts;
    }
    return this.blogPosts.filter(
      (post) => post.category === this.selectedCategory
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
