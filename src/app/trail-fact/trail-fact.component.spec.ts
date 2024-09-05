import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailFactComponent } from './trail-fact.component';

describe('TrailFactComponent', () => {
  let component: TrailFactComponent;
  let fixture: ComponentFixture<TrailFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailFactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
