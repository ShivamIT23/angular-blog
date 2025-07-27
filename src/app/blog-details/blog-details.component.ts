import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogsService } from '../services/blogs.service';
import { categoryList } from '../app.routes';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { PenIconComponent } from '../Icons/pen-icon/pen-icon.component';

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink, CommonModule, QuillModule, FormsModule, QuillEditorComponent, PenIconComponent  ],
  standalone: true,
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  blog: any;
  categoryBgColor = 'bg-[#E0E0E0] dark:bg-[#2A2E3280]';
  categoryTextColor = 'bg-[#E0E0E0] dark:bg-[#2A2E3280]';
  categoryList = categoryList;

  isMine = false;

  content = `
  <h2>Test List</h2>
  <ol>
    <li>Apple</li>
    <li>Banana</li>
    <li>Cherry</li>
  </ol>
`;

  safeContent: SafeHtml = '';
  safeTitle: SafeHtml = '';

  // Like state management
  localLikes: number = 0;
  userLiked: boolean = false;
  pendingLikeChanges: boolean = false;
  lastLikeTime: number = 0;
  private readonly LIKE_THROTTLE = 1000; // 1 second throttle

  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogsService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.blog = await this.blogsService.fetchSingleBlog(id);
    
    // Initialize like state
    this.localLikes = this.blog?.likes || 0;
    this.userLiked = this.blog?.whoLiked?.includes(sessionStorage.getItem('user_info')) || false;
    
    this.categoryList.forEach((category) => {
      if (category.name === this.blog?.category) {
        this.categoryBgColor = category.color;
        this.categoryTextColor = category.textColor;
      }
    });
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(this.blog?.title);
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
      this.blog?.content
    );
    this.isMine = this.blog?.owner_id === sessionStorage.getItem('user_info');
  }

  toggleLike() {
    const now = Date.now();
    if (now - this.lastLikeTime < this.LIKE_THROTTLE) {
      console.log('Like action throttled');
      return;
    }
    
    this.lastLikeTime = now;
    this.pendingLikeChanges = true;
    
    if (this.userLiked) {
      // Unlike
      this.localLikes--;
      this.userLiked = false;
    } else {
      // Like
      this.localLikes++;
      this.userLiked = true;
    }
    
  }

  editBlog() {
    this.router.navigate(['/create', this.blog?.id]);
  }

  deleteBlog() {
    this.blogsService.deleteBlog(this.blog?.id);
    this.router.navigate(['/']);
  }

  async ngOnDestroy() {
    // Sync like changes with server only if there are pending changes
    if (this.pendingLikeChanges && this.blog?.id) {
      try {
        const result = await this.blogsService.likePost(this.blog.id);
        if (result.success) {
          // Refresh blogs to update the list
          await this.blogsService.refreshBlogs();
        } else {
          console.error('Failed to sync like changes:', result.message);
        }
      } catch (error) {
        console.error('Error syncing like changes:', error);
      }
    }
    
    this.isMine = false;
  }
}
