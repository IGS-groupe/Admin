export interface Demande {
    DemandeID: number;
    DemandePour: string;
    EnvoyeAuLaboratoire: string;
    CourrielsSupplementaires: string;
    BonDeCommande: string;
    UnEchantillon: boolean;
    LangueDuCertificat: 'francais' | 'anglais';
    CommentairesInternes: string;
  }
  