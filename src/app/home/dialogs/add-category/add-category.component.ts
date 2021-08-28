import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryName :string ='';
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    
  }

 add(){
   if(this.categoryName == ''){
     return;
   }
   this.productsService.addCategory(this.categoryName).subscribe(data => {})
  
 }
  
}
