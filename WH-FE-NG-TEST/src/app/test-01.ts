/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ng-app",
  template: `<div>
    <h2>Loan Details</h2>
    <label>
      Loan Amount:
      <input
        type="number"
        [(ngModel)]="loan_amount"
        (ngModelChange)="onLoanAmountChange()"
      />
    </label>
    <br />
    <b>Monthly Payment:</b> {{ formatCurrency(monthly_payment) }} <br />
    <b>Late Payment Fee :</b> {{ formatCurrency(late_payment) }} <br />
  </div>`,
})
export class Test01Component {
  loan_amount: number = 1000;
  monthly_payment: string | number = 200;
  late_payment: string | number = 10;

  onLoanAmountChange() {
    if (!this.loan_amount || this.loan_amount <= 0) {
      this.monthly_payment = "N/A";
      this.late_payment = "N/A";
    } else {
      this.monthly_payment = this.loan_amount * 0.02;
      this.late_payment = this.monthly_payment * 0.05;
    }
  }

  formatCurrency(value: number | string): string {
    if (value === "N/A") {
      return value;
    }
    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
    })}`;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test01Component,
      },
    ]),
  ],
  declarations: [Test01Component],
})
export class Test01Module {}
