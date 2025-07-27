import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private backendUrl = environment.backendUrl; // ✅ Update if different
  private tokenKey = 'user_token'; // for sessionStorage

  private userKey = 'user_detail';

  private userInfoKey = 'user_info';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userImageSubject = new BehaviorSubject<string | null>(
    this.getUserPhoto()
  );
  userImage$ = this.userImageSubject.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getUserPhoto(): string | null {
    return sessionStorage.getItem(this.userKey);
  }

  private getUserInfo(): string | null {
    return sessionStorage.getItem(this.userInfoKey);
  }

  // ✅ Register User
  async registerUser(user: {
    email: string;
    password: string;
    fullName: string;
    photo?: string;
  }) {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.backendUrl}/users`, user)
      );
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async confirmUser() {
    const token = localStorage.getItem(this.tokenKey);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (sessionStorage.getItem(this.userInfoKey)) {
      return;
    }

    const response = await firstValueFrom(
      this.http.get<any>(`${this.backendUrl}/users/me`, { headers })
    );
    this.isLoggedInSubject.next(true);
      this.userImageSubject.next(response.photo);
    sessionStorage.setItem(this.userInfoKey, response.id);
    sessionStorage.setItem(this.userKey, response.photo);
    return response;
  }

  // ✅ Login User
  async loginUser(email: string, password: string) {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.backendUrl}/users/login`, body.toString(), {
          headers,
        })
      );

      // Save token to sessionStorage
      localStorage.setItem(this.tokenKey, response.access_token);
      sessionStorage.setItem(this.userKey, response.user_photo);
      sessionStorage.setItem(this.userInfoKey, response.user_id);

      this.isLoggedInSubject.next(true);
      this.userImageSubject.next(response.user_photo);

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async changePhoto(photo: FormData) {
    try {
      const token = localStorage.getItem(this.tokenKey);
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const response = await firstValueFrom(
        this.http.post<any>(`${this.backendUrl}/users/change-photo`, photo, {
          headers,
        })
      );
      if(!response.other){
        return response
      }
      sessionStorage.setItem(this.userKey, response.other.photo); // update sessionStorage
      this.userImageSubject.next(response.other.photo);
      return response;
    } catch (error) {
      console.error('Change photo error:', error);
      throw error;
    }
  }

  // ✅ Get Token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);

    this.isLoggedInSubject.next(false);
    this.userImageSubject.next(null);
  }

  // ✅ Check if logged in
  isLoggedIn(): boolean {
    return this.hasToken();
  }
}
