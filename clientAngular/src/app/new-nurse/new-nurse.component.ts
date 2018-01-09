import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/nurse';
import {CabinetMedicalService} from '../cabinet-medical.service';

@Component({
  selector: 'app-new-nurse',
  templateUrl: './new-nurse.component.html',
  styleUrls: ['./new-nurse.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewNurseComponent implements OnInit {
  @Input('cabinet')
  public cabinet: CabinetInterface;

  public newNurse: InfirmierInterface;

  public errorMessage = '';

  constructor(private cm: CabinetMedicalService) {}

  ngOnInit() {
    this.newNurse = {
      id: '',
      nom: '',
      prenom: '',
      adresse: '',
      patientsSSN: []
    };
  }
  changeModifiedInfo(event: any) {
    // console.log(event);
    switch (event.target.name) {
      case 'id' :
        this.newNurse.id = event.target.value;
        break;
      case 'nom' :
        this.newNurse.nom = event.target.value;
        break;
      case 'prenom' :
        this.newNurse.prenom = event.target.value;
        break;
      case 'adresse' :
        this.newNurse.adresse = event.target.value;
        break;
    }
  }

  addNurse() {

    const allFilled = ((this.newNurse.id !== '' && this.newNurse.nom !== '' && this.newNurse.prenom !== '' && this.newNurse.adresse !== '') ? true : false);

    let idNotExists = true;

    for (let i = 0; i < this.cabinet.infirmiers.length; i++){
      if (this.newNurse.id === this.cabinet.infirmiers[i].id){
        idNotExists = false;
        break;
      }
    }

    if (idNotExists && allFilled) {
      this.cabinet.infirmiers.push(this.newNurse);

      // let body =  JSON.stringify({
      //   id: this.newNurse.id,
      //   name: this.newNurse.nom,
      //   forname: this.newNurse.prenom,
      //   address: this.newNurse.adresse,
      // });
      // body = 'id=' + this.newNurse.id + '&name=' + this.newNurse.nom + '&forName=' + this.newNurse.prenom + '&adress=' + this.newNurse.adresse;
      const body = '/' + this.newNurse.id + '/' + this.newNurse.nom + '/' + this.newNurse.prenom + '/' + this.newNurse.adresse;
      // console.log(body);
      this.cm.postData('/nurse/addOrUpdateNurse' + body, body, function (n) {
      });
      this.errorMessage = '';
    } else {
      this.errorMessage = '';
      if (!allFilled) {
        this.errorMessage += 'Tous les champs doivent etre rempli';
      }
      if(!idNotExists && !allFilled){
        this.errorMessage += '  -  ';

      }
      if (!idNotExists) {
        this.errorMessage += 'Id déjà utilisé';
      }
    }
  }



}
