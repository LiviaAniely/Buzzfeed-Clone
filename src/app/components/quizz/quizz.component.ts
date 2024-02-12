import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent{

  title: string = "";
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void{
    if(quizz_questions){
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  buttonPress(alias: string) {
    this.answers.push(alias);
    this.nextQuestion();

  }

  async nextQuestion(){
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.selectAnswer(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async selectAnswer(answers: string[]){

    const result = answers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous;
      }else{
        return current;
      }
    })
    return result;
  }
}
