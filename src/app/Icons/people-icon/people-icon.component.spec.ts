import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleIconComponent } from './people-icon.component';

describe('PeopleIconComponent', () => {
  let component: PeopleIconComponent;
  let fixture: ComponentFixture<PeopleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
