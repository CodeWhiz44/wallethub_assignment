/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( forexample: ends with @+somecharechter +.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from "@angular/core";
 import { CommonModule } from "@angular/common";
 import { RouterModule } from "@angular/router";
 import { FormsModule } from "@angular/forms";

 @Component({
   selector: "ng-app",
   template: `
     <form (ngSubmit)="onSubmit($event)">
       <h2>Login</h2>
       <br />
       <input type="email" name="email" [(ngModel)]="email" />
       <div *ngIf="emailError" class="error">{{ emailError }}</div>
       <br />
       <input type="password" name="password" [(ngModel)]="password" />
       <div *ngIf="passwordError" class="error">{{ passwordError }}</div>
       <button type="submit">Submit</button>
       <br /><br />
       <div *ngIf="logged_in">Logged In!</div>
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
 export class Test03Component {
   email: string = "";
   password: string = "";
   logged_in = false;
   emailError: string | null = null;
   passwordError: string | null = null;

   validateEmail(email: string): boolean {
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailPattern.test(email) && email.endsWith(".com");
   }

   validatePassword(password: string): boolean {
     const hasLowerCase = /[a-z]/.test(password);
     const hasUpperCase = /[A-Z]/.test(password);
     const hasDigit = /\d/.test(password);
     const hasSpecialChar = /[@$!%*?&]/.test(password);
     const isLongEnough = password.length >= 8;
     
     console.log("Password:", password);
     console.log("Has Lower Case:", hasLowerCase);
     console.log("Has Upper Case:", hasUpperCase);
     console.log("Has Digit:", hasDigit);
     console.log("Has Special Char:", hasSpecialChar);
     console.log("Is Long Enough:", isLongEnough);

return (
  hasLowerCase && hasUpperCase && hasDigit && hasSpecialChar && isLongEnough
);
   }

   onSubmit(event: Event): void {
     event.preventDefault();

     this.emailError = null;
     this.passwordError = null;

     this.email = this.email.trim();
     this.password = this.password.trim();

     let valid = true;

     if (!this.validateEmail(this.email)) {
       this.emailError =
         "Invalid email format. Email must be in the format user@domain.com";
       valid = false;
     }

     if (!this.validatePassword(this.password)) {
       this.passwordError =
         "Password must contain at least one special character, one uppercase letter, one lowercase letter, one number, and be at least 8 characters long";
       valid = false;
     }

     if (valid) {
       this.logged_in = true;
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
         component: Test03Component,
       },
     ]),
   ],
   declarations: [Test03Component],
 })
 export class Test03Module {}
