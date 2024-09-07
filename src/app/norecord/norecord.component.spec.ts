import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorecordComponent } from './norecord.component';

describe('NorecordComponent', () => {
  let component: NorecordComponent;
  let fixture: ComponentFixture<NorecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NorecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NorecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
