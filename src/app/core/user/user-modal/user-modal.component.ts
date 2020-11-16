import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Usuario } from './usuario';
import { GlobalService } from 'src/app/shared/services/global.service';
import { UsuarioInterface } from '../list/list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  titulo = '';
  formUsuario: any;
  id: number = -1;

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.item != undefined) {
      this.titulo = 'Editar Usuário';
      this.createForm(this.interfaceToClass(this.data.item));
    } else {
      this.titulo = 'Cadastro de Usuários';
      this.createForm(new Usuario);
    }

  }

  createForm(user: Usuario) {
    this.formUsuario = this.fb.group({
      username: [user.username],
      password: [user.password],
      is_enabled: [user.is_enabled],
      name: [user.name],
      surname: [user.surname],
      email: [user.email],
      phone: [user.phone]
    })
  }

  onSubmit() {
    if (this.validatePrecisoDormir(this.formUsuario.value)) {
      if (this.id < 0) {
        this.createUsuario(this.formUsuario.value);
      } else {
        this.updateUsuario(this.formUsuario.value, this.id);
      }

    } else {
      this.notify('Ops, temos algum problema, verifique os campos!')
    }


  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  } // código repetido

  createUsuario(user: Usuario) {
    this.globalService.createUser(user).subscribe(
      (data: any) => {
        console.log(data)
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
      },
      () => {

      }
    )
  }

  updateUsuario(user: Usuario, id: number) {
    this.globalService.updateUser(user, id).subscribe(
      (data: any) => {
        console.log(data)
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
      },
      () => {

      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  interfaceToClass(user: UsuarioInterface): Usuario {
    console.log(user)
    let u = new Usuario;
    u.username = user.username;
    u.password = user.password;
    u.is_enabled = user.is_enabled;
    u.name = user.name;
    u.surname = user.surname;
    u.email = user.email;
    u.phone = user.phone;
    this.id = user.id;
    return u
  }
  validatePrecisoDormir(u: Usuario) {
    if (u.email.length > 0 &&
      u.name.length > 0 &&
      u.password.length > 0 &&
      u.phone.length > 0 &&
      u.surname.length > 0 &&
      u.username.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

