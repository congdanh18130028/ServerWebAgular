import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  product:any;
  form!: FormGroup ;
  categories!: any;
  @Output() submitEM = new EventEmitter();
  
  constructor(private productsService: ProductsService,
              private dialogService : DialogService) { }

  ngOnInit(): void {
    this.product = this.productsService.getProduct();
    this.productsService.getListCategory().subscribe(data => {
      this.categories = data;
    });

    this.form = new FormGroup({
      category : new FormControl(this.product.category, Validators.required)
    });
  }

  onAdd(){
    this.dialogService.openAddCategoryDialog();
  }

  submit(){
   
    if(this.form.invalid){
      return;
    }
   
    let category = this.form.controls['category'].value;
    this.productsService.editCategory(this.product.id, category).subscribe(data =>{
      this.dialogService.closeDialog();
    })

  }

}
