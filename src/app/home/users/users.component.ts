import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'phone', 'address', 'email', 'delete'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private userService : UsersService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.userService.getListUsers().subscribe(data => {
     
      this.dataSource = data;

      this.dataSource = new MatTableDataSource<any>(Object.values(data));
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    });
  }

  resetData(){
    this.userService.getListUsers().subscribe(data => {
     
      this.dataSource = data;

      this.dataSource = new MatTableDataSource<any>(Object.values(data));
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  onDelete(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(res =>{
      if(res){
        this.userService.deleteProduct(id).subscribe(data =>{
          this.resetData();
        });
      }
    });
  }


}
