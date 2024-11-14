import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable } from 'rxjs';
import { LoaddataService } from './loaddata.service';


export interface Question {
  question: string;
  choices: { [key: string]: string }; // Objeto para las opciones de respuesta, donde la clave es el índice y el valor es la respuesta
  correctChoices: { [key: string]: number }; // Objeto para las respuestas correctas, donde la clave es el índice y el valor indica cuál es correcto
  responseExplanation: {
    correct: { [key: string]: string }; // Explicaciones de las respuestas correctas
    incorrect: { [key: string]: string }; // Explicaciones de las respuestas incorrectas
  };
  response?: number[]
}




@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private questionsSubject = new BehaviorSubject<Question[]>([]);
  private current = new BehaviorSubject<number>(0);


  constructor(private loaddata:LoaddataService) {
    this.loaddata.load(this.loaddata.tiers[0].file);
    this.loaddata.data.subscribe((data) => this.questionsSubject.next(this.shuffleArray(data)))
  }

  get question(): Observable<Question>{
    return this.current.asObservable().pipe(
      mergeMap((current) => this.questions.pipe(map(questions => questions[current])))
    )
  }
  get questions(): Observable<Question[]>{
    return this.questionsSubject.asObservable();
  }

  get status(): Observable<number> {
    return this.current.asObservable().pipe(map(current => current +1));
  }

  get total(): Observable<number>{
    return this.questions.pipe(map(questions => questions.length ));
  }

  get percent(): Observable<number>{
    return this.total.pipe(mergeMap(total => this.status.pipe(map(status => status*100/total))))
  }

  get result(): Observable<any>{
    return this.questions.pipe(
      map(questions => questions.reduce((acc, { correctChoices, response }) => [
        acc[0] + (response?.every((choice, index) => correctChoices[index] === choice) ? 1 : 0),
        acc[1] + (response ? (response.every((choice, index) => correctChoices[index] === choice) ? 0 : 1) : 1)
      ],[0,0])));
  }

  setResponse(question:Question) {
    this.questionsSubject.next([...this.questionsSubject.getValue().slice(0, this.current.getValue()),
      question,
     ...this.questionsSubject.getValue().slice(this.current.getValue() + 1)
    ]);
  }

  // Función para barajar el array de preguntas
  private shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

    // Método para avanzar a la siguiente pregunta
    nextQuestion(): void {
      this.current.next(this.current.getValue() + 1);
    }
}
