import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTipoDocumentoComponent } from './crud-tipo-documento.component';

describe('CrudTipoDocumentoComponent', () => {
  let component: CrudTipoDocumentoComponent;
  let fixture: ComponentFixture<CrudTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudTipoDocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
