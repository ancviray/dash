import { Component } from '@angular/core';

interface MedicalRecord {
  MID: string;
  date: Date;
  lastname: string;
  firstname: string;
}

@Component({
  selector: 'app-medical-assessments',
  standalone: false,
  templateUrl: './medical-assessments.component.html',
  styleUrls: ['./medical-assessments.component.css']
})
export class MedicalAssessmentsComponent {
  // Define the records array with explicit types
  records: MedicalRecord[] = [
    { MID: '1', date: new Date(), lastname: 'Doe', firstname: 'John' },
    { MID: '2', date: new Date(), lastname: 'Smith', firstname: 'Jane' },
    { MID: '3', date: new Date(), lastname: 'Brown', firstname: 'Charlie' },
    { MID: '4', date: new Date(), lastname: 'Taylor', firstname: 'Alex' },
    { MID: '5', date: new Date(), lastname: 'Wilson', firstname: 'Diana' },
    { MID: '6', date: new Date(), lastname: 'Lee', firstname: 'Michael' },
    { MID: '7', date: new Date(), lastname: 'Adams', firstname: 'Sarah' },
    { MID: '8', date: new Date(), lastname: 'Clark', firstname: 'Bruce' },
    { MID: '9', date: new Date(), lastname: 'Evans', firstname: 'Olivia' },
    { MID: '10', date: new Date(), lastname: 'Wright', firstname: 'Henry' }
  ];

  searchText = '';
  currentPage = 1;
  pageSize = 5;
  displayedData: MedicalRecord[] = [];  // Use the defined type for displayedData
  totalRecords = this.records.length;
  totalPages = Math.ceil(this.totalRecords / this.pageSize);

  constructor() {
    this.updateDisplayedData();
  }

  // Method to update the displayed data based on pagination
  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedData = this.records.slice(startIndex, endIndex);
  }

  // Method to search through the records based on first or last name
  searchData() {
    if (this.searchText) {
      this.displayedData = this.records.filter(record =>
        record.lastname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        record.firstname.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.totalRecords = this.displayedData.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    } else {
      this.totalRecords = this.records.length;
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      this.updateDisplayedData();
    }
  }

  // Methods for editing and deleting a record
  editRecord(record: MedicalRecord) {
    console.log('Edit record:', record);
  }

  deleteRecord(record: MedicalRecord) {
    console.log('Delete record:', record);
  }

  // Methods for pagination
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedData();
    }
  }

  // Computed properties for start and end index of displayed data
  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    const end = this.startIndex + this.pageSize;
    return end > this.totalRecords ? this.totalRecords : end;
  }
}
