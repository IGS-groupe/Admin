import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { DemandeService } from 'src/app/services/demande.service';
import { Echantillon } from 'src/app/models/echantillon.model';
import { AnalysisStatus } from 'src/app/models/AnalysisStatus.enum'; // Import AnalysisStatus enum
import { Parameter } from 'src/app/models/parameter.model';
import { Dispose}from  'src/app/models/Dispose.enum';
import { Return } from 'src/app/models/Return.enum';
import { TypeEchantillon } from 'src/app/models/typeEchantillon.enum';
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
  Dispose = Dispose;
  Return = Return;
  TypeEchantillon= TypeEchantillon;
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
  getEnumDescription(enumObj: any, key: string): string {
    return enumObj[key];
  }
  toggleDetail(echantillon: Echantillon): void {
    if (!echantillon.showDetails) {
      this.echantillonService.getParametersByEchantillonId(echantillon.echantillonId).then((parameters: Parameter[]) => {
        echantillon.parameters = parameters;
        echantillon.showDetails = true;
      }).catch(error => {
        echantillon.parameters = [];
        console.error('Failed to fetch parameters', error);
      });
    } else {
      echantillon.showDetails = false;
    }
  }
  

  updateAllDemandeStatuses(newStatut: AnalysisStatus) {
    const statutKey = Object.keys(AnalysisStatus).find(key => AnalysisStatus[key as keyof typeof AnalysisStatus] === newStatut);
    if (!statutKey) {
      console.error('Invalid status');
      return;
    }
    console.log('Updating status with key:', statutKey);
    this.echantillons.forEach(echantillon => {
      this.demandeService.updateState(this.demandeId, statutKey).then(() => {
        this.router.navigate(['/Listdemandes']);
        console.log('Statut mis à jour avec succès');
      }).catch(error => {
        console.error('Failed to update status:', error);
      });
    });
  }
}
