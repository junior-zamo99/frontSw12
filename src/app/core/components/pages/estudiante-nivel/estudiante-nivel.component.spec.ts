import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteNivelComponent } from './estudiante-nivel.component';

describe('EstudianteNivelComponent', () => {
  let component: EstudianteNivelComponent;
  let fixture: ComponentFixture<EstudianteNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteNivelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudianteNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
