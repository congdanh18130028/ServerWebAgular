import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-description',
  templateUrl: './edit-description.component.html',
  styleUrls: ['./edit-description.component.css']
})
export class EditDescriptionComponent implements OnInit {
  form!: FormGroup ;
  product!: any;
  @Output() submitEM = new EventEmitter();
  constructor(private productsService: ProductsService,
    private dialogService : DialogService) { }

  ngOnInit(): void {
    this.product = this.productsService.getProduct();

    this.form = new FormGroup({
      description : new FormControl(this.product.description, Validators.required)
    });

  }

  submit(){
   
    if(this.form.invalid){
      return;
    }
    let description = this.form.controls['description'].value;
    this.productsService.editDescription(this.product.id, description).subscribe(data => {
      this.dialogService.closeDialog();
    });
  }

}
