import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-demande-client',
  templateUrl: './demande-client.component.html',
  styleUrls: ['./demande-client.component.scss']
})
export class DemandeClientComponent {
  constructor(private router: Router) {} // ✅ Inject Router

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
  }

  refuseDemande(id: number) {
    console.log('Demande refused with ID:', id);
  }

  // ✅ Add this method for navigation
  navigateToDemandeForm(): void {
    this.router.navigate(['/DemandeForm']);
  }
}
