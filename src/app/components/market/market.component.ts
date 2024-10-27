import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Market, Reyon, ReyonTuru } from '../../../types';
import { AisleAddDialogComponent } from '../aisle-add-dialog/aisle-add-dialog.component';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    AisleAddDialogComponent,
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
export class MarketComponent {
  @Input() market!: Market;
  showAisleAddDialogVisible: boolean = false;

  showAisleAddDialog() {
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

  addProduct(reyon: Reyon) {
    console.log('Add product to aisle:', reyon.name);
  }

  deleteAisle(reyon: Reyon) {
    console.log('Delete aisle:', reyon.name);
  }
}
