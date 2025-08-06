import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BookIconComponent } from '../Icons/book-icon/book-icon.component';
import { PeopleIconComponent } from '../Icons/people-icon/people-icon.component';
import { ArrowIconComponent } from '../Icons/arrow-icon/arrow-icon.component';
import { SearchIconComponent } from '../Icons/search-icon/search-icon.component';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../services/blogs.service';
import { Subscription } from 'rxjs';
import { categoryList } from '../app.routes';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
export class BlogsComponent implements OnInit, OnDestroy {
  blogs: {
    id: string;
    category: string;
    owner_name: string;
    owner_photo: string;
    date: string;
    readTime: string;
    title: string;
    content: string;
    summary: string;
    mainImage: string;
    likes: number;
    safeTitle: SafeHtml;
  }[] = [];

  loading = false;
  Math = Math; // Make Math available in template

  private blogsSub!: Subscription; // definite assignment assertion

  constructor(
    private blogService: BlogsService,
    private sanitizer: DomSanitizer
  ) {}

  skip = 0;
  limit = 10;

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;
  totalBlogs = 0;
  allBlogs: any[] = []; // Store all blogs for filtering
  hasMorePages = false;
  totalFetched = 0;

  ngOnInit() {
    // Load initial data with pagination first
    this.loadPageData();
    
    this.blogsSub = this.blogService.blogs$.subscribe((blogs) => {
      this.allBlogs = blogs;
      // Apply HTML sanitization to all blogs
      this.allBlogs.forEach((blog) => {
        blog.safeTitle = this.sanitizer.bypassSecurityTrustHtml(blog.title);
      });
    });
  }

  async loadPageData() {
    try {
      
      // First check if we have cached data for this page
      const cachedData = this.blogService.getCachedPage(this.currentPage);
      if (cachedData) {
        this.blogs = cachedData.blogs;
        this.hasMorePages = cachedData.hasMore;
        this.totalFetched = cachedData.totalFetched;
        this.totalPages = this.currentPage + (this.hasMorePages ? 1 : 0);
      } else {
        // Fetch new data
        const result = await this.blogService.fetchAllBlogs(this.currentPage, this.itemsPerPage);
        this.blogs = result.blogs;
        this.hasMorePages = result.hasMore;
        this.totalFetched = result.totalFetched;
        this.totalPages = this.currentPage + (this.hasMorePages ? 1 : 0);
      }
      
      // Update total blogs count based on filtered data
      this.totalBlogs = this.filteredBlogPosts.length;
      
      // console.log('Pagination result:', {
      //   blogs: this.blogs.length,
      //   hasMore: this.hasMorePages,
      //   totalFetched: this.totalFetched,
      //   currentPage: this.currentPage,
      //   totalPages: this.totalPages,
      //   totalBlogs: this.totalBlogs,
      //   filteredCount: this.filteredBlogPosts.length
      // });
      
      // Apply HTML sanitization
      this.blogs.forEach((blog) => {
        blog.safeTitle = this.sanitizer.bypassSecurityTrustHtml(blog.title);
      });
    } catch (error) {
      console.error('Error loading page data:', error);
    }
  }

  get paginatedBlogPosts() {
    // Apply category filter to the current page blogs
    const filtered = this.filteredBlogPosts;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  async goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      await this.loadPageData();
    }
  }

  async nextPage() {
    if (this.hasMorePages) {
      this.currentPage++;
      await this.loadPageData();
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadPageData();
    }
  }

  async selectCategory(category: string) {
    console.log(category);
    this.selectedCategory = categoryList.find(c => c.name === category) || categoryList[0];
    console.log(this.selectedCategory);
    this.currentPage = 1; // Reset to first page when category changes
    // Clear page cache when category changes
    this.clearPageCache();
    
    // Recalculate pagination based on filtered data
    const filteredCount = this.filteredBlogPosts.length;
    this.totalBlogs = filteredCount;
    this.totalPages = Math.ceil(filteredCount / this.itemsPerPage);
    
    await this.loadPageData();
  }

  clearPageCache() {
    // Clear all page-specific cache
    for (let i = 1; i <= 10; i++) { // Clear first 10 pages
      sessionStorage.removeItem(`blogs_page_${i}`);
    }
  }

  async refresh() {
    this.loading = true;
    try {
      // Use service's refresh method which handles all cache clearing
      await this.blogService.refreshBlogs();
      this.currentPage = 1; // Reset to first page
      await this.loadPageData();
    } catch (error) {
      console.error('Error refreshing blogs:', error);
    } finally {
      this.loading = false;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        if (this.hasMorePages) {
          pages.push(this.totalPages);
        }
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        if (this.hasMorePages) {
          pages.push(this.totalPages);
        }
      }
    }
    
    return pages;
  }

  ngOnDestroy() {
    if (this.blogsSub) {
      this.blogsSub.unsubscribe();
    }
  }

  categoryList = categoryList;

  selectedCategory = categoryList[0];

  isInputFocused = false;

  get filteredBlogPosts() {
    // For server-side pagination, filtering should be handled by the API
    // This is now just a fallback for client-side filtering
    const filtered = this.selectedCategory.name === 'All' 
      ? this.allBlogs 
      : this.allBlogs.filter((post) => post.category === this.selectedCategory.name);
    
    return filtered;
  }

  getCategoryClasses(category: string): string {
    const categoryItem = this.categoryList.find((c) => c.name === category);
    if (categoryItem) {
      return `${categoryItem.color} ${categoryItem.textColor}`;
    }
    return '';
  }
}
