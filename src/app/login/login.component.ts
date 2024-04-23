import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Persona } from '../types/persona.type';
import { Usuario } from '../types/usuario.type';
import { EndpointService } from '../services/endpoint.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invitado: boolean;
  persona: Persona = {} as Persona;
  usuario: Usuario = {} as Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService,
    private endpointService: EndpointService
  ) { }

  ngOnInit(): void {
    this.initReactiveForm()
    this.invitado = false
    this.appService.invitado = false
  }

  initReactiveForm() {
    this.loginForm = this.formBuilder.group({
      usuario: [''],
      contrasena: [''],
      nombres: [''],
      apellidos: [''],
      cedula: [''],
    })
  }


  procesarDatos(){    
    return new Promise<any>(resolve => {
      this.usuario = {
        usuario: this.loginForm.get('usuario')?.value,
        contrasena: this.loginForm.get('contrasena')?.value
      }
      
        this.iniciarSesion(this.usuario).then(result => {
          console.log(result)
          resolve(result)
        })
    })
  }

  async iniciarSesion(usuario: Usuario): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.endpointService.iniciarSesion(usuario)
      );

      return response;
    } catch (error) {
      return error.error;
    }
  }

  onSubmit(){
    if(this.invitado){
      if(this.loginForm.get('nombres')?.value == '' || this.loginForm.get('apellidos')?.value == '' || this.loginForm.get('cedula')?.value == ''){
        alert('Por favor llene todos los campos')
      }
      this.router.navigate(['dashboard'])
      return
    }

    this.procesarDatos().then(result => {
      if(result){
        this.router.navigate(['dashboard'])
      } else {
        alert('Usuario o contraseña incorrectos')
      }
    })
  }

  
  iniciarInvitado(){
    this.invitado = true
    this.appService.invitado = true
  }

  iniciarAdministrador(){
    this.invitado = false
    this.appService.invitado = false
  }
}
