import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ThemeService, Theme } from './theme.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private lenis!: Lenis;
  private rafId: number = 0;
  theme: Theme = 'light';

  constructor(
    private themeService: ThemeService,
    private usersService: UsersService
  ) {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
    this.usersService.confirmUser();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngAfterViewInit(): void {
    this.lenis = new Lenis({
      smoothWheel: true,
      // You can add more config here
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      this.rafId = requestAnimationFrame(raf);
    };

    this.rafId = requestAnimationFrame(raf);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    this.lenis.destroy(); // Clean up
  }
}
