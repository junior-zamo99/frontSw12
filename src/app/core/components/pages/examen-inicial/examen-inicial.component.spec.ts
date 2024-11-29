import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenInicialComponent } from './examen-inicial.component';

describe('ExamenInicialComponent', () => {
  let component: ExamenInicialComponent;
  let fixture: ComponentFixture<ExamenInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamenInicialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamenInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
