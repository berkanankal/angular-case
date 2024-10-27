import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Market, Reyon } from '../../../types';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, ButtonModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
export class MarketComponent {
  @Input() market!: Market;

  showAisleAddDialog() {
    console.log('Add aisle dialog should be shown');
  }

  addProduct(reyon: Reyon) {
    console.log('Add product to aisle:', reyon.name);
  }

  deleteAisle(reyon: Reyon) {
    console.log('Delete aisle:', reyon.name);
  }
}
