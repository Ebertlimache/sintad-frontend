import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTipoContribuyenteComponent } from './crud-tipo-contribuyente.component';

describe('CrudTipoContribuyenteComponent', () => {
  let component: CrudTipoContribuyenteComponent;
  let fixture: ComponentFixture<CrudTipoContribuyenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTipoContribuyenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudTipoContribuyenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
