import { Usuario } from "./usuario";

export class Session {
  public token: string = 'fake-token-jwt';
  public user: Usuario = new Usuario();
}
