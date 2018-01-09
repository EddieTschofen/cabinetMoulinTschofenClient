import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientInterface} from '../dataInterfaces/patient';
import {CabinetInterface} from '../dataInterfaces/cabinet';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewPatientComponent implements OnInit {
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public newPatient: PatientInterface;

  constructor() { }

  ngOnInit() {
    this.newPatient = {
      socialSecurityNumber: '',
      nom: '',
      prenom: '',
      adresse: '',
      pathology: ''
    };
  }

  changeModifiedInfo(event: any) {
    // console.log(event);
    switch (event.target.name) {
      case 'ssn' :
        this.newPatient.socialSecurityNumber = event.target.value;
        break;
      case 'nom' :
      this.newPatient.nom = event.target.value;
      break;
      case 'prenom' :
        this.newPatient.prenom = event.target.value;
        break;
      case 'adresse' :
        this.newPatient.adresse = event.target.value;
        break;
      case 'pathology' :
        this.newPatient.pathology = event.target.value;
        break;
    }
  }

  addPatient() {
    this.cabinet.patients.push(this.newPatient);
    // TODO : Envoyer modifications au serveur

  }

}
