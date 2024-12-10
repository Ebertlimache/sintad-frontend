import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import TipoDocumento from '../../interfaces/tipoDocumento.interface';
import { TipoDocumentoService } from '../../../tipo-documento/services';
import { firstValueFrom } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import CreateTipoDocumento from '../../interfaces/tipoDocumento.create.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-crud-tipo-documento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule, NgxPaginationModule],
  templateUrl: './crud-tipo-documento.component.html',
  styleUrl: './crud-tipo-documento.component.css'
})
export class CrudTipoDocumentoComponent implements OnInit {
  tipoDocumentos: TipoDocumento[] = [];
  tipoDocumentoCompleto: TipoDocumento | null = null;
  nuevoIdTipoDocumento: number | null = null;
  tipoDocumentoNoEncontrado: boolean = false;
  nuevoTipoDocumento!: CreateTipoDocumento;
  page: number = 1;
	mostrarDetalles: boolean = false;

  @ViewChild('tipoDocumentoNoEncontradaModal') tipoDocumentoNoEncontradaModal!: TemplateRef<any>;

  constructor(private tipoDocumentoService: TipoDocumentoService,
    private modalService: NgbModal) {
    this.limpiarCampos();
  }

  async ngOnInit(): Promise<void> {
    await this.getAllTipoDocumentos();
  }

  openTipoDocumentoNoEncontradaModal(): void {
		this.modalService.open(this.tipoDocumentoNoEncontradaModal);
	}

  ocultarJSON() {
    this.tipoDocumentoCompleto = null;
  }

  limpiarCampos() {
    this.nuevoTipoDocumento = {
      codigo: '',
      nombre: '',
      descripcion: '',
      estado: true
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  async createTipoDocumento(): Promise<void> {
    try {
      await firstValueFrom(this.tipoDocumentoService.createTipoDocumento(this.nuevoTipoDocumento));
      await this.getAllTipoDocumentos();
      this.limpiarCampos();
      this.modalService.dismissAll();
    } catch (error) {
      console.error('Error al crear el tipo de contribuyente:', error);
    }
  }

  async getAllTipoDocumentos(): Promise<void> {
    try {
      this.tipoDocumentos = await firstValueFrom(this.tipoDocumentoService.getAllTipoDocumentos());
    } catch (error) {
      console.error('Error al obtener los tipos de documentos:', error);
    }
  }

  async searchTipoDocumentoById(): Promise<void> {
    if (this.nuevoIdTipoDocumento !== null) {
      this.tipoDocumentoNoEncontrado = false;
      try {
        this.tipoDocumentoCompleto = await firstValueFrom(this.tipoDocumentoService.getTipoDocumentoById(this.nuevoIdTipoDocumento));
        this.mostrarDetalles = true;
      } catch (error: any) {
        console.error('Error al buscar el tipo de documento:', error);
        if (error && error.status === 404) {
          this.openTipoDocumentoNoEncontradaModal();
          this.tipoDocumentoNoEncontrado = true;
        }
      }
    }
  }

  async deleteTipoDocumento(idTipoDocumento: number): Promise<void> {
    try {
      await firstValueFrom(this.tipoDocumentoService.deleteTipoDocumento(idTipoDocumento));
      console.log('Tipo de documento eliminado correctamente');
      await this.getAllTipoDocumentos();
    } catch (error) {
      console.error('Error al eliminar el tipo de documento:', error);
    }
  }

  async detailsTipoDocumento(tipoDocumento: TipoDocumento): Promise<void> {
    try {
      this.tipoDocumentoCompleto = await firstValueFrom(this.tipoDocumentoService.getTipoDocumentoById(tipoDocumento.idTipoDocumento));
    } catch (error) {
      console.error('Error al obtener los detalles del tipo de documento:', error);
    }
    this.mostrarDetalles = true;
  }

  onPageChange(event: number): void {
		this.page = event;
	}
}