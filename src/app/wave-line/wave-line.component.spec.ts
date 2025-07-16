import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveLineComponent } from './wave-line.component';

describe('WaveLineComponent', () => {
  let component: WaveLineComponent;
  let fixture: ComponentFixture<WaveLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaveLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
