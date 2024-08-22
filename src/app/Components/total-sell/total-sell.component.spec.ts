import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSellComponent } from './total-sell.component';

describe('TotalSellComponent', () => {
  let component: TotalSellComponent;
  let fixture: ComponentFixture<TotalSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
