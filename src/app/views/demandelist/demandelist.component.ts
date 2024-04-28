import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeService } from './demande.service';
import { Demande } from './demande.model';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demandelist.component.html',
  styleUrls: ['./demandelist.component.scss']
})
export class DemandelistComponent implements OnInit {
  demandes: Demande[] = [];

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.demandeService.getDemandes().subscribe(data => {
      this.demandes = data;
      // You can calculate any totals you need here
    });
  }

  // Implement any additional methods you need, such as for calculations
}
