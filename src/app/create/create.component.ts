import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { PenIconComponent } from '../Icons/pen-icon/pen-icon.component';
import { TIconComponent } from '../Icons/t-icon/t-icon.component';
import { CommonModule } from '@angular/common';
import { TickIconComponent } from '../Icons/tick-icon/tick-icon.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { categoryList } from '../app.routes';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { CreateTitleComponent } from '../create-title/create-title.component';
import { TitleService } from '../services/title.service';
import { Subscription } from 'rxjs';
import { BlogsService } from '../services/blogs.service';
import Quill from 'quill';

@Component({
  selector: 'app-create',
  imports: [
    PenIconComponent,
    TickIconComponent,
    TIconComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    QuillModule,
    CreateTitleComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnDestroy, AfterViewInit {
  @ViewChild('quillContentEditor') quillContentEditor!: QuillEditorComponent;
  @ViewChild(CreateTitleComponent) createTitleComponent!: CreateTitleComponent;
  protected quillInstance!: Quill;

  private lastSelectionRange: any = null; // To store the cursor position

  // Edit mode
  blogId: string | null = null;
  isEditMode = false;

  onEditorCreated(editor: Quill) {
    this.quillInstance = editor;

    // Listen for selection changes to keep track of the last cursor position
    this.quillInstance.on('selection-change', (range, oldRange, source) => {
      if (range) {
        this.lastSelectionRange = range;
      }
    });

    // Listen to paste events
    this.quillInstance.root.addEventListener(
      'paste',
      this.handlePaste.bind(this)
    );
  }

  handlePaste(event: ClipboardEvent) {
    // Save the current selection range before Quill processes the paste
    const range = this.quillInstance.getSelection();
    if (range) {
      this.lastSelectionRange = range;
    }

    // Allow Quill to handle the paste event
    // You might need to add a small delay to allow Quill to fully process the paste
    setTimeout(() => {
      if (this.lastSelectionRange) {
        this.quillInstance.setSelection(
          this.lastSelectionRange.index +
            (event.clipboardData?.getData('text/plain')?.length || 0),
          0,
          'silent'
        );
      }
    }, 10);
  }

  onContentChanged(event: any) {
    this.content = event.html;
    // console.log(this.content);
  }

  ngAfterViewInit() {
    // This method is now properly implemented with AfterViewInit interface
    // The paste listener is already set up in onEditorCreated, so no need to duplicate here
  }

  category: string = '';
  mainImage: string = '';
  content: string = '';
  date: Date | undefined;
  image = '';
  quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  private subscriptions = new Subscription();
  successMessage = '';
  errorMessage = '';
  title: string = '';
  plainTitle: string = '';
  summary: string = '';

  // Utility function to strip HTML tags
  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  constructor(
    private titleService: TitleService,
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscriptions.add(
      this.titleService.title$.subscribe((title) => {
        this.title = title;
      })
    );
    this.subscriptions.add(
      this.titleService.plainTitle$.subscribe((plainTitle) => {
        this.plainTitle = plainTitle;
      })
    );

    // Check for edit mode
    this.route.paramMap.subscribe(async (params) => {
      this.blogId = params.get('id');
      this.isEditMode = !!this.blogId;
      if (this.isEditMode && this.blogId) {
        const blog = await this.blogsService.fetchSingleBlog(this.blogId);
        if (blog) {
          this.title = blog.title;
          this.plainTitle = this.stripHtml(blog.title);
          this.titleService.setTitle(blog.title);
          this.titleService.setPlainTitle(this.plainTitle);
          this.selected = this.categoryList.find(c => c.name === blog.category) || this.selected;
          this.mainImage = blog.mainImage;
          this.content = blog.content;
          this.summary = blog.summary;
          // Set the title in the Quill title editor
          setTimeout(() => {
            if (this.createTitleComponent) {
              this.createTitleComponent.quillTitle = blog.title;
            }
          });
        }
      }
    });
  }

  addImage() {
    this.mainImage = this.image;
  }

  get letterCount(): number {
    return this.plainTitle.length;
  }

  autoResize(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  autoResizeSummary(textArea: any) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  categoryList = categoryList.slice(1);
  selected = {
    name: 'General',
    icon: '📝',
    color: 'bg-[#E0E0E0] dark:bg-[#2A2E32]',
    textColor: 'text-[#2A2E32]',
  };
  selectedClick(category: {
    name: string;
    icon: string;
    color: string;
    textColor: string;
  }) {
    this.selected = category;
  }

  async createBlog() {
    if (this.isEditMode && this.blogId) {
      // Update blog
      const updatedBlog = {
        title: this.title.replace('&nbsp;', ' '),
        category: this.selected.name,
        mainImage: this.mainImage,
        content: this.content.replace('&nbsp;', ' '),
        date: new Date(),
        summary: this.summary,
      };
      const result = await this.blogsService.updateBlog(this.blogId, updatedBlog);
      if (result && typeof result == 'string') {
        this.successMessage = 'Blog Updated Successfully';
        // Optionally redirect or reset form
      } else {
        this.errorMessage = result || 'Failed to update blog.';
      }
    } else {
      // Create blog
      const blog = {
        title: this.title.replace('&nbsp;', ' '),
        category: this.selected.name,
        mainImage: this.mainImage,
        content: this.content.replace('&nbsp;', ' '),
        date: new Date(),
        summary: this.summary,
      };
      const result = await this.blogsService.createBlogs(blog);
      if (typeof result !== 'string') {
        this.title = '';
        this.category = '';
        this.mainImage = '';
        this.content = '';
        this.date = undefined;
        this.image = '';
        this.selected = {
          name: 'General',
          icon: '📝',
          color: 'bg-[#E0E0E0] dark:bg-[#2A2E32]',
          textColor: 'text-[#2A2E32]',
        };
        this.successMessage = 'Blog Created Successfully';
      } else {
        this.errorMessage = result;
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get isFormValid(): boolean {
    return (
      !!this.plainTitle.trim() &&
      !!this.selected.name.trim() &&
      !!this.content.trim()
    );
  }
}
