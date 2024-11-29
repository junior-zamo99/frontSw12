import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNivelComponent } from './index-nivel.component';

describe('IndexNivelComponent', () => {
  let component: IndexNivelComponent;
  let fixture: ComponentFixture<IndexNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexNivelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
