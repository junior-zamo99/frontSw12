import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeccionNivelComponent } from './leccion-nivel.component';

describe('LeccionNivelComponent', () => {
  let component: LeccionNivelComponent;
  let fixture: ComponentFixture<LeccionNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeccionNivelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeccionNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
