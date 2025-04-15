import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemandeService } from './demande.service';
import { Demande } from './demande.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demandelist.component.html',
  styleUrls: ['./demandelist.component.scss']
})
export class DemandelistComponent implements OnInit {
  demandes: Demande[] = [];
  filteredDemandes: Demande[] = [];
  filterText: string = '';
  filterLangue: string = '';
  filterBon: string = '';

  constructor(private demandeService: DemandeService, private router: Router) {
    const userId = localStorage.getItem('AdminId');
    if (!userId) {
      this.router.navigate(['/account/login']);
    }
  }

  ngOnInit(): void {
    this.demandeService.getDemandes().then(demandes => {
      this.demandes = demandes;
      this.filteredDemandes = demandes;
    }).catch(error => {
      console.error('Failed to load demandes:', error);
      this.router.navigate(['/account/login']);
    });
  }

  onFilterChange(): void {
    const text = this.filterText.toLowerCase();
    const langue = this.filterLangue.toLowerCase();
    const bon = this.filterBon.toLowerCase();

    this.filteredDemandes = this.demandes.filter(d =>
      d.demandePour?.toLowerCase().includes(text) &&
      (langue === '' || d.langueDuCertificat?.toLowerCase().includes(langue)) &&
      (bon === '' || d.bonDeCommande?.toLowerCase().includes(bon))
    );
  }

  details(demandeId: number, etat: string) {
    this.router.navigate(['/echantillonList'], { queryParams: { demandeId, etat } });
  }
}
