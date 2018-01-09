import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/nurse';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {CabinetMedicalService} from '../cabinet-medical.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CabinetMedicalService]
})
export class NurseComponent implements OnInit, OnChanges {
  @Input('nurseInfo')
  public nurseInfo: InfirmierInterface;
  public modifiedInfo: InfirmierInterface;
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public nursePatients;

  public newHandledPatient;


  constructor(private cm: CabinetMedicalService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.modifiedInfo = {
      id: Object.assign({}, this.nurseInfo).id,
      nom: Object.assign({}, this.nurseInfo).nom,
      prenom: Object.assign({}, this.nurseInfo).prenom,
      adresse: Object.assign({}, this.nurseInfo).adresse,
      patientsSSN: []
    };
    for (let i = 0; i < this.nurseInfo.patientsSSN.length; i++) {
      this.modifiedInfo.patientsSSN.push(this.nurseInfo.patientsSSN[i]);
    }
    // console.log(this.nurseInfo);
    // console.log(this.modifiedInfo);
    this.setNursePatients();
  }

  modifyInfo() {
    let body;
    const toDelete = [];
    const toAdd = [];
    for (let i = 0; i < this.modifiedInfo.patientsSSN.length; i++) {
      const SSN = this.modifiedInfo.patientsSSN[i];
      if (!this.nurseInfo.patientsSSN.includes(SSN)) {
        toAdd.push(SSN);
      }
    }
    for (let i = 0; i < this.nurseInfo.patientsSSN.length; i++) {
      const SSN = this.nurseInfo.patientsSSN[i];
      if (!this.modifiedInfo.patientsSSN.includes(SSN)) {
        toDelete.push(SSN);
      }
    }

    console.log(toDelete);
    console.log(toAdd);

    for (let i = 0; i < toAdd.length; i++) {
      body = '/' + this.nurseInfo.id + '/' + toAdd[i];
      this.cm.postData('/nurse/addPatient' + body, body, function(n){});
    }
    for (let i = 0; i < toDelete.length; i++) {
      body = '/' + this.nurseInfo.id + '/' + toDelete[i];
      console.log(body);
      this.cm.postData('/nurse/removePatient' + body, body, function(n){});
    }

    this.nurseInfo.nom = Object.assign('', this.modifiedInfo).nom;
    this.nurseInfo.prenom = Object.assign('', this.modifiedInfo).prenom;
    this.nurseInfo.adresse = Object.assign('', this.modifiedInfo).adresse;
    this.nurseInfo.patientsSSN = Object.assign('', this.modifiedInfo).patientsSSN;

    body = '/' + this.nurseInfo.id + '/' + this.nurseInfo.nom + '/' + this.nurseInfo.prenom + '/' + this.nurseInfo.adresse;
    this.cm.postData('/nurse/addOrUpdateNurse' + body, body, function(n){});

    this.ngOnChanges();
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
    }
  }

  changeNewSSN(event: any) {
    this.newHandledPatient = event.target.value;
  }

  addHandlePatient() {
    this.modifiedInfo.patientsSSN.push(this.newHandledPatient);
    this.setNursePatients();
  }

  removePatient(id) {
    // console.log(id);
    for (let i = 0; i < this.modifiedInfo.patientsSSN.length; i++) {
      if (this.modifiedInfo.patientsSSN[i] === id) {
        // console.log(this.modifiedInfo.patientsSSN);
        this.modifiedInfo.patientsSSN.splice(i, 1);
      }
    }
    this.setNursePatients();
  }

  setNursePatients() {
    this.nursePatients = [];
    for (let i = 0; i < this.modifiedInfo.patientsSSN.length; i++) {
      for (let j = 0; j < this.cabinet.patients.length; j++) {
        if (this.modifiedInfo.patientsSSN[i] === this.cabinet.patients[j].socialSecurityNumber) {
          this.nursePatients.push(this.cabinet.patients[j]);
        }
      }
    }
  }
}
