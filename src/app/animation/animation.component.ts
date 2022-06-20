import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style(
        {
          height: '400px',
          backgroundColor: 'red'
        }
      )),
      state('close', style(
        {
          height: '250px',
          backgroundColor: 'green'
        }
      )),
      transition('open=>close', [
        animate('2s')
      ]),
      transition('close=>open', [
        animate('1s')
      ])
    ])
  ]
})
export class AnimationComponent implements OnInit {

  isOpen = true
  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = !this.isOpen
  }
}
