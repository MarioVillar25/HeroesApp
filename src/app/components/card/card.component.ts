import { Component, Input } from '@angular/core';
import { Heroes } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {


  @Input() hero!: Heroes;

  constructor(router:Router){}



}
