import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitingCirclesComponent } from './orbiting-circles.component';

describe('OrbitingCirclesComponent', () => {
  let component: OrbitingCirclesComponent;
  let fixture: ComponentFixture<OrbitingCirclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrbitingCirclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrbitingCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
