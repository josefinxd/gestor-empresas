import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Reunion } from '../models/reunion'

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  constructor(private http:HttpClient){}
  url='http://backendgestorproyectos01-env.eba-spf4u5uu.us-east-1.elasticbeanstalk.com/reunion/';

  getReuniones(){
    return this.http.get<Reunion[]>(this.url+"listar");
  }
  createReunion(reunion:Reunion){
    return this.http.post<Reunion>(this.url,reunion);
  }

  getReunionId(id:number){
    return this.http.get<Reunion>(this.url+id)
  }

  updateReunion(reunion:Reunion){
    return this.http.put<Reunion>(this.url+reunion.idreunion,reunion);
  }

  deleteReunion(reunion:Reunion){
    return this.http.delete<Reunion>(this.url+reunion.idreunion);
  }
}
