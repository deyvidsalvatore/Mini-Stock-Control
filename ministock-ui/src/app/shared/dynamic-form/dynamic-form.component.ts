import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from '../generics/questions/question-base.generic';
import { QuestionControlService } from '../services/question-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  standalone: true,
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [QuestionControlService, MessageService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  myQcs!: QuestionControlService;

  constructor(private qcs: QuestionControlService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.payLoad = JSON.stringify(this.form.getRawValue());
      this.showSuccessToast(`Data was saved successfully!`);
    } else {
      this.showErrorToast('An error happened, check the fields!');
    }
  }

  showSuccessToast(detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
      life: 2000
    });
  }

  showErrorToast(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 2000
    });
  }
}
