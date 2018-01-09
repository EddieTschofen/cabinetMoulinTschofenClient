import {Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {Http} from '@angular/http';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecretaryComponent implements OnInit {
  cabinet: CabinetInterface = {
    nom: '',
    infirmiers: [],
    patients: [],
    patientsNonAffectés: [],
    adresse: undefined,
  };

  private http: Http;
  flagLoad = false;
  flagSelectNurse = false;
  selectedNurse;
  flagSelectPatient = false;
  selectedPatient;
  flagNewNurse = false;
  flagNewPatient = false;

  constructor(private cm: CabinetMedicalService) {
    cm.getData('/getDataCabinet').then(
      cabi => {
          this.cabinet = cabi || this.cabinet;
          this.flagLoad = true;
      }
    );
  }

  ngOnInit() {
  }

  // buildTables() {
  //   let nurseTable = '<table id=\'nurseTable\'><tr><th>Id</th><th>First Name</th><th>Last Name</th><th>Address</th><th></th></tr>';
  //   const nurses = this.cabinet.infirmiers;
  //   Object.keys(nurses).forEach(function (n) {
  //     // console.log(nurses[n]);
  //     nurseTable += '<tr><td>' + nurses[n]['id'] + '</td><td>' + nurses[n]['prenom'] + '</td><td>' +
  //       nurses[n]['nom'] + '</td><td>' + nurses[n]['adresse'] + '</td><td><button>Edit</button></td></tr>';
  //   });
  //   nurseTable += '</table>';
  //
  //   document.getElementById('nurses').innerHTML = nurseTable;
  //
  //   let patientTable = '<table id=\'patientsTable\'><tr><th>SSN</th><th>First Name</th><th>Last Name</th><th>Address</th>' +
  //     '<th>Pathology</th><th></th><tr>';
  //   const patients = this.cabinet.patients;
  //   Object.keys(patients).forEach(function (p) {
  //     // console.log(nurses[n]);
  //     patientTable += '<tr id=\'' + patients[p]['socialSecurityNumber'] + '\'><td>' + patients[p]['socialSecurityNumber'] +
  //       '</td><td>' + patients[p]['prenom'] + '</td><td>' + patients[p]['nom'] + '</td><td>' + patients[p]['adresse'] +
  //       '</td><td>' + patients[p]['pathology'] + '</td><td><button (click)="test()">Edit</button></td></tr>';
  //   });
  //   patientTable += '</table>';
  //   document.getElementById('patients').innerHTML = patientTable;
  //
  //   const unaffectedPatients = this.cabinet.patientsNonAffectés;
  //   Object.keys(unaffectedPatients).forEach(function (up) {
  //     // console.log(unaffectedPatients[up]);
  //     document.getElementById(unaffectedPatients[up]['socialSecurityNumber']).className += 'unaffected';
  //   });
  // }

  test() {
    console.log('test');
    const i = {
      id: '0' + (this.cabinet.infirmiers.length + 1),
      prenom: 'oui',
      nom: 'oui',
      patientsSSN: [],
      adresse: 'Paris'
  };
    this.cabinet.infirmiers.push(i);
  }
  test2() {
    alert('test');
  }

  selectNurse(n) {
    this.flagSelectNurse = true;
    this.selectedNurse = n;
  }

  unselectNurse(n) {
    this.flagSelectNurse = false;
    this.selectedNurse = null;
  }

  selectPatient(p) {
    this.flagSelectPatient = true;
    this.selectedPatient = p;
  }

  unselectPatient(p) {
    this.flagSelectPatient = false;
    this.selectedPatient = null;
  }

  deletePatient(p) {
    console.log(p);
    for (let i = 0; i < this.cabinet.patients.length; i++) {
      if (this.cabinet.patients[i].socialSecurityNumber == p.socialSecurityNumber) {
        this.cabinet.patients.splice(i, 1);
        const body = '/' + p.socialSecurityNumber;
        this.cm.postData('/patient/deletePatient' + body, body, function(n){});
        break;
      }
    }
  }

  deleteNurse(n) {
    for (let i = 0; i < this.cabinet.infirmiers.length; i++) {
      if (this.cabinet.infirmiers[i].id == n.id) {
        this.cabinet.infirmiers.splice(i, 1);
        const body = '/' + n.id;
        this.cm.postData('/nurse/deleteNurse' + body, body, function(n){});
        break;
      }
    }
  }
}



