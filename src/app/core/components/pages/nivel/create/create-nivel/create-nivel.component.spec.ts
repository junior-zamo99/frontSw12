import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNivelComponent } from './create-nivel.component';

describe('CreateNivelComponent', () => {
  let component: CreateNivelComponent;
  let fixture: ComponentFixture<CreateNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNivelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
