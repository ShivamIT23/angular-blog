import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailiconComponent } from './emailicon.component';

describe('EmailiconComponent', () => {
  let component: EmailiconComponent;
  let fixture: ComponentFixture<EmailiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailiconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
