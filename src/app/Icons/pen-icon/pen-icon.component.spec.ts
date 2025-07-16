import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenIconComponent } from './pen-icon.component';

describe('PenIconComponent', () => {
  let component: PenIconComponent;
  let fixture: ComponentFixture<PenIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
