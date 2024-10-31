import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionBase } from '../../../../shared/generics/questions/question-base.generic';
import { TextboxQuestion } from '../../../../shared/generics/questions/question-textbox';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  providers: [MessageService]
})
export class SignupFormComponent implements OnInit, OnDestroy {
  private _userService: UserService = inject(UserService);
  private destroy$ = new Subject<void>();

  questions: QuestionBase<string>[] = [];

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    this.loginQuestions();
  }

  loginQuestions(): void {
    this.questions = [
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
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

  onSubmit(formData: any): void {
    this._userService.signupUser(formData).subscribe({
      next: () => {
        this.router.navigate(['/auth', '/login'])
        this.messageService.add({
          severity: 'success',
          summary: 'Sign Up Successful',
          detail: 'You have successfully signed up!',
          life: 2000
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Some error',
          detail: 'An error has occured. Please try again',
          life: 2000
        });
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
