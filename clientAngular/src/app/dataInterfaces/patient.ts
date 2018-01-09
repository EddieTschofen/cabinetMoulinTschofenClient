import {sexeEnum} from "./sexe";
import {Adresse} from "./adress";

export interface PatientInterface {
 prenom: string;
 nom: string;
 //sexe: sexeEnum;
 socialSecurityNumber: string;
 // adresse: Adresse;
  adresse: string,
 pathology: string;
}
