import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Empresa } from '../models/Empresa'

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient){}
  url='https://backendgestorproyectos02-env.eba-k3pf5xkd.us-east-1.elasticbeanstalk.com/empresa/';

  getEmpresas(){
    return this.http.get<Empresa[]>(this.url+"listar");
  }
  createEmpresa(empresa:Empresa){
    return this.http.post<Empresa>(this.url,empresa);
  }

  async getEmpresaId(id:number){
    return this.http.get<Empresa>(this.url+id)
  }

  updateEmpresa(empresa:Empresa){
    return this.http.put<Empresa>(this.url+empresa.idempresa,empresa);
  }

  deleteEmpresa(empresa:Empresa){
    return this.http.delete<Empresa>(this.url+empresa.idempresa);
  }
}
