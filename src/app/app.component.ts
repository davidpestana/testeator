import { Component } from '@angular/core';
import { Question, QuestionService } from './question.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TierSelectorComponent } from './tier-selector/tier-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuestionComponent, MatProgressBarModule, TierSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  question$:Observable<Question>;
  status$: Observable<number>;
  total$: Observable<number>;
  percent$: Observable<number>;
  result$: Observable<any>;
  constructor(private question:QuestionService){
    this.question$ = this.question.question;
    this.status$ = this.question.status;
    this.total$ = this.question.total;
    this.percent$ = this.question.percent;
    this.result$ = this.question.result;
  }


  response(question: Question, response: number[]){
    this.question.setResponse({...question, response});
  }
  

  next() {
    this.question.nextQuestion();
  }
}
