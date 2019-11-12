import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'help-message',
  template: `
    <div style="width: 300px; height: 300px">
      <p>Help Message ......... </p>
      <p>Help Message ......... </p>
      <p>Help Message ......... </p>
      <p>Help Message ......... </p>
      <p>Help Message ......... </p>
      <p>Help Message ......... </p>
      <p>Help Message ......... </p>
    
    </div>
  `,
  styles: [`
      :host {
          display: block;
      }
    
  `]
})
export class HelpMessageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
