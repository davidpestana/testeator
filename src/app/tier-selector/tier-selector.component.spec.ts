import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierSelectorComponent } from './tier-selector.component';

describe('TierSelectorComponent', () => {
  let component: TierSelectorComponent;
  let fixture: ComponentFixture<TierSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TierSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TierSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
