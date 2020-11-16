import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionDialogComponent } from './exclusion-dialog.component';

describe('ExclusionDialogComponent', () => {
  let component: ExclusionDialogComponent;
  let fixture: ComponentFixture<ExclusionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExclusionDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
