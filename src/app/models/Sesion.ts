import { Usuario } from "./Usuario";

export class Session {
  public token: string = 'fake-token-jwt';
  public user: Usuario = new Usuario();
}
