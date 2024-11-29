import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeccionComponent } from './create-leccion.component';

describe('CreateLeccionComponent', () => {
  let component: CreateLeccionComponent;
  let fixture: ComponentFixture<CreateLeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
