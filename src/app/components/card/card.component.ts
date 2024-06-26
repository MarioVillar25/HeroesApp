import { Component, Input } from '@angular/core';
import { Heroes } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() hero!: Heroes;

  constructor(private heroesService: HeroesService) {}

  changeLikeState(): void {


    console.log('this.hero.id', this.hero.id);

    if (this.heroesService.likedHeroes.length === 0) {
      this.heroesService.likedHeroes.push(this.hero);
    }
    console.log("this.heroesService.likedHeroes[0].id", this.heroesService.likedHeroes[0].id);


    console.log('array heroes likeados', this.heroesService.likedHeroes);

    console.log('-------------------------------');
  }
}
