import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionBase } from '../../../../shared/generics/questions/question-base.generic';
import { TextboxQuestion } from '../../../../shared/generics/questions/question-textbox';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MessageService],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private _userService: UserService = inject(UserService);
  private destroy$ = new Subject<void>();

  questions: QuestionBase<string>[] = [];

  constructor(
    private messageService: MessageService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginQuestions();
  }

  loginQuestions(): void {
    this.questions = [
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        order: 2,
      }),
    ];
  }

  onSubmit(formData: any): void {
    this._userService.authUser(formData).subscribe({
      next: (response) => {
        this.cookieService.set('USER_INFO', response?.token);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'You have successfully logged in!',
          life: 2000,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Please check your credentials and try again.',
          life: 2000,
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
