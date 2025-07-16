import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { blogPosts } from '../app.routes';

@Component({
  selector: 'app-blog-details',
  imports: [],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  blog:
    | {
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
      }
    | undefined;

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blog = blogPosts.find((b) => b.id === id);
    console.log(this.blog);
  }
}
