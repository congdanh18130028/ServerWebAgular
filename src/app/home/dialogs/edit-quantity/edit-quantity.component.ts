import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-quantity',
  templateUrl: './edit-quantity.component.html',
  styleUrls: ['./edit-quantity.component.css']
})
export class EditQuantityComponent implements OnInit {
  form!: FormGroup ;
  product!: any;
  @Output() submitEM = new EventEmitter();
 
  constructor(private productsService: ProductsService,
              private dialogService : DialogService) { }

  ngOnInit(): void {
    
    this.product = this.productsService.getProduct();

    this.form = new FormGroup({
      quantity : new FormControl(this.product.quantity, Validators.required)
    });
  }
  submit(){
   
    if(this.form.invalid){
      return;
    }
    let quantity = this.form.controls['quantity'].value;
    let id = this.product.id;
    this.productsService.editQuantity(this.product.id, quantity).subscribe(data => {
      this.dialogService.closeDialog();
    })
    

  }

}
