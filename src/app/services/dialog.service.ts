import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../home/dialogs/add-category/add-category.component';
import { AddProductComponent } from '../home/dialogs/add-product/add-product.component';
import { DeleteComponent } from '../home/dialogs/delete/delete.component';
import { EditCategoryComponent } from '../home/dialogs/edit-category/edit-category.component';
import { EditDescriptionComponent } from '../home/dialogs/edit-description/edit-description.component';
import { EditImgComponent } from '../home/dialogs/edit-img/edit-img.component';
import { EditInputComponent } from '../home/dialogs/edit-input/edit-input.component';
import { EditPriceComponent } from '../home/dialogs/edit-price/edit-price.component';
import { EditProductComponent } from '../home/dialogs/edit-product/edit-product.component';
import { EditQuantityComponent } from '../home/dialogs/edit-quantity/edit-quantity.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  openEditImgDialog() {
    this.dialog.open(EditImgComponent);
  }
  openEditDescriptionDialog() {
    this.dialog.open(EditDescriptionComponent, {
      height: '40%',
      width: '60%'});
  }
  openEditPriceDialog() {
    this.dialog.open(EditPriceComponent);
  }
  openEditQuantityDialog() {
    this.dialog.open(EditQuantityComponent);
  }
  openAddDialog() {
    return this.dialog.open(AddProductComponent);
  }

  openEditDialog() {
    return this.dialog.open(EditProductComponent);
  }

  openEditNameDialog(){
    return this.dialog.open(EditInputComponent);
  }

  openEditCategoryDialog(){
    return this.dialog.open(EditCategoryComponent);
  }

  closeDialog() {
    return this.dialog.closeAll();
  }

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(){
   return this.dialog.open(DeleteComponent);
  }

  openAddCategoryDialog(){
    return this.dialog.open(AddCategoryComponent)
  }


}
