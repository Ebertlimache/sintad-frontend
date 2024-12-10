import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import EntidadResumen from '../interfaces/entidad-summary.interface';
import Entidad from '../interfaces/entidad.interface';
import CreateEntidad from '../interfaces/entidad.interface.create';

@Injectable({
  providedIn: 'root'
})
export class EntidadService {
  private API_ENTIDADES_ENDPOINT = "http://localhost:8080/api/entidad/";

  constructor(private httpClient: HttpClient) {}

  public getAllEntidades(): Observable<EntidadResumen[]> {
    return this.httpClient.get<Entidad[]>(this.API_ENTIDADES_ENDPOINT);
  }

  public getEntidadById(id: number): Observable<Entidad> {
    const url = `${this.API_ENTIDADES_ENDPOINT}${id}`;
    return this.httpClient.get<Entidad>(url);
  }

  public createEntidad(entidad: CreateEntidad): Observable<CreateEntidad> {
    return this.httpClient.post<CreateEntidad>(this.API_ENTIDADES_ENDPOINT, entidad);
  }

  public deleteEntidad(id: number): Observable<void> {
    const url = `${this.API_ENTIDADES_ENDPOINT}${id}`;
    return this.httpClient.delete<void>(url);
  }

}
