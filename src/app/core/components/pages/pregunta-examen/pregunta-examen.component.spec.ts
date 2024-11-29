import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaExamenComponent } from './pregunta-examen.component';

describe('PreguntaExamenComponent', () => {
  let component: PreguntaExamenComponent;
  let fixture: ComponentFixture<PreguntaExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntaExamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreguntaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
