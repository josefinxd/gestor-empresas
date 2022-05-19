import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Empresa } from '../models/empresa'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient){}
  listar='http://localhost:1110/empresa/listar';
  crear='http://localhost:1110/empresa/';

  getEmpresas(){
    return this.http.get<Empresa[]>(this.listar);
  }
  createEmpresa(empresa:Empresa){
    return this.http.post<Empresa>(this.crear,empresa);
  }
}
