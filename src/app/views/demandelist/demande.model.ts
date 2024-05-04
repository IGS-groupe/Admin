export interface Demande {
  demandeId: number;
  demandePour: string;
  envoyeAuLaboratoire: string;
  courrielsSupplementaires: string;
  bonDeCommande: string;
  unEchantillon: boolean;
  etat: string; // Assuming etat is a nested object based on your example
  langueDuCertificat: string;
  commentairesInternes: string;
}

export interface Etat {
  etat: string;
}
