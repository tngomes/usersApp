import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/user/user-modal/usuario';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  BASE_URL = 'http://localhost:8080/user';
  constructor(
    private http: HttpClient,
  ) { }

  getAllUsers() {
    return this.http.get(`${this.BASE_URL}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.BASE_URL}/${id}`)
  }

  createUser(user: Usuario) {
    return this.http.post(`${this.BASE_URL}`, user)
  }

  updateUser(user: Usuario, id: number) {
    return this.http.put(`${this.BASE_URL}/${id}`, user)
  }

}
