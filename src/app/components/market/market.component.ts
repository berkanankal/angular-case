import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Market, Reyon, ReyonTuru, Urun } from '../../../types';
import { AisleAddDialogComponent } from '../aisle-add-dialog/aisle-add-dialog.component';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';
import { ProductUpdateDialogComponent } from '../product-update-dialog/product-update-dialog.component';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    AisleAddDialogComponent,
    ProductAddDialogComponent,
    ProductUpdateDialogComponent,
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
export class MarketComponent {
  @Input() market!: Market;
  @Input() allMarkets!: Market[];
  showAisleAddDialogVisible: boolean = false;
  showProductAddDialogVisible: boolean = false;
  selectedReyon!: Reyon;
  showProductUpdateDialogVisible: boolean = false;
  selectedProduct!: Urun;

  openAisleAddDialog() {
    this.showAisleAddDialogVisible = true;
  }

  onAisleAdded(newAisle: { name: string; tur: ReyonTuru }) {
    this.market.reyonlar.push({
      id: `reyon-${this.market.reyonlar.length + 1}`,
      name: newAisle.name,
      tur: newAisle.tur,
      urunler: [],
    });
  }

  openProductAddDialog(reyon: Reyon) {
    this.selectedReyon = reyon;
    this.showProductAddDialogVisible = true;
  }

  onProductAdded(newProduct: Urun) {
    if (this.selectedReyon) {
      this.selectedReyon.urunler.push(newProduct);
    }
  }

  deleteAisle(reyon: Reyon) {
    const index = this.market.reyonlar.findIndex((r) => r.id === reyon.id);
    if (index !== -1) {
      this.market.reyonlar.splice(index, 1);
    }
  }

  openProductUpdateDialog(product: Urun) {
    this.selectedProduct = product;
    this.showProductUpdateDialogVisible = true;
  }

  onProductUpdated(event: {
    product: Urun;
    newMarketId: string;
    newReyonId: string;
  }) {
    const { product, newMarketId, newReyonId } = event;

    this.allMarkets.forEach((market) => {
      market.reyonlar.forEach((reyon) => {
        const index = reyon.urunler.findIndex((u) => u.id === product.id);
        if (index !== -1) {
          reyon.urunler.splice(index, 1);
        }
      });
    });

    const newMarket = this.allMarkets.find((m) => m.id === newMarketId);
    if (newMarket) {
      const newReyon = newMarket.reyonlar.find((r) => r.id === newReyonId);
      if (newReyon) {
        product.reyonId = newReyonId;
        newReyon.urunler.push(product);
      }
    }

    if (
      this.market.id === newMarketId ||
      this.market.id === product.reyonId.split('-')[0]
    ) {
      this.market = { ...this.market };
    }
  }

  onProductDeleted(product: Urun) {
    const reyon = this.market.reyonlar.find((r) => r.id === product.reyonId);
    if (reyon) {
      const index = reyon.urunler.findIndex((u) => u.id === product.id);
      if (index !== -1) {
        reyon.urunler.splice(index, 1);
      }
    }
  }
}
