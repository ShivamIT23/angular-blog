import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickIconComponent } from './tick-icon.component';

describe('TickIconComponent', () => {
  let component: TickIconComponent;
  let fixture: ComponentFixture<TickIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
