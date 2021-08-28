import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.css']
})
export class EditPriceComponent implements OnInit {
  form!: FormGroup ;
  product!: any;
  @Output() submitEM = new EventEmitter();
  constructor(private productsService: ProductsService,
    private dialogService : DialogService) { }


  ngOnInit(): void {
    this.product = this.productsService.getProduct();

    this.form = new FormGroup({
      price : new FormControl(this.product.price, Validators.required)
    });
  }

  submit(){
   
    if(this.form.invalid){
      return;
    }
    let price = this.form.controls['price'].value;
    let id = this.product.id;
    this.productsService.editPrice(this.product.id, price).subscribe(data => {
      this.dialogService.closeDialog();
    });
    

  }

}
