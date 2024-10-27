import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  searchTerm: string = '';
  usdRate: number = 33.787;
  gbpRate: number = 44.6249;
  eurRate: number = 37.6571;

  ngOnInit() {}

  onSearch(event: any) {
    console.log(event);
  }
}
