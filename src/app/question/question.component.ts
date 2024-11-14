import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';

import { Question } from '../question.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MatSelectModule, MatListModule, MatButtonModule,MatCardModule, CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.sass'
})
export class QuestionComponent {
    @Input() question!: Question;
    @Output() submit = new EventEmitter<number[]>();
    @Output() nextQuestion   = new EventEmitter<void>();


    selectedChoices: Set<number> = new Set();

    ngOnInit(): void {
    }
  
    // Alternar selección de una opción
    toggleSelection(choiceIndex: number): void {
      if (this.selectedChoices.has(choiceIndex)) {
        this.selectedChoices.delete(choiceIndex);
      } else {
        this.selectedChoices.add(choiceIndex);
      }
    }

    // Verificar si una opción está seleccionada
    isSelected(choiceIndex: number): boolean {
      return this.selectedChoices.has(choiceIndex);
    }

    // Enviar la respuesta seleccionada
    submitAnswer(): void {
      this.submit.emit(Array.from(this.selectedChoices));
    }

    // Resetear la selección
    resetSelection(): void {
      this.selectedChoices.clear();
    }

    next() {
      this.resetSelection();
      this.nextQuestion.emit();
    }

}
