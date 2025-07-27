import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

interface CreateBlog {
  title: string;
  category: string;
  mainImage: string;
  content: string;
  summary: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private backendUrl = environment.backendUrl; // Replace with your actual backend URL
  private blogData: any[] | null = null;
  private blogsSubject = new BehaviorSubject<any[]>([]);
  blogs$ = this.blogsSubject.asObservable();
  private myBlogsSubject = new BehaviorSubject<any[]>([]);
  myBlogs$ = this.myBlogsSubject.asObservable();

  // Throttling properties
  private lastRefreshTime = 0;
  private lastMyBlogsRefreshTime = 0;
  private readonly THROTTLE_DELAY = 2000; // 2 seconds minimum between refresh calls

  constructor(private http: HttpClient) {
    const cached = sessionStorage.getItem('blogs');
    if (cached) {
      this.blogData = JSON.parse(cached);
      this.blogsSubject.next(this.blogData ?? []);
    } else {
      this.blogsSubject.next([]);
    }
    // Load myBlogs from sessionStorage
    const cachedMyBlogs = sessionStorage.getItem('myBlogs');
    if (cachedMyBlogs) {
      this.myBlogsSubject.next(JSON.parse(cachedMyBlogs));
    }
  }

  async fetchAllBlogs(page: number = 1, limit: number = 6): Promise<{ blogs: any[], hasMore: boolean, totalFetched: number }> {
    const skip = (page - 1) * limit;
    const fetchLimit = limit + 1; // Fetch one extra to check if there's more
    
    
    try {
      // Check if we have cached data for this page
      const cachedKey = `blogs_page_${page}`;
      const cached = sessionStorage.getItem(cachedKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        console.log(`Returning cached data for page ${page}`);
        return cachedData;
      }

      const response = await firstValueFrom(
        this.http.get<any[]>(`${this.backendUrl}/posts/?skip=${skip}&limit=${fetchLimit}`)
      );

      const formatted = response.map((blog) => ({
        ...blog,
        date: blog.date
          ? new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '',
      }));

      // Check if there are more pages
      const hasMore = formatted.length > limit;
      const blogsToShow = hasMore ? formatted.slice(0, limit) : formatted;
      
      const result = {
        blogs: blogsToShow,
        hasMore: hasMore,
        totalFetched: formatted.length
      };

      // Cache this page's data
      sessionStorage.setItem(cachedKey, JSON.stringify(result));
      
      // Update the main blogData cache
      this.updateMainCache(page, blogsToShow);

      // console.log(`Page ${page} result:`, {
      //   blogsCount: blogsToShow.length,
      //   hasMore,
      //   totalFetched: formatted.length
      // });

      return result;
    } catch (err) {
      console.error('Error fetching blogs', err);
      return { blogs: [], hasMore: false, totalFetched: 0 };
    }
  }

  private updateMainCache(page: number, newBlogs: any[]) {
    // Get existing cached blogs
    const existingCached = sessionStorage.getItem('blogs');
    let allBlogs = existingCached ? JSON.parse(existingCached) : [];
    
    // Calculate the start index for this page
    const startIndex = (page - 1) * 6; // 6 is the itemsPerPage
    
    // Replace or add blogs for this page
    for (let i = 0; i < newBlogs.length; i++) {
      const globalIndex = startIndex + i;
      if (globalIndex < allBlogs.length) {
        allBlogs[globalIndex] = newBlogs[i];
      } else {
        allBlogs.push(newBlogs[i]);
      }
    }
    
    // Update the main cache
    this.blogData = allBlogs;
    this.blogsSubject.next(allBlogs);
    sessionStorage.setItem('blogs', JSON.stringify(allBlogs));
  }

  getCachedPage(page: number): { blogs: any[], hasMore: boolean, totalFetched: number } | null {
    const cachedKey = `blogs_page_${page}`;
    const cached = sessionStorage.getItem(cachedKey);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  }

  async getTotalBlogsCount(): Promise<number> {
    try {
      // If your API supports a count endpoint, use it
      const response = await firstValueFrom(
        this.http.get<any>(`${this.backendUrl}/posts/count`)
      );
      return response.count || response.total || 0;
    } catch (err) {
      console.error('Error fetching total blogs count', err);
      // Fallback: return cached data length if available
      return this.blogData ? this.blogData.length : 0;
    }
  }

  async createBlogs(blog: CreateBlog) {
    try {
      const token =
        sessionStorage.getItem('user_token') ||
        localStorage.getItem('user_token');
      const response = await firstValueFrom(
        this.http.post<any>(`${this.backendUrl}/posts`, blog, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );

      // Update cache for blogs
      if (this.blogData) {
        const formatted = {
          ...response,
          date: blog.date
            ? new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '',
        };
        this.blogData.unshift(formatted); // Add new blog to the start
        this.blogsSubject.next([...this.blogData]);
        sessionStorage.setItem('blogs', JSON.stringify(this.blogData));
      }

      // Refresh myBlogs after creating a blog
      await this.refreshMyBlogs();

      return response;
    } catch (err) {
      console.error('Error is :', err);
      return 'Could not publish your Ideas, Sorry for the trouble please try again after some time';
    }
  }

  getCachedBlogs(): any[] | null {
    return this.blogData;
  }

  async fetchSingleBlog(id: string): Promise<any | null> {
    // First check if we have cached data
    if (this.blogData) {
      const blog = this.blogData.find((blog) => blog.id === id);
      if (blog) {
        console.log('Returning cached blog data for ID:', id);
        return blog;
      }
    }

    // If not found in cache, try to fetch from API
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.backendUrl}/posts/${id}`)
      );
      response.date = response.date
        ? new Date(response.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '';
      return response;
    } catch (err) {
      console.error('Error fetching single blog:', err);
      return null;
    }
  }

  /**
   * Always fetches blogs from backend, updates cache, BehaviorSubject, and sessionStorage.
   * Includes throttling to prevent excessive API calls.
   */
  async refreshBlogs(skip: number = 0, limit: number = 10): Promise<any[]> {
    const now = Date.now();
    if (now - this.lastRefreshTime < this.THROTTLE_DELAY) {
      console.log('Throttling refreshBlogs - too soon since last refresh');
      return this.blogData || [];
    }
    
    this.lastRefreshTime = now;
    
    // Clear all page-specific cache
    this.clearPageCache();
    
    try {
      const response = await firstValueFrom(
        this.http.get<any[]>(
          `${this.backendUrl}/posts/?skip=${skip}&limit=${limit}`
        )
      );
      const formatted = response.map((blog) => ({
        ...blog,
        date: blog.date
          ? new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '',
      }));
      this.blogData = formatted;
      this.blogsSubject.next(formatted);
      sessionStorage.setItem('blogs', JSON.stringify(formatted));
      return formatted;
    } catch (err) {
      console.error('Error force-refreshing blogs', err);
      return [];
    }
  }

  private clearPageCache() {
    // Clear all page-specific cache entries
    for (let i = 1; i <= 20; i++) { // Clear first 20 pages
      sessionStorage.removeItem(`blogs_page_${i}`);
    }
  }

  async deleteBlog(id: string): Promise<boolean> {
    const token =
      sessionStorage.getItem('user_token') ||
      localStorage.getItem('user_token');
    if (!token) {
      console.error('No authentication token found');
      return false;
    }

    try {
      await firstValueFrom(
        this.http.delete(`${this.backendUrl}/posts/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );

      // Remove from blogs cache
      if (this.blogData) {
        this.blogData = this.blogData.filter((blog) => blog.id !== id);
        this.blogsSubject.next([...this.blogData]);
        sessionStorage.setItem('blogs', JSON.stringify(this.blogData));
      }

      // Refresh myBlogs after deleting a blog
      await this.refreshMyBlogs();
      await this.refreshBlogs();

      return true;
    } catch (err) {
      console.error('Error deleting blog:', err);
      return false;
    }
  }

  /**
   * Fetches the current user's posts from /posts/mine with Authorization header and updates the BehaviorSubject and sessionStorage.
   */
  async getMineBlogs(): Promise<any[]> {
    const token =
      sessionStorage.getItem('user_token') ||
      localStorage.getItem('user_token');
    if (sessionStorage.getItem('myBlogs')) {
      this.myBlogsSubject.next(
        JSON.parse(sessionStorage.getItem('myBlogs') || '[]')
      );
      console.log('Returning cached myBlogs');
      return JSON.parse(sessionStorage.getItem('myBlogs') || '[]');
    }
    try {
      const response = await firstValueFrom(
        this.http.get<any[]>(`${this.backendUrl}/posts/mine`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );
      const formatted = response.map((blog) => ({
        ...blog,
        date: blog.date
          ? new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '',
      }));
      this.myBlogsSubject.next(formatted);
      sessionStorage.setItem('myBlogs', JSON.stringify(formatted));
      return formatted;
    } catch (err) {
      console.error('Error fetching my posts:', err);
      this.myBlogsSubject.next([]);
      sessionStorage.setItem('myBlogs', JSON.stringify([]));
      return [];
    }
  }

  /**
   * Refreshes myBlogs from backend, updates BehaviorSubject and sessionStorage.
   * Includes throttling to prevent excessive API calls.
   */
  async refreshMyBlogs(): Promise<any[]> {
    const now = Date.now();
    if (now - this.lastMyBlogsRefreshTime < this.THROTTLE_DELAY) {
      console.log('Throttling refreshMyBlogs - too soon since last refresh');
      return JSON.parse(sessionStorage.getItem('myBlogs') || '[]');
    }

    this.lastMyBlogsRefreshTime = now;
    const token =
      sessionStorage.getItem('user_token') ||
      localStorage.getItem('user_token');
    try {
      const response = await firstValueFrom(
        this.http.get<any[]>(`${this.backendUrl}/posts/mine`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );
      const formatted = response.map((blog) => ({
        ...blog,
        date: blog.date
          ? new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '',
      }));
      this.myBlogsSubject.next(formatted);
      sessionStorage.setItem('myBlogs', JSON.stringify(formatted));
      return formatted;
    } catch (err) {
      console.error('Error refreshing my posts:', err);
      this.myBlogsSubject.next([]);
      sessionStorage.setItem('myBlogs', JSON.stringify([]));
      return [];
    }
  }

  async updateBlog(id: string, updatedBlog: any): Promise<any> {
    const token =
      sessionStorage.getItem('user_token') ||
      localStorage.getItem('user_token');
    if (!token) {
      console.error('No authentication token found');
      return 'No authentication token found';
    }
    try {
      const response = await firstValueFrom(
        this.http.put<any>(`${this.backendUrl}/posts/${id}`, updatedBlog, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );
      // Update cache for blogs
      if (this.blogData) {
        const idx = this.blogData.findIndex((blog) => blog.id === id);
        if (idx !== -1) {
          this.blogData[idx] = {
            ...this.blogData[idx],
            ...updatedBlog,
            date: updatedBlog.date
              ? new Date(updatedBlog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : '',
          };
          this.blogsSubject.next([...this.blogData]);
          sessionStorage.setItem('blogs', JSON.stringify(this.blogData));
        }
      }
      // Refresh myBlogs after updating a blog
      await this.refreshMyBlogs();
      return response;
    } catch (err) {
      console.error('Error updating blog:', err);
      return 'Could not update your blog. Please try again later.';
    }
  }

  async likePost(postId: string): Promise<{ success: boolean; likes: number; userLiked: boolean; message?: string }> {
    const token = sessionStorage.getItem('user_token') || localStorage.getItem('user_token');
    if (!token) {
      return { success: false, likes: 0, userLiked: false, message: 'No authentication token found' };
    }

    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.backendUrl}/posts/${postId}/like`, {}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );

      // Update cache for blogs
      if (this.blogData) {
        const idx = this.blogData.findIndex((blog) => blog.id === postId);
        if (idx !== -1) {
          this.blogData[idx].likes = response.likes;
          this.blogData[idx].whoLiked = response.whoLiked;
          this.blogsSubject.next([...this.blogData]);
          sessionStorage.setItem('blogs', JSON.stringify(this.blogData));
        }
      }

      // Clear page cache to ensure fresh data
      this.clearPageCache();

      // Refresh blogs to get updated data
      await this.refreshBlogs();

      return {
        success: true,
        likes: response.likes,
        userLiked: response.userLiked,
        message: response.message
      };
    } catch (err) {
      console.error('Error liking post:', err);
      return { 
        success: false, 
        likes: 0, 
        userLiked: false, 
        message: 'Failed to like post. Please try again.' 
      };
    }
  }
}
