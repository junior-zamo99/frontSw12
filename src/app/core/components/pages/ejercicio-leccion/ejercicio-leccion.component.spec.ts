import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioLeccionComponent } from './ejercicio-leccion.component';

describe('EjercicioLeccionComponent', () => {
  let component: EjercicioLeccionComponent;
  let fixture: ComponentFixture<EjercicioLeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjercicioLeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EjercicioLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
