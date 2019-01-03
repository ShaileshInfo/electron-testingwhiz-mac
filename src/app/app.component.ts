import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model: any = {};
  result: any = {};
  title = 'Testing Whiz sample !';
  display = false;

  sum() {
    console.log(this.model);
    this.display = true;
    this.result = parseInt(this.model.value1) + parseInt(this.model.value2);
    // confirm('Result is ' + this.result);
  }
}