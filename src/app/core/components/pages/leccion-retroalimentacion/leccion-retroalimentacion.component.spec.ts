import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeccionRetroalimentacionComponent } from './leccion-retroalimentacion.component';

describe('LeccionRetroalimentacionComponent', () => {
  let component: LeccionRetroalimentacionComponent;
  let fixture: ComponentFixture<LeccionRetroalimentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeccionRetroalimentacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeccionRetroalimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
