import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog.service';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductsService, 
              private dialogService: DialogService) { }


  onDelete(id: number){
    this.dialogService.openConfirmDialog().afterClosed().subscribe(res =>{
      if(res){
        this.productService.deleteProduct(id).subscribe(data =>{
          this.resetData();
        });
      }
    });
  }

 

  onEdit(id: number){
    this.productService.getProductFromServer(id).subscribe(data => {
      this.productService.setProduct(data);
      this.dialogService.openEditDialog().afterClosed().subscribe(res => {
        this.productService.clearProduct();
        this.resetData();
      });
    });
   
    
  }

  onAdd(){
    this.dialogService.openAddDialog();
  }
  
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['imgPath','name', 'category', 'quantity', 'price', 'edit', 'delete'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  

  ngOnInit(): void {
    this.productService.getListProducts().subscribe(data => {
     
      this.dataSource = data;

      this.dataSource = new MatTableDataSource<any>(Object.values(data));
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

    });

  }

  resetData(){
    this.productService.getListProducts().subscribe(data => {
     
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

}
