import { Component, OnInit } from '@angular/core';
import { HealthConditionsService } from '../../health-conditions.service';
import * as bootstrap from 'bootstrap';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-health-code-setup',
  standalone: false,
  templateUrl: './health-code-setup.component.html',
  styleUrls: ['./health-code-setup.component.css'],
})
export class HealthCodeSetupComponent implements OnInit {
  categories: Category[] = [];
  selectedID: any = {};
  isEditMode: boolean = false; 
  category: Category = {
    id_num: 0,
    category_name: '',
    color: ''
  };
  successMessage: string = '';  // Success message

  constructor(private healthConditionsService: HealthConditionsService) {}

  ngOnInit() {
    this.getCategories();
  
    // Add event listener to clear fields when modal is hidden
    const addCategoryModal = document.getElementById('addCategoryModal');
    if (addCategoryModal) {
      addCategoryModal.addEventListener('hidden.bs.modal', () => {
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.category = {
      id_num: 0,
      category_name: '',
      color: ''
    };
  }

  getCategories(): void {
    this.healthConditionsService.getCategories().subscribe(data => {
      this.categories = data;

    // Find the category with the highest ID (last ID)
    const lastCategory = this.categories.reduce((prev, current) => {
      return (prev.id_num > current.id_num) ? prev : current;
    }, { id_num: 0 });

    // Store the last category's ID
    const lastCategoryId = lastCategory.id_num;
    console.log('Last category ID:', lastCategoryId); // Optional: Log the last ID

    });
  }

  onEdit(selectedID: any): void {
    this.isEditMode = true;
    this.category = { ...selectedID };

    // Ensure the modal element is found and shown
    const modalElement = document.getElementById('addCategoryModal');
    if (modalElement){
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openModal(): void {
    this.isEditMode = false;
    this.resetForm();

    const modalElement = document.getElementById('addCategoryModal');
    if (modalElement) {
      modalElement.classList.add('show');
    }
  }

  onSubmit(form: any): void {
    if (form.valid) {
      // Set the ID for the new category when adding (for non-edit mode)
      if (!this.isEditMode) {
        // Find the highest current category ID
        const lastCategory = this.categories.reduce((prev, current) => (prev.id_num > current.id_num) ? prev : current, { id_num: 0 });
  
        // Set the ID for the new category as last ID + 1
        this.category.id_num = lastCategory.id_num + 1; // Increment the last ID
  
        // Call the service to add category
        this.healthConditionsService.addCategory(this.category).subscribe(
          (response) => {
            console.log('Category added successfully:', response);
            this.getCategories();  // Refresh the categories list
            this.successMessage = 'Category added successfully!';
            this.showSuccessModal();
            this.closeModal();
            form.reset();
          },
          (error) => {
            console.error('Error adding category:', error);
            // Check if the error contains a specific message from the backend
            const errorMessage =
            error.error && error.error.error
              ? error.error.error
              : 'An unknown error occurred while adding the category.';
            alert(errorMessage); // Show the actual error message
          }
        );
      } else {
        // For edit mode, update the category
        this.healthConditionsService.updateCategory(this.category).subscribe(
          (response) => {
            console.log('Category updated successfully:', response);
            this.getCategories();  // Refresh the categories list
            this.successMessage = 'Category updated successfully!';
            this.showSuccessModal();
            this.closeModal();
            form.reset();
          },
          (error) => {
            console.error('Error updating category:', error);
            // Check if the error contains a specific message from the backend
            const errorMessage =
            error.error && error.error.error
              ? error.error.error
              : 'An unknown error occurred while adding the category.';
            alert(errorMessage); // Show the actual error message
          }
        );
      }
    }
  }
  

  onDelete(id_num: string): void{
    const confirmDelete = confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      this.healthConditionsService.deleteCategory(id_num).subscribe(
        (response) => {
          console.log('Category deleted successfully:', response);
          this.getCategories();
          this.successMessage = 'Category deleted successfully!';
          this.showSuccessModal();
        },
        (error) => {
          console.error('Error deleting category:', error);
          // Check if the error contains a specific message from the backend
          const errorMessage =
          error.error && error.error.error
            ? error.error.error
            : 'An unknown error occurred while adding the category.';
          alert(errorMessage); // Show the actual error message
        }
      );
    }
  }

  showSuccessModal(): void {
    const successModal = new bootstrap.Modal(document.getElementById('successModal') as HTMLElement);
    successModal.show();
  }

  closeModal(): void {
    const modal = document.querySelector('#addCategoryModal')!;
    const closeButton = modal ? modal.querySelector('.custom-close-btn') as HTMLElement : null;
    if (closeButton) {
      closeButton.click();
  }
  }
}