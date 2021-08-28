import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-img',
  templateUrl: './edit-img.component.html',
  styleUrls: ['./edit-img.component.css']
})
export class EditImgComponent implements OnInit {
  
  categories!: any;
  form!: FormGroup ;
  file!: File;
  url: any;
  msg = "";
  product!: any;

  
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();


  constructor(private dialogService: DialogService,
    private productsService: ProductsService,
   ) { }


  ngOnInit(): void {
    this.product = this.productsService.getProduct();
    this.form = new FormGroup({
      
      imgPath : new FormControl(null, Validators.required)
    });
    
    this.url = this.product.imgPath[0].path;
  }

  submit(){
   
    if(this.form.invalid){
      return;
    }
    this.productsService.addImg(this.file).subscribe(data => {
      let link = data.path;
      this.productsService.editImg(this.product.id, link).subscribe(data => {
        this.dialogService.closeDialog();
      })
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
