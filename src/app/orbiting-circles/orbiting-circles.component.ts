import { CommonModule } from '@angular/common';
import { Component, Input, ContentChildren, QueryList, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-orbiting-circles',
  templateUrl: './orbiting-circles.component.html',
  imports:[CommonModule],
  styleUrls: ['./orbiting-circles.component.css'],
})
export class OrbitingCirclesComponent implements AfterViewInit {
  @Input() iconSize = 40;
  @Input() radius = 150;
  @Input() reverse = false;
  @Input() speed = 1;

  @ContentChildren('icon') icons!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const angleStep = 360 / this.icons.length;
    this.icons.forEach((el, i) => {
      const angle = angleStep * i;
      const x = this.radius * Math.cos((angle * Math.PI) / 180);
      const y = this.radius * Math.sin((angle * Math.PI) / 180);

      this.renderer.setStyle(el.nativeElement, 'position', 'absolute');
      this.renderer.setStyle(el.nativeElement, 'transform', `translate(${x}px, ${y}px)`);
      this.renderer.setStyle(el.nativeElement, 'width', `${this.iconSize}px`);
      this.renderer.setStyle(el.nativeElement, 'height', `${this.iconSize}px`);
    });
  }
}
