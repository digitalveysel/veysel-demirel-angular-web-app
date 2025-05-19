import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routes } from '../../../../server/models/routes.model';
import { IContact } from '../../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly URL = `${Routes.API}${Routes.CONTACT}`;

  constructor(private http: HttpClient) {}

  send(payload: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.URL, payload);
  }
}
