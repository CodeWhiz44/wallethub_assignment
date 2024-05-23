/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */

import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "textfield",
  template:
    '<input type="text" [(ngModel)]="field" (ngModelChange)="onFieldChange()" />',
})
export class TextField {
  @Input() field: string = "";
  @Output() fieldChange = new EventEmitter<string>();

  onFieldChange() {
    this.fieldChange.emit(this.field);
  }
}

@Component({
  selector: "child-component",
  template: `<h2>Title:</h2>
    <br /><textfield
      [(field)]="title"
      (fieldChange)="onTitleChange($event)"
    ></textfield>`,
})
export class ChildComponent {
  @Input() title: string = "";
  @Output() titleChange = new EventEmitter<string>();

  onTitleChange(newTitle: string) {
    this.title = newTitle;
    this.titleChange.emit(newTitle);
  }
}

@Component({
  selector: "ng-app",
  template: `<div>
    <child-component [(title)]="title"></child-component> <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  title: string = "";
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
