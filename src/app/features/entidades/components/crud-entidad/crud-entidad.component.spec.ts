import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEntidadComponent } from './crud-entidad.component';

describe('CrudEntidadComponent', () => {
  let component: CrudEntidadComponent;
  let fixture: ComponentFixture<CrudEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudEntidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
