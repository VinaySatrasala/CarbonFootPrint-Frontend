import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-norecord',
  standalone: true,
  imports: [],
  templateUrl: './norecord.component.html',
  styleUrl: './norecord.component.css',
})
export class NorecordComponent {
  @Input()
  message!: string;

  constructor() {}
}
