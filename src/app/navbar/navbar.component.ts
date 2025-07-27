import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService, Theme } from '../theme.service';
import { AddIconComponent } from '../Icons/add-icon/add-icon.component';
import { LogoIconComponent } from '../Icons/logo-icon/logo-icon.component';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AddIconComponent, LogoIconComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  theme: Theme = 'light';
  user_image: string | undefined;
  isUser = false;

  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }

  private subscriptions = new Subscription();

  constructor(
    private themeService: ThemeService,
    private usersService: UsersService
  ) {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });

    // Set isUser based on login status
    this.subscriptions.add(
      this.usersService.isLoggedIn$.subscribe((loggedIn) => {
        this.isUser = loggedIn;
      })
    );

    this.subscriptions.add(
      this.usersService.userImage$.subscribe((img) => {
        if (img) {
          this.user_image = img;
        } else {
          this.user_image = '/profile.jpg';
        }
      })
    );
  }

  loggedOut() {
    this.usersService.logout();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
