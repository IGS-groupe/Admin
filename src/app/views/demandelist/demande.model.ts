export enum Langue {
    FRANCAIS = "FRANCAIS",
    ANGLAIS = "ANGLAIS"
}

// Client interface for multiple client support
export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// models/demande.model.ts
export class Demande {
  demandeId?: number;
  demandePour: string;
  envoyeAuLaboratoire: string;
  courrielsSupplementaires: string;
  bonDeCommande: string;
  unEchantillon: boolean;
  etat?: string;
  langueDuCertificat: string;
  commentairesInternes: string;
  userId?: string;
  
  // New fields for multiple clients support
  clientIds?: number[];
  clients?: Client[];
  
  constructor(
    // demandeId: number,
    demandePour: string,
    envoyeAuLaboratoire: string,
    courrielsSupplementaires: string,
    bonDeCommande: string,
    unEchantillon: boolean,
    etat: string, 
    langueDuCertificat: string,
    commentairesInternes: string,
    clientIds?: number[]
  ) {
    this.demandePour = demandePour;
    this.envoyeAuLaboratoire = envoyeAuLaboratoire;
    this.courrielsSupplementaires = courrielsSupplementaires;
    this.bonDeCommande = bonDeCommande;
    this.unEchantillon = unEchantillon;
    this.langueDuCertificat = langueDuCertificat;
    this.commentairesInternes = commentairesInternes;
    this.etat = etat;
    this.clientIds = clientIds;
  }
}
  
