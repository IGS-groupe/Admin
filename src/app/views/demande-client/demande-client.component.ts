import { Component } from '@angular/core';

@Component({
  selector: 'app-demande-client',
  templateUrl: './demande-client.component.html',
  styleUrls: ['./demande-client.component.scss']
})
export class DemandeClientComponent {
  demandes = [
    {
      DemandeID: 1,
      DemandePour: 'Client A',
      EnvoyeAuLaboratoire: 'Lab X',
      CourrielsSupplementaires: 'clienta@example.com',
      BonDeCommande: '1234',
      UnEchantillon: true,
      LangueDuCertificat: 'francais',
      CommentairesInternes: 'Initial review completed'
    },
    // More fake demandes can be added here
  ];

  acceptDemande(id: number) {
    console.log('Demande accepted with ID:', id);
    // Here you would handle the acceptance of the demande
  }

  refuseDemande(id: number) {
    console.log('Demande refused with ID:', id);
    // Here you would handle the refusal of the demande
  }
}
