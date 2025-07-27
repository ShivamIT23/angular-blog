import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateComponent } from './create/create.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AuthGuard } from './auth.guard'; // adjust path if needed
import { ChangePhotoComponent } from './change-photo/change-photo.component';

export const categoryList = [
  {
    name: 'All',
    icon: '',
    color: 'bg-blue-200 dark:bg-blue-400/40',
    hover: '',
    textColor: 'text-blue-900 dark:text-blue-100',
  },
  {
    name: 'Business',
    icon: '💼',
    color: 'bg-[#E0F7FA] dark:bg-[#004D4D60]',
    hover: 'hover:bg-[#E8FBFD] dark:hover:bg-[#004D4D80]',
    textColor: 'text-[#004D4D] dark:text-[#B2EBF2]',
  },
  {
    name: 'Health',
    icon: '🏥',
    color: 'bg-[#FFFBEA] dark:bg-[#4E342E60]',
    hover: 'hover:bg-[#FFF8E1] dark:hover:bg-[#4E342E80]',
    textColor: 'text-[#795548] dark:text-[#FFF8E1]',
  },
  {
    name: 'Lifestyle',
    icon: '🌟',
    color: 'bg-[#FDECF1] dark:bg-[#880E4F60]',
    hover: 'hover:bg-[#FCE4EC] dark:hover:bg-[#880E4F80]',
    textColor: 'text-[#880E4F] dark:text-[#F8BBD0]',
  },
  {
    name: 'Technology',
    icon: '💻',
    color: 'bg-[#F1FBF2] dark:bg-[#1B5E2060]',
    hover: 'hover:bg-[#E8F5E9] dark:hover:bg-[#1B5E2080]',
    textColor: 'text-[#1B5E20] dark:text-[#C8E6C9]',
  },
  {
    name: 'Sports',
    icon: '⚽',
    color: 'bg-[#EDF7FE] dark:bg-[#0D47A160]',
    hover: 'hover:bg-[#E3F2FD] dark:hover:bg-[#0D47A180]',
    textColor: 'text-[#0D47A1] dark:text-[#BBDEFB]',
  },
  {
    name: 'Education',
    icon: '📚',
    color: 'bg-[#F8F0FB] dark:bg-[#4A148C60]',
    hover: 'hover:bg-[#F3E5F5] dark:hover:bg-[#4A148C80]',
    textColor: 'text-[#4A148C] dark:text-[#E1BEE7]',
  },
  {
    name: 'Food',
    icon: '🍳',
    color: 'bg-[#F7FBEC] dark:bg-[#33691E60]',
    hover: 'hover:bg-[#F1F8E9] dark:hover:bg-[#33691E80]',
    textColor: 'text-[#33691E] dark:text-[#DCEDC8]',
  },
  {
    name: 'Entertainment',
    icon: '🎭',
    color: 'bg-[#FFF9F0] dark:bg-[#E6510060]',
    hover: 'hover:bg-[#FFF3E0] dark:hover:bg-[#E6510080]',
    textColor: 'text-[#E65100] dark:text-[#FFE0B2]',
  },
  {
    name: 'Travel',
    icon: '✈️',
    color: 'bg-[#F2F0FA] dark:bg-[#1A237E60]',
    hover: 'hover:bg-[#EDE7F6] dark:hover:bg-[#1A237E80]',
    textColor: 'text-[#1A237E] dark:text-[#C5CAE9]',
  },
  {
    name: 'Finance',
    icon: '💰',
    color: 'bg-[#FFF9DB] dark:bg-[#8D6E6360]',
    hover: 'hover:bg-[#FFF4BF] dark:hover:bg-[#8D6E6380]',
    textColor: 'text-[#5D4037] dark:text-[#FFE082]',
  },
  {
    name: 'Fitness',
    icon: '🏋️‍♂️',
    color: 'bg-[#FFEFEA] dark:bg-[#BF360C60]',
    hover: 'hover:bg-[#FFE3DB] dark:hover:bg-[#BF360C80]',
    textColor: 'text-[#BF360C] dark:text-[#FFCCBC]',
  },
  {
    name: 'Environment',
    icon: '🌱',
    color: 'bg-[#F6FBEA] dark:bg-[#3E4C1F60]',
    hover: 'hover:bg-[#EEF7D5] dark:hover:bg-[#3E4C1F80]',
    textColor: 'text-[#3E4C1F] dark:text-[#DCE775]',
  },
  {
    name: 'General',
    icon: '📝',
    color: 'bg-[#E0E0E0] dark:bg-[#2A2E3280]',
    hover: 'hover:bg-[#D1D1D1] dark:hover:bg-[#2A2E32]',
    textColor: 'text-[#212121] dark:text-[#CFD8DC]',
  },
];

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  {
    path: 'create/:id',
    component: CreateComponent,
    // canActivate: [AuthGuard], // Uncomment if you want to protect this route
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./blog-details/blog-details.component').then(
        (c) => c.BlogDetailsComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then((c) => c.AdminComponent),
  },
  {
    path: 'my-blogs',
    loadComponent: () =>
      import('./my-blogs/my-blogs.component').then((c) => c.MyBlogsComponent),
    canActivate: [AuthGuard],
  },
  { path: 'blogs', component: BlogsComponent },
  {
    path: 'change-photo',
    component: ChangePhotoComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
