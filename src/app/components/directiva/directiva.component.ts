import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {
  listaCurso: string[] = ['Typescript', 'Javascript', 'Java SE', 'C#', 'PHP'];
  isVisible: boolean = true;

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }
}
