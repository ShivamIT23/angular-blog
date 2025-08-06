import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogsService } from '../services/blogs.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { categoryList } from '../app.routes';

@Component({
  selector: 'app-my-blogs',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.css',
})
export class MyBlogsComponent implements OnInit, OnDestroy {
  blogs: any[] = [];
  private blogsSub!: Subscription;
  loading = false;

  constructor(
    private blogsService: BlogsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.blogsSub = this.blogsService.myBlogs$.subscribe((blogs) => {
      this.blogs = blogs.map(blog => ({
        ...blog,
        safeTitle: this.sanitizer.bypassSecurityTrustHtml(blog.title)
      }));
    });
    this.blogsService.getMineBlogs();
  }

  refreshBlogs() {
    this.loading = true;
    setTimeout(() => {
      this.blogsService.refreshMyBlogs();
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.blogsSub) {
      this.blogsSub.unsubscribe();
    }
  }

  categoryList = categoryList;

  getCategoryClasses(category: string): string {
    const categoryItem = this.categoryList.find((c) => c.name === category);
    if (categoryItem) {
      return `${categoryItem.color} ${categoryItem.textColor}`;
    }
    return '';
  }
}
