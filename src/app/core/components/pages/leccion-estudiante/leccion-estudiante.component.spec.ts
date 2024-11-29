import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeccionEstudianteComponent } from './leccion-estudiante.component';

describe('LeccionEstudianteComponent', () => {
  let component: LeccionEstudianteComponent;
  let fixture: ComponentFixture<LeccionEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeccionEstudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeccionEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
