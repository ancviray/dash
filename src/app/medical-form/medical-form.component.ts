import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-form',
  standalone: false,
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.css']
})
export class MedicalFormComponent {

  activeSection: string = 'patientInfo'; // Default section
  activeEmergency: number = 1; // Default emergency contact
  showPwdId: boolean = false; // Toggle PWD ID visibility
  hmo1: string = ''; // Default value

  toggleSection(section: string): void {
    this.activeSection = section;
  }

  toggleEmergency(contact: number): void {
    this.activeEmergency = contact;
  }

  familyHistory = {
    arthritis: null,
    arthritisNo: null,
    asthma: null,
    asthmaNo: null,
    bleedingTendencies: null,
    bleedingTendenciesNo: null,
    cancer: null,
    cancerNo: null,
    cerebrovascular: null,
    cerebrovascularNo: null,
    digestiveProblem: null,
    digestiveProblemNo: null,
    drugAllergies: null,
    drugAllergiesNo: null,
    epilepsy: null,
    epilepsyNo: null,
    gastrointestinal: null,
    gastrointestinalNo: null,
    heartDisease: null,
    heartDiseaseNo: null,
    hormonalDisorder: null,
    hormonalDisorderNo: null,
    hypertension: null,
    hypertensionNo: null,
    mentalIllness: null,
    mentalIllnessNo: null,
    ptb: null,
    ptbNo: null
  };

  deformitiesHistory = {
    congenitalDeformities: null,
    heartVisionOtherOrgans: null,
    physicalDeformities: null,
    skeletalDeformities: null,
    upperExtremitiesDeformities: null,
    lowerExtremitiesDeformities: null,
    abdomenHerniaInguinalUmbilical: null,
    acquiredDeformities: null,
    sicknessPolio: null,
    accidentsHistory: null,
    carAccident: null,
    motorcycleAccident: null,
    fallInjury: null,
    headInjury: null,
    pelvicInjury: null,
    spineInjury: null,
    abdomenHernia: null,
    lowerExtremities:null,
    upperExtremities:null,
    skeletal:null,
    accidents:null,
    heartVisionOther:null
  };

  // You can also add methods to handle logic when the checkboxes are updated if necessary
  onCheckboxChange() {
    // Logic when a checkbox is changed, if required
  }
}
