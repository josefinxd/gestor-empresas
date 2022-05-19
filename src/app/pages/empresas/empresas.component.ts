import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../services/empresa.service'

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  empresas:Empresa[];
  constructor(private service:EmpresaService, private router:Router) { }

  ngOnInit() {
    this.service.getEmpresas()
    .subscribe(data=>{
      this.empresas=data;
    })
  }
  Nuevo(){
    this.router.navigate(["addempresa"]);
  }

}
