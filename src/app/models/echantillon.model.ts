export interface Echantillon {
    echantillonId: number;
    gabarit: string; 
    typeEchantillon: string;
    nomEchantillon: string;
    lieuPrelevement: string;
    addressRetourner: string; 
    dateFinPrelevement: string; 
    heureFinPrelevement: string; 
    priorite: string; 
    commentairesInternes: string;
    demandeId: number;
    parameterIds?: number[]; 
    disposes: string; 
    returns: string; 
  }