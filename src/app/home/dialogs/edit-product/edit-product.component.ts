import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product! : any;
  categories!: any;
  img!: string;


  
  constructor(private dialogService: DialogService,
              private productService: ProductsService,
              private formBuilder : FormBuilder,) { }

  onAdd(){
    this.dialogService.openAddCategoryDialog();
  }

  editName(id:number){
    this.productService.getProductFromServer(id).subscribe(data => {
      this.productService.setProduct(data);
      this.dialogService.openEditNameDialog();
    
     
    });
    
  }

  editDescription(id:number){
    this.productService.getProductFromServer(id).subscribe(data => {
      this.productService.setProduct(data);
      this.dialogService.openEditDescriptionDialog();
    
     
    });
    
  }

  editImg(id:number){
    this.productService.getProductFromServer(id).subscribe(data => {
      this.productService.setProduct(data);
      this.dialogService.openEditImgDialog();
    
     
    });
    
  }


  editQuantity(id:number){
    this.productService.getProductFromServer(id).subscribe(data => {
      this.productService.setProduct(data);
      this.dialogService.openEditQuantityDialog();
    
     
    });
  }

  editPrice(id:number){
    this.productService.getProductFromServer(id).subscribe(data => {
      this.productService.setProduct(data);
      this.dialogService.openEditPriceDialog();
    
     
    });
  }


  editCategory(id:number){
    this.productService.getProductFromServer(id).subscribe(data => {
      this.productService.setProduct(data);
      this.dialogService.openEditCategoryDialog();
    
     
    });
  }

  ngOnInit(): void {

    
    this.product = this.productService.getProduct();
    this.img = this.product.imgPath[0].path;
    
  }


  


}
