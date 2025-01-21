import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import * as bootstrap from 'bootstrap';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-setup',
  standalone: false,
  templateUrl: './user-setup.component.html',
  styleUrl: './user-setup.component.css'
})
export class UserSetupComponent implements OnInit {
  users: User[] = []; // Define user array with User type
  userTypes: any[] = [];
  selectedUser: any = {}; // For editing a specific user
  isEditMode = false; // Flag to determine if the modal is in edit mode
  user: User = {
    email: '',
    password: '',
    id_number: '',
    user_type: '',
    firstname: '',
    lastname: '',
    comment: ''
  };
  originalPassword: string = ''; // Store original password for comparison

  successMessage: string = '';  // Success message
  passwordVisible: boolean = false; // Flag to toggle password visibility

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers(); // Fetch users when the component is loaded
    this.getUserTypes(); // Fetch user types for the dropdown

        // Add event listener to clear fields when modal is hidden
        const addUserModal = document.getElementById('addUserModal');
        if (addUserModal) {
          addUserModal.addEventListener('hidden.bs.modal', () => {
            this.resetForm();
          });
        }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.user = {
      email: '',
      password: '',
      id_number: '',
      user_type: '',
      firstname: '',
      lastname: '',
      comment: ''
    };
  }

  // Fetch the users from the backend
  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  // Fetch user types from the backend
  getUserTypes(): void {
    this.userService.getUserTypes().subscribe(data => {
      this.userTypes = data.map((type: any) => type.name); // Only store the 'name' values
    });
  }

  // Handle edit button click
  onEdit(selectedUser: any): void {
    this.isEditMode = true;
    this.user = { ...selectedUser };  // Pre-populate the form with user data
    this.originalPassword = selectedUser.password;

    // Ensure the modal element is found and shown
    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();  // This will display the modal
    }
  }

  // Open the modal for adding or editing a user
  openModal(): void {
    this.isEditMode = false;
    this.resetForm();

    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Show the modal
    }
  }

  // Handle the form submission (for both add and edit operations)
onSubmit(form: any): void {
  if (form.valid) {
    if (this.isEditMode) {
      // Call the service to update the existing user
      this.userService.updateUser(this.user).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.getUsers(); // Fetch updated list of users
          this.successMessage = 'User updated successfully!';
          this.showSuccessModal();
          this.closeModal();
          form.reset();
        },
        (error) => {
          console.error('Error updating user:', error);
          // Check if the error contains a specific message from the backend
          const errorMessage =
          error.error && error.error.error
            ? error.error.error
            : 'An unknown error occurred while adding the category.';
          alert(errorMessage); // Show the actual error message
        }
      );
    } else {
      // Call the service to add a new user
      this.userService.addUser(this.user).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.getUsers(); // Fetch updated list of users
          this.successMessage = 'User added successfully!';
          this.showSuccessModal();
          this.closeModal();
          form.reset();
        },
        (error) => {
          console.error('Error adding user:', error);
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

  // Handle the delete operation
  onDelete(userEmail: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      this.userService.deleteUser(userEmail).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          this.getUsers(); // Fetch updated list of users
          this.successMessage = 'User deleted successfully!';
          this.showSuccessModal();
        },
        (error) => {
          console.error('Error deleting user:', error);
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

  // Toggle password visibility between text and password
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; // Toggle the visibility flag
  }

  // Show the success modal
  showSuccessModal(): void {
    const successModal = new bootstrap.Modal(document.getElementById('successModal') as HTMLElement);
    successModal.show();
  }

  // Close the modal programmatically
  closeModal(): void {
    const modal = document.querySelector('#addUserModal');
    const closeButton = modal ? modal.querySelector('.btn-close') as HTMLElement : null;
    if (closeButton) {
      closeButton.click(); // Programmatically click the close button
    }
  }
}
