import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BvsComponent } from './bvs.component';

describe('BvsComponent', () => {
  let component: BvsComponent;
  let fixture: ComponentFixture<BvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BvsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
