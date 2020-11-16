import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { SelectionModel } from '@angular/cdk/collections/';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExclusionDialogComponent } from 'src/app/shared/components/exclusion-dialog/exclusion-dialog.component';

export interface UsuarioInterface {
  id: number;
  username: string;
  password: string;
  is_enabled: boolean;
  register_date: Date;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'password', 'is_enabled', 'register_date', 'name', 'surname', 'email', 'phone', 'action'];
  usuarios = [];
  dataSource: any;
  selection = new SelectionModel<UsuarioInterface>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any;

  constructor(
    private globalService: GlobalService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Modal Create
  openDialog(row: any): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '700px',
      data: { item: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsuarios();
    });
  }

  //Operações com usuarios
  getUsuarios() {
    this.globalService.getAllUsers().subscribe(
      (data: any) => {
        this.usuarios = data;
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.dataSource = new MatTableDataSource<UsuarioInterface>();
        this.dataSource.data = this.usuarios;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  deleteUsuario(id: number) {
    this.globalService.deleteUser(id).subscribe(
      (data: any) => {
        console.log(data)
        this.notify('Deletado!')
      },
      (err) => {
        console.log(err);
        this.notify('Ops!')
      },
      () => {
        this.getUsuarios();
      }
    )
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(ExclusionDialogComponent, {
      data: {
        onConfirm: () => { this.deleteUsuario(id); },
        onCancel: () => { dialogRef.close(); },
        title: 'Confirmação de exclusão',
        message: 'Deseja realmente excluir o Usuário?',
      }
    });
  }
}
