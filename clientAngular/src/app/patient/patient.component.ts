import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {PatientInterface} from '../dataInterfaces/patient';
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {CabinetMedicalService} from "../cabinet-medical.service";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit, OnChanges {
  @Input('patientInfo')
  public patientInfo: PatientInterface;
  public modifiedInfo: PatientInterface;
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public patientNurses;

  constructor(private cm: CabinetMedicalService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // console.log(this.patientInfo);
    this.modifiedInfo = {
      socialSecurityNumber: Object.assign({}, this.patientInfo).socialSecurityNumber,
      nom: Object.assign({}, this.patientInfo).nom,
      prenom: Object.assign({}, this.patientInfo).prenom,
      adresse: Object.assign({}, this.patientInfo).adresse,
      pathology: Object.assign({}, this.patientInfo).pathology
    };

    this.patientNurses = [];
    // this.patientNurses.push(this.cabinet.infirmiers[0]);

    for (let i = 0; i < this.cabinet.infirmiers.length; i++) {
      if (this.cabinet.infirmiers[i].patientsSSN.includes(this.modifiedInfo.socialSecurityNumber)) {
        this.patientNurses.push(this.cabinet.infirmiers[i]);
        // this.patientNurses.push(this.cabinet.infirmiers[i]);
      }
    }

    // console.log(this.patientInfo);
    // console.log(this.modifiedInfo);
  }

  modifyInfo() {
    this.patientInfo.nom = Object.assign('', this.modifiedInfo).nom;
    this.patientInfo.prenom = Object.assign('', this.modifiedInfo).prenom;
    this.patientInfo.adresse = Object.assign('', this.modifiedInfo).adresse;
    this.patientInfo.pathology = Object.assign('', this.modifiedInfo).pathology;

    const body = '/' + this.patientInfo.socialSecurityNumber + '/' + this.patientInfo.nom + '/' + this.patientInfo.prenom + '/' + this.patientInfo.adresse + '/' + this.patientInfo.pathology;
    this.cm.postData('/patient/addOrUpdatePatient' + body, body, function(n){});

  }

  changeModifiedInfo(event: any) {
    // console.log(event);
    switch (event.target.name) {
      case 'nom' :
        this.modifiedInfo.nom = event.target.value;
        break;
      case 'prenom' :
        this.modifiedInfo.prenom = event.target.value;
        break;
      case 'adresse' :
        this.modifiedInfo.adresse = event.target.value;
        break;
      case 'pathology' :
        this.modifiedInfo.pathology = event.target.value;
        break;
    }
  }

  // changeNewSSN(event: any) {
  //   this.newHandledPatient = event.target.value;
  // }
  //
  // addHandlePatient() {
  //   this.modifiedInfo.patientsSSN.push(this.newHandledPatient);
  //   this.setNursePatients();
  // }

  // removePatient(id) {
  //   console.log(id);
  //   for (let i = 0; i < this.modifiedInfo.patientsSSN.length; i++) {
  //     if (this.modifiedInfo.patientsSSN[i] == id) {
  //       console.log(this.modifiedInfo.patientsSSN);
  //       this.modifiedInfo.patientsSSN.splice(i, 1);
  //     }
  //   }
  //   this.setPatientNurses();
  // }


}
