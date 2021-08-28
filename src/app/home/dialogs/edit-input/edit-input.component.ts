import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.css']
})
export class EditInputComponent implements OnInit {
  form!: FormGroup ;
  product!: any;
  @Output() submitEM = new EventEmitter();
 
  constructor(private productsService: ProductsService,
              private dialogService : DialogService) { }

  ngOnInit(): void {
    
    this.product = this.productsService.getProduct();

    this.form = new FormGroup({
      name : new FormControl(this.product.name, Validators.required)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(){
   
    if(this.form.invalid){
      return;
    }
    let name = this.form.controls['name'].value;
    let id = this.product.id;
    this.productsService.editName(this.product.id, name).subscribe(data => {
      this.dialogService.closeDialog();
    })
    

  }

}
