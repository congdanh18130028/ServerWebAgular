import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories!: any;
  form!: FormGroup ;
  file!: File;
  url: any;
  msg = "";

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();

  
  constructor(private dialogService: DialogService,
              private productsService: ProductsService,
             ) { }

  onAdd(){
    this.dialogService.openAddCategoryDialog();
  }

  ngOnInit(): void {
    this.productsService.getListCategory().subscribe(data => {
      this.categories = data;
    });

    this.form = new FormGroup({
      name : new FormControl('', Validators.required),
      category : new FormControl('', Validators.required),
      imgPath : new FormControl(null, Validators.required),
      quantity : new FormControl('', Validators.required),
      price : new FormControl('', Validators.required),
      description : new FormControl('')
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
    let category = this.form.controls['category'].value;
    let quantity = this.form.controls['quantity'].value;
    let price = this.form.controls['price'].value;
    let description = this.form.controls['description'].value;
    this.productsService.addProduct(name, category, this.file, quantity, price, description).subscribe( data => {
      this.dialogService.closeDialog();
    })

  }
  
  onSelectFile(event: any) { // called each time file input changes
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
    this.file = event.target.files[0];
  }

}
