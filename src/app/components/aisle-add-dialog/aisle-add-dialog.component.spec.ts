import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AisleAddDialogComponent } from './aisle-add-dialog.component';

describe('AisleAddDialogComponent', () => {
  let component: AisleAddDialogComponent;
  let fixture: ComponentFixture<AisleAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AisleAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AisleAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
