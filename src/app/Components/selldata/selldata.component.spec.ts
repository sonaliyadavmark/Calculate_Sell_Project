import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelldataComponent } from './selldata.component';

describe('SelldataComponent', () => {
  let component: SelldataComponent;
  let fixture: ComponentFixture<SelldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelldataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
