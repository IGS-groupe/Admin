export enum Langue {
    FRANCAIS = "FRANCAIS",
    ANGLAIS = "ANGLAIS"
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
    ) {
      this.demandePour = demandePour;
      this.envoyeAuLaboratoire = envoyeAuLaboratoire;
      this.courrielsSupplementaires = courrielsSupplementaires;
      this.bonDeCommande = bonDeCommande;
      this.unEchantillon = unEchantillon;
      this.langueDuCertificat = langueDuCertificat;
      this.commentairesInternes = commentairesInternes;
      this.etat= etat;
    }
  }
  