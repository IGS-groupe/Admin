import { Parameter } from "./parameter.model";

export class Echantillon {
  echantillonId: number;
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
  showDetails: boolean = false;  // Default to false
  parameters: Parameter[] = [];  // Default to empty array

  constructor(
      echantillonId: number,
      typeEchantillon:string,
      nomEchantillon: string,
      lieuPrelevement: string,
      addressRetourner: string,
      dateFinPrelevement: string,
      heureFinPrelevement: string,
      priorite: string,
      commentairesInternes: string,
      demandeId: number,
      disposes: string,
      returns: string,
      parameterIds?: number[]
  ) {
      this.echantillonId = echantillonId;
      this.typeEchantillon = typeEchantillon;
      this.nomEchantillon = nomEchantillon;
      this.lieuPrelevement = lieuPrelevement;
      this.addressRetourner = addressRetourner;
      this.dateFinPrelevement = dateFinPrelevement;
      this.heureFinPrelevement = heureFinPrelevement;
      this.priorite = priorite;
      this.commentairesInternes = commentairesInternes;
      this.demandeId = demandeId;
      this.disposes = disposes;
      this.returns = returns;
      this.parameterIds = parameterIds;
  }
}
