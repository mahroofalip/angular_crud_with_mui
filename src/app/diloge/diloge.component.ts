import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-diloge',
  templateUrl: './diloge.component.html',
  styleUrls: ['./diloge.component.css'],
})
export class DilogeComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  actionBtn: string = 'Save';
  productForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DilogeComponent>
  ) {}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  async addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        await this.api.postProduct(this.productForm.value).subscribe({
          next: () => {
            Swal.fire('Success!', 'Product added successfully.', 'success');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            Swal.fire('Error', 'Error while adding the product!!:)', 'error');
          },
        });
      }
    }
    {
      await this.updateProduct();
    }
  }
  async updateProduct() {
    await this.api
      .PutProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: () => {
          Swal.fire('Success!', 'Product updated successfully.', 'success');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          Swal.fire('Error', 'Error while updating the record!!:)', 'error');
        },
      });
  }
}
