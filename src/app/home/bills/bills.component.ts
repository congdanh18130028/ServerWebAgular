import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','totalPrice', 'isPay', 'confirm'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  



  constructor(private billService : BillsService) { }

  ngOnInit(): void {
    

    this.billService.getAllBills0().subscribe(data => {
     
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

  resetData(){
    this.billService.getAllBills0().subscribe(data => {
     
      this.dataSource = data;

      this.dataSource = new MatTableDataSource<any>(Object.values(data));
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    });
  }
  
  onConfirm(id: number){
    this.billService.changeState(id, 1).subscribe(data => {
      window.alert("thành công");
      this.resetData();
    })
  }



}
