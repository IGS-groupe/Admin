import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface SampleData {
  clientName: string;
  demande: {
    DemandeID: number;
    DemandePour: string;
    EnvoyeAuLaboratoire: string;
    BonDeCommande: string;
    LangueDuCertificat: string;
  };
  echantillon: {
    EchantillonID: number;
    Gabarit: string;
    TypeEchantillon: string;
  };
  parameter: {
    ParameterID: number;
    Name: string;
  };
}

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.scss'
})
export class DemandeComponent {
  combinedData: SampleData[] = [];

  // Define methods
  accept(data: SampleData): void {
    console.log('Accepting', data);
  }

  refuse(data: SampleData): void {
    console.log('Refusing', data);
  }

  moreInfo(data: SampleData): void {
    console.log('More Info for', data);
  }
}
