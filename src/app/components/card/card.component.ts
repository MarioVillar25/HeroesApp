import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Heroes } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() hero!: Heroes;

  constructor(private heroesService: HeroesService) {}



  changeLikedHeroes(): void {
    this.heroesService.changeLikedHeroes(this.hero, this.hero.id);
  }

  checkColorLike(): boolean {
    return this.heroesService.checkColorLike(this.hero.id);
  }



  ngOnInit(): void {
    if (this.heroesService.likedHeroes.length !== 0) {
      this.heroesService.loadLocalStorage();
    }


    this.checkColorLike();
  }
}
