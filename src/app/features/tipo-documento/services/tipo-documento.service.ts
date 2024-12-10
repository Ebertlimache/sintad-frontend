import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TipoDocumento from '../interfaces/tipoDocumento.interface';
import { Observable } from 'rxjs';
import CreateTipoDocumento from '../interfaces/tipoDocumento.create.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private API_TIPO_DOCUMENTO_ENDPOINT = "http://localhost:8080/api/tipo-documento/";

  constructor(private httpClient: HttpClient) {}

  public getAllTipoDocumentos(): Observable<TipoDocumento[]> {
    return this.httpClient.get<TipoDocumento[]>(this.API_TIPO_DOCUMENTO_ENDPOINT);
  }

  public getTipoDocumentoById(id: number): Observable<TipoDocumento> {
    const url = `${this.API_TIPO_DOCUMENTO_ENDPOINT}${id}`;
    return this.httpClient.get<TipoDocumento>(url);
  }

  public createTipoDocumento(tipoDocumento: CreateTipoDocumento): Observable<CreateTipoDocumento> {
    return this.httpClient.post<CreateTipoDocumento>(this.API_TIPO_DOCUMENTO_ENDPOINT, tipoDocumento);
  }

  public deleteTipoDocumento(id: number): Observable<void> {
    const url = `${this.API_TIPO_DOCUMENTO_ENDPOINT}${id}`;
    return this.httpClient.delete<void>(url);
  }
}