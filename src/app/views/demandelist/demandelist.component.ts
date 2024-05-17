import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeService } from './demande.service';
import { Demande } from './demande.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demandelist.component.html',
  styleUrls: ['./demandelist.component.scss']
})
export class DemandelistComponent implements OnInit {
  demandes: Demande[] = [];
  constructor(private demandeService: DemandeService,private router: Router) {
    const userId = localStorage.getItem('userId'); 
    if(!userId){
      this.router.navigate(['/account/login']);
    }}

  ngOnInit(): void {
    this.demandeService.getDemandes().then(demandes => {
      this.demandes = demandes;
    }).catch(error => {
      console.error('Failed to load demandes:', error);
      this.router.navigate(['/account/login'])
    });
  }
  details(demandeId:number , etat : string ){
    this.router.navigate(['/echantillonList'], { queryParams: { demandeId: demandeId, etat:etat } });
  }
  acceptDemande(id: number) {
    console.log('Demande accepted with ID:', id);
    // Here you would handle the acceptance of the demande
  }

  refuseDemande(id: number) {
    console.log('Demande refused with ID:', id);
    // Here you would handle the refusal of the demande
  }

  // Implement any additional methods you need, such as for calculations
}
