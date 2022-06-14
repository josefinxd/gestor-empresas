import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Session } from 'src/app/models/Sesion';
import { Usuario } from 'src/app/models/Usuario';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  usuario:Usuario =new Usuario();
  sesion:Session = new Session();

  constructor(private service:UsuarioService,private builder:FormBuilder,private toastr: ToastrService,
    private storageService:StorageService, private router: Router) {
    this.createBuilder();
  }

  createBuilder(){
    this.loginForm = this.builder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  public submitLogin(event:Event){
    console.log('submitLogin')
    this.submitted = true;
    this.error = null;
    if (this.loginForm.value.user === '') {
      this.toastr.error("Debe ingresar usuario", "Error", {
        timeOut: 3000
      })
    }
    if (this.loginForm.value.password === '') {
      this.toastr.error("Debe ingresar contraseña!", "Error", {
        timeOut: 3000
      })
    }
    if(this.loginForm.valid){
      this.usuario.usuario = this.loginForm.value.user;
      this.usuario.password = this.loginForm.value.password;
      this.service.loginUsuario(this.usuario).subscribe(
        data => {
          console.log('data', data)
          if(data == null){
            this.toastr.error("Usuario o contraseña invalidos!", "Error", {
              timeOut: 3000
            })
          }else{
            this.sesion.user = data;
            this.correctLogin(this.sesion)
          }
        },
        error => this.error = JSON.parse(error._body)
      )
    }
  }

  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['dashboard']);
  }
}
