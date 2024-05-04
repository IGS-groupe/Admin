import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { DemandeService } from 'src/app/services/demande.service';
import { Echantillon } from 'src/app/models/echantillon.model';

@Component({
  selector: 'app-list-echantillon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-echantillon.component.html',
  styleUrls: ['./list-echantillon.component.scss']
})
export class ListEchantillonComponent implements OnInit {
  echantillons: Echantillon[] = [];
  demandeId: number = 0;
  selectedStatut: string = "";  // To hold the status selected from the dropdown
  etat: string="";
  constructor(
    private route: ActivatedRoute,
    private echantillonService: EchantillonService,
    private demandeService: DemandeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.demandeId = params['demandeId'];
      this.etat = params['etat'];
    });
    this.echantillonService.getEchantillonsByDemandeId(this.demandeId).then(echantillons => {
      this.echantillons = echantillons;
    }).catch(error => {
      console.error('Failed to load echantillons:', error);
    });
  }

  updateAllDemandeStatuses(newStatut: string) {
    this.echantillons.forEach(echantillon => {
      this.demandeService.updateState(this.demandeId, newStatut).then(() => {
        this.router.navigate(['/Listdemandes'],)
        console.log('Statut mis à jour avec succès');
      }).catch(error => {
        console.error('Failed to update status:', error);
      });
    });
  }
}
