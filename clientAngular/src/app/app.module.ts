import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CabinetMedicalService } from './cabinet-medical.service';
import { SecretaryComponent } from './secretary/secretary.component';
import { HttpModule} from "@angular/http";
import { NurseComponent } from './nurse/nurse.component';
import { PatientComponent } from './patient/patient.component';
import { NewNurseComponent } from './new-nurse/new-nurse.component';
import { NewPatientComponent } from './new-patient/new-patient.component';



@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    NurseComponent,
    PatientComponent,
    NewNurseComponent,
    NewPatientComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CabinetMedicalService,HttpModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
