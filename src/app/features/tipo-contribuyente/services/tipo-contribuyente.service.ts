import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TipoContribuyente from '../interfaces/tipoContribuyente.interface';
import CreateTipoContribuyente from '../interfaces/tipoContribuyente.create.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService {
  private API_TIPO_CONTRIBUYENTE_ENDPOINT = "http://localhost:8080/api/tipo-contribuyente/";

  constructor(private httpClient: HttpClient) {}

  public getAllTipoContribuyentes(): Observable<TipoContribuyente[]> {
    return this.httpClient.get<TipoContribuyente[]>(this.API_TIPO_CONTRIBUYENTE_ENDPOINT);
  }

  public getTipoContribuyenteById(id: number): Observable<TipoContribuyente> {
    const url = `${this.API_TIPO_CONTRIBUYENTE_ENDPOINT}${id}`;
    return this.httpClient.get<TipoContribuyente>(url);
  }

  public createTipoContribuyente(tipoContribuyente: CreateTipoContribuyente): Observable<CreateTipoContribuyente> {
    return this.httpClient.post<CreateTipoContribuyente>(this.API_TIPO_CONTRIBUYENTE_ENDPOINT, tipoContribuyente);
  }

  public deleteTipoContribuyente(id: number): Observable<void> {
    const url = `${this.API_TIPO_CONTRIBUYENTE_ENDPOINT}${id}`;
    return this.httpClient.delete<void>(url);
  }
}