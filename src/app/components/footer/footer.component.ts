import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  public author: { name: string; lastName: string } = {
    name: 'Mirko',
    lastName: 'Siddi',
  };
}
