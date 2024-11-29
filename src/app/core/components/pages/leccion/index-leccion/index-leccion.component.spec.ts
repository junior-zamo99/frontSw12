import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLeccionComponent } from './index-leccion.component';

describe('IndexLeccionComponent', () => {
  let component: IndexLeccionComponent;
  let fixture: ComponentFixture<IndexLeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexLeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
