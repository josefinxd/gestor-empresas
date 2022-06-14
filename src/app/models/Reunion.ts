import { Usuario } from "./Usuario";

export class Reunion{
  idreunion:number;
  fecha:Date;
  idusuario:Usuario = new Usuario();
  idcliente:Usuario = new Usuario();
}
