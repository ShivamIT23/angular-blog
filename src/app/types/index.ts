// User related interfaces
export interface User {
  _id: string;
  username: string;
  email: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

// Blog related interfaces
export interface Blog {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  category: string;
  author: {
    _id: string;
    username: string;
    photo?: string;
  };
  likes: number;
  whoLiked: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogWithSafeTitle extends Blog {
  safeTitle?: SafeHtml;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  summary?: string;
  category: string;
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
  id: string;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  blog?: Blog;
}

export interface BlogsResponse {
  blogs: Blog[];
  hasMore: boolean;
  totalFetched: number;
}

export interface LikeResponse {
  success: boolean;
  likes: number;
  userLiked: boolean;
  message?: string;
}

// Pagination interfaces
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginationResponse<T> {
  data: T[];
  hasMore: boolean;
  totalFetched: number;
  currentPage: number;
  totalPages: number;
}

// Category interfaces
export interface Category {
  name: string;
  icon: string;
  color: string;
  hover: string;
  textColor: string;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// File upload interfaces
export interface FileUploadResponse {
  success: boolean;
  message: string;
  url?: string;
  filename?: string;
}

// Error interfaces
export interface ApiError {
  status: number;
  message: string;
  details?: string;
}

// Component interfaces
export interface MarqueeItem {
  id: string;
  text: string;
  icon?: string;
}

// Theme interfaces
export interface ThemeConfig {
  isDark: boolean;
  primaryColor: string;
  secondaryColor: string;
}

// Import SafeHtml from Angular
import { SafeHtml } from '@angular/platform-browser'; 