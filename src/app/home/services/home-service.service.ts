import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { environments } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  private baseUrl = environments.apiUrl;
  public user: User | undefined;

  constructor(
    private http: HttpClient,
  ) { }

 
}
