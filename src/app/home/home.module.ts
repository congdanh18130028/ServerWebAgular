import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ProductsComponent } from './products/products.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddProductComponent } from './dialogs/add-product/add-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddCategoryComponent } from './dialogs/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditProductComponent } from './dialogs/edit-product/edit-product.component';
import { EditInputComponent } from './dialogs/edit-input/edit-input.component';
import { EditCategoryComponent } from './dialogs/edit-category/edit-category.component';
import { EditQuantityComponent } from './dialogs/edit-quantity/edit-quantity.component';
import { EditPriceComponent } from './dialogs/edit-price/edit-price.component';
import { EditDescriptionComponent } from './dialogs/edit-description/edit-description.component';
import { EditImgComponent } from './dialogs/edit-img/edit-img.component';
import { BillsComponent } from './bills/bills.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    DeleteComponent,
    UsersComponent,
    AddProductComponent,
    AddCategoryComponent,
    EditProductComponent,
    EditInputComponent,
    EditCategoryComponent,
    EditQuantityComponent,
    EditPriceComponent,
    EditDescriptionComponent,
    EditImgComponent,
    BillsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTabsModule
  ],

})
export class HomeModule { }
