import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Market, Reyon, Urun, ReyonTuru } from '../../../types';

@Component({
  selector: 'app-product-update-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './product-update-dialog.component.html',
  styleUrl: './product-update-dialog.component.scss',
})
export class ProductUpdateDialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() product!: Urun;
  @Input() currentMarket!: Market;
  @Input() markets!: Market[];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() productUpdated = new EventEmitter<{
    product: Urun;
    newMarketId: string;
    newReyonId: string;
  }>();
  @Output() productDeleted = new EventEmitter<Urun>();

  selectedMarket: Market | null = null;
  availableReyonlar: Reyon[] = [];
  selectedReyon: Reyon | null = null;

  ngOnInit() {
    this.selectedMarket = this.currentMarket;
    this.updateAvailableReyonlar();
  }

  updateAvailableReyonlar() {
    if (this.selectedMarket) {
      this.availableReyonlar = this.selectedMarket.reyonlar.filter(
        (reyon) => reyon.tur === this.getCurrentReyonTur()
      );
      this.selectedReyon =
        this.availableReyonlar.find(
          (reyon) => reyon.id === this.product.reyonId
        ) || null;
    } else {
      this.availableReyonlar = [];
      this.selectedReyon = null;
    }
  }

  getCurrentReyonTur(): ReyonTuru {
    const currentReyon = this.currentMarket.reyonlar.find(
      (reyon) => reyon.id === this.product.reyonId
    );
    return currentReyon ? currentReyon.tur : ReyonTuru.GIDA;
  }

  onMarketChange() {
    this.updateAvailableReyonlar();
  }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  updateProduct() {
    if (this.selectedMarket && this.selectedReyon) {
      this.productUpdated.emit({
        product: this.product,
        newMarketId: this.selectedMarket.id,
        newReyonId: this.selectedReyon.id,
      });
      this.hideDialog();
    }
  }

  deleteProduct() {
    this.productDeleted.emit(this.product);
    this.hideDialog();
  }
}
