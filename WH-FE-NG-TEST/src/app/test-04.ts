/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ng-app",
  template: `
    <h2>Enter your first and last name</h2>
    <form (ngSubmit)="onSubmit($event)">
      <div>
        <label for="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          [(ngModel)]="firstName"
        />
        <div *ngIf="firstNameError" class="error">{{ firstNameError }}</div>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          [(ngModel)]="lastName"
        />
        <div *ngIf="lastNameError" class="error">{{ lastNameError }}</div>
      </div>
      <button type="submit">Submit</button>
    </form>
  `,
  styles: [
    `
      .error {
        color: red;
        font-size: 12px;
      }
    `,
  ],
})
export class UserNameComponent {
  firstName: string = "";
  lastName: string = "";
  firstNameError: string | null = null;
  lastNameError: string | null = null;

  validateFirstName(firstName: string): boolean {
    return firstName.trim().length > 0;
  }

  validateLastName(lastName: string): boolean {
    return lastName.trim().length > 0;
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.firstNameError = null;
    this.lastNameError = null;

    let valid = true;

    if (!this.validateFirstName(this.firstName)) {
      this.firstNameError = "First name is required";
      valid = false;
    }

    if (!this.validateLastName(this.lastName)) {
      this.lastNameError = "Last name is required";
      valid = false;
    }

    if (valid) {
      alert("Form submitted successfully");
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: UserNameComponent,
      },
    ]),
  ],
  declarations: [UserNameComponent],
})
export class UserNameModule {}
