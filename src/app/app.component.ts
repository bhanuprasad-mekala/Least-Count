import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Least Count';
  
  isDivVisible = true;

  hideDiv() {
    this.isDivVisible = false;
  }
}
