import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionBase } from '../../../../shared/generics/questions/question-base.generic';
import { TextboxQuestion } from '../../../../shared/generics/questions/question-textbox';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  providers: [MessageService]
})
export class SignupFormComponent implements OnInit, OnDestroy {

  questions: QuestionBase<string>[] = [];
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loginQuestions();
  }

  loginQuestions(): void {
    this.questions = [
      new TextboxQuestion({
        key: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        order: 3,
      }),
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
