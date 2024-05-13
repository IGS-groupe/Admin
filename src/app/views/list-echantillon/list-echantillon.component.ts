import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { DemandeService } from 'src/app/services/demande.service';
import { Echantillon } from 'src/app/models/echantillon.model';
import { AnalysisStatus } from 'src/app/models/AnalysisStatus.enum'; // Import AnalysisStatus enum

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
  selectedStatut: AnalysisStatus | null = null;  // To hold the status selected from the dropdown
  etat: string = "";
  statusOptions = [
    { label: AnalysisStatus.REQUEST_SUBMITTED, value: AnalysisStatus.REQUEST_SUBMITTED },
    { label: AnalysisStatus.PARTIAL_RESULTS, value: AnalysisStatus.PARTIAL_RESULTS },
    { label: AnalysisStatus.SAMPLE_REJECTED, value: AnalysisStatus.SAMPLE_REJECTED },
    { label: AnalysisStatus.EXCEEDS_NORM, value: AnalysisStatus.EXCEEDS_NORM },
    { label: AnalysisStatus.RECEIVED_IN_PROGRESS, value: AnalysisStatus.RECEIVED_IN_PROGRESS },
    { label: AnalysisStatus.COMPLETE_RESULTS, value: AnalysisStatus.COMPLETE_RESULTS },
    { label: AnalysisStatus.NOT_POTABLE, value: AnalysisStatus.NOT_POTABLE }
  ];


  constructor(
    private route: ActivatedRoute,
    private echantillonService: EchantillonService,
    private demandeService: DemandeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.demandeId = params['demandeId'];
      if (params['etat']) {
        // Set the selected status based on the URL parameter
        this.selectedStatut = AnalysisStatus[params['etat'] as keyof typeof AnalysisStatus];
      }
    });
    this.echantillonService.getEchantillonsByDemandeId(this.demandeId).then(echantillons => {
      this.echantillons = echantillons;
    }).catch(error => {
      console.error('Failed to load echantillons:', error);
      this.router.navigate(['/login']);
    });
  }

  updateAllDemandeStatuses(newStatut: AnalysisStatus) {
    this.echantillons.forEach(echantillon => {
      this.demandeService.updateState(this.demandeId, newStatut).then(() => {
        this.router.navigate(['/Listdemandes']);
        console.log('Statut mis à jour avec succès');
      }).catch(error => {
        console.error('Failed to update status:', error);
      });
    });
  }
}
