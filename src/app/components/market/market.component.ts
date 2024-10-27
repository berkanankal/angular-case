import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Market, Reyon, ReyonTuru, Urun } from '../../../types';
import { AisleAddDialogComponent } from '../aisle-add-dialog/aisle-add-dialog.component';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';

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
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
export class MarketComponent {
  @Input() market!: Market;
  showAisleAddDialogVisible: boolean = false;
  showProductAddDialogVisible: boolean = false;
  selectedReyon!: Reyon;

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
    if (confirm(`${reyon.name} reyonunu silmek istediğinizden emin misiniz?`)) {
      const index = this.market.reyonlar.findIndex((r) => r.id === reyon.id);
      if (index !== -1) {
        this.market.reyonlar.splice(index, 1);
      }
    }
  }
}
