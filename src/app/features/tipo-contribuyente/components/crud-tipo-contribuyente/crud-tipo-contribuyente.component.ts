import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import TipoContribuyente from '../../interfaces/tipoContribuyente.interface';
import { TipoContribuyenteService } from '../../../tipo-contribuyente/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import CreateTipoContribuyente from '../../interfaces/tipoContribuyente.create.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-crud-tipo-contribuyente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule,NgxPaginationModule],
  templateUrl: './crud-tipo-contribuyente.component.html',
  styleUrl: './crud-tipo-contribuyente.component.css'
})

export class CrudTipoContribuyenteComponent implements OnInit {
  tipoContribuyentes: TipoContribuyente[] = [];
  tipoContribuyenteCompleto: TipoContribuyente | null = null;
  nuevoIdTipoContribuyente: number | null = null;
  tipoContribuyenteNoEncontrado: boolean = false;
  nuevoTipoContribuyente!: CreateTipoContribuyente;
  mostrarDetalles: boolean = false;
  page: number = 1;

  @ViewChild('tipoContribuyenteNoEncontradaModal') tipoContribuyenteNoEncontradaModal!: TemplateRef<any>;

  constructor(private tipoContribuyenteService: TipoContribuyenteService, 
    private modalService: NgbModal
   ){
    this.limpiarCampos();
   }

  async ngOnInit(): Promise<void> {
    await this.getAllTipoContribuyentes();
  }

  openTipoContribuyenteNoEncontradaModal(): void {
		this.modalService.open(this.tipoContribuyenteNoEncontradaModal);
	}
    
  ocultarJSON() {
    this.tipoContribuyenteCompleto = null;
  }
  
  limpiarCampos() {
    this.nuevoTipoContribuyente = {  nombre: "", estado: true  };
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  async createTipoContribuyente(): Promise<void> {
    try {
      await firstValueFrom(this.tipoContribuyenteService.createTipoContribuyente(this.nuevoTipoContribuyente));  
      await this.getAllTipoContribuyentes();
      this.limpiarCampos();
      this.modalService.dismissAll();
    } catch (error) {
      console.error('Error al crear el tipo de contribuyente:', error);
    }
  }

  async getAllTipoContribuyentes(): Promise<void> {
    try {
      this.tipoContribuyentes = await firstValueFrom(this.tipoContribuyenteService.getAllTipoContribuyentes());
    } catch (error) {
      console.error('Error al obtener los tipos de contribuyentes:', error);
    }
  }

  async searchTipoContribuyenteById(): Promise<void> {
    if (this.nuevoIdTipoContribuyente !== null) {
      this.tipoContribuyenteNoEncontrado=false;
      try {
        this.tipoContribuyenteCompleto = await firstValueFrom(this.tipoContribuyenteService.getTipoContribuyenteById(this.nuevoIdTipoContribuyente));
        this.mostrarDetalles = true;
      } catch (error:any) {
        console.error('Error al buscar el tipo de contribuyente:', error);
        if (error && error.status === 404) {
          this.openTipoContribuyenteNoEncontradaModal();
          this.tipoContribuyenteNoEncontrado = true;
        }
      }
    }
  }

  async deleteTipoContribuyente(idTipoContribuyente: number): Promise<void> {
    try {
      await firstValueFrom(this.tipoContribuyenteService.deleteTipoContribuyente(idTipoContribuyente));
      console.log('Tipo de contribuyente eliminado correctamente');
      await this.getAllTipoContribuyentes();
    } catch (error) {
      console.error('Error al eliminar el tipo de contribuyente:', error);
    }
  }

  async detailsTipoContribuyente(tipoContribuyente: TipoContribuyente): Promise<void> {
    try {
      this.tipoContribuyenteCompleto = await firstValueFrom(this.tipoContribuyenteService.getTipoContribuyenteById(tipoContribuyente.idTipoContribuyente));
    } catch (error) {
      console.error('Error al obtener los detalles del tipo de contribuyente:', error);
    }
    this.mostrarDetalles = true;
  }

  onPageChange(event: number): void {
		this.page = event;
	}
}