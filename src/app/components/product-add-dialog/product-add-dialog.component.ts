import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Reyon, Urun } from '../../../types';

@Component({
  selector: 'app-product-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './product-add-dialog.component.html',
  styleUrl: './product-add-dialog.component.scss',
})
export class ProductAddDialogComponent {
  @Input() visible: boolean = false;
  @Input() reyon!: Reyon;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() productAdded = new EventEmitter<Urun>();

  productName: string = '';

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  addProduct() {
    if (this.productName) {
      const newProduct: Urun = {
        id: this.generateProductId(),
        name: this.productName,
        reyonId: this.reyon.id,
      };
      this.productAdded.emit(newProduct);
      this.hideDialog();
    }
  }

  private generateProductId(): string {
    const existingIds = this.reyon.urunler.map((urun) =>
      parseInt(urun.id.slice(1))
    );
    const maxId = Math.max(...existingIds, 0);
    return `u${maxId + 1}`;
  }
}
