import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogeComponent } from './diloge.component';

describe('DilogeComponent', () => {
  let component: DilogeComponent;
  let fixture: ComponentFixture<DilogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilogeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
