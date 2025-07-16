import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateComponent } from './create/create.component';
import { BlogsComponent } from './blogs/blogs.component';

export const blogPosts = [
  {
    id: 1,
    category: 'Food',
    author: 'Shivam',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p3img_r9qqsr.jpg',
    date: 'Jun 5, 2025',
    readTime: '1 min read',
    title: 'Fermentation Is the Future of Healthy Eating',
    summary:
      'Kombucha, kimchi, sourdough—fermented foods are having a moment. Beyond their tangy flavors, these foods are packed with probiotics that support gut h…',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399518/food1_moanwe.jpg',
    likes: 1,
  },
  {
    id: 2,
    category: 'Technology',
    author: 'Ananya',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p2img_tytic0.jpg',
    date: 'May 21, 2025',
    readTime: '2 min read',
    title: 'Why AI Assistants Are Revolutionizing Workflows',
    summary:
      'From content generation to scheduling, AI assistants are helping streamline productivity like never before. Here’s how businesses are adapting to thi…',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399518/technology_z3uzsg.jpg',
    likes: 8,
  },
  {
    id: 3,
    category: 'Health',
    author: 'Ravi',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p1img_hctcqk.jpg',
    date: 'Jul 1, 2025',
    readTime: '3 min read',
    title: '5 Breathing Techniques to Instantly Reduce Stress',
    summary:
      'Harness the power of your breath to find calm. These science-backed techniques are easy to learn and can help ease anxiety in under a minute.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399517/health_f6jysd.jpg',
    likes: 5,
  },
  {
    id: 4,
    category: 'Finance',
    author: 'Megha',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p3img_r9qqsr.jpg',
    date: 'Apr 15, 2025',
    readTime: '4 min read',
    title: 'The 50/30/20 Rule: A Simple Way to Budget Your Income',
    summary:
      'Struggling to save? This budgeting method helps you divide your monthly income into needs, wants, and savings efficiently.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399516/finance_cvjstx.jpg',
    likes: 12,
  },
  {
    id: 5,
    category: 'Travel',
    author: 'Aditya',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p2img_tytic0.jpg',
    date: 'Mar 18, 2025',
    readTime: '2 min read',
    title: 'Hidden Gems in the Himalayas You Need to Explore',
    summary:
      'Tired of overcrowded tourist spots? These lesser-known Himalayan villages offer peace, nature, and breathtaking beauty.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399516/travel_r57pso.jpg',
    likes: 7,
  },
  {
    id: 6,
    category: 'Lifestyle',
    author: 'Neha',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p1img_hctcqk.jpg',
    date: 'Jun 25, 2025',
    readTime: '1 min read',
    title: 'Minimalism: Declutter Your Life and Mind',
    summary:
      'Living with less doesn’t mean sacrificing comfort. Discover how minimalism can help you focus on what truly matters.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399516/lifestyle_d3ofgl.jpg',
    likes: 3,
  },
  {
    id: 7,
    category: 'Education',
    author: 'Tanmay',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p3img_r9qqsr.jpg',
    date: 'May 10, 2025',
    readTime: '3 min read',
    title: 'Top Free Online Courses for Upskilling in 2025',
    summary:
      'Platforms like Coursera, edX, and Khan Academy are offering certifications in tech, business, and arts—all for free.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399516/education_jyfggg.jpg',
    likes: 10,
  },
  {
    id: 8,
    category: 'Fitness',
    author: 'Ritu',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p2img_tytic0.jpg',
    date: 'Jun 30, 2025',
    readTime: '2 min read',
    title: 'How to Build a Sustainable Workout Routine',
    summary:
      'Fitness is more than a 30-day challenge. Learn how to create habits that stick for long-term health.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399516/fitness_kezxra.jpg',
    likes: 6,
  },
  {
    id: 9,
    category: 'Environment',
    author: 'Karan',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p1img_hctcqk.jpg',
    date: 'Apr 22, 2025',
    readTime: '2 min read',
    title: 'How Urban Gardening Is Changing City Living',
    summary:
      'From rooftops to balconies, more people are growing their own food—cutting emissions and staying healthy.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399516/environment_lvrght.jpg',
    likes: 4,
  },
  {
    id: 10,
    category: 'Business',
    author: 'Sakshi',
    authorPhoto:
      'https://res.cloudinary.com/dlovcfdar/image/upload/w_30/v1752399063/p3img_r9qqsr.jpg',
    date: 'May 5, 2025',
    readTime: '3 min read',
    title: 'Startup Trends That Will Dominate 2025',
    summary:
      'AI, green tech, and remote-first companies are leading the charge. Here’s what investors are watching.',
    mainImage:
      'https://res.cloudinary.com/dlovcfdar/image/upload/v1752399515/business_zzx4wx.jpg',
    likes: 11,
  },
];

function singleBlog(id:number){
  return blogPosts.find((blog)=> blog.id == id)
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateComponent },
  {
    path: 'blog/:id',
    loadComponent: () => import('./blog-details/blog-details.component').then((c) => c.BlogDetailsComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((c) => c.AdminComponent),
  },
  { path: 'blogs', component: BlogsComponent, data: { blogPosts } },
  { path: '**', component: NotFoundComponent },
];
