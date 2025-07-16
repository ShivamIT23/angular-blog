import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService, Theme } from '../theme.service';
import { AddIconComponent } from '../Icons/add-icon/add-icon.component';
import { LogoIconComponent } from '../Icons/logo-icon/logo-icon.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,AddIconComponent,LogoIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  theme: Theme = 'light';

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
