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


  //Copia Funciones
/*
  changeLikeState(): void {
    if (this.heroesService.likedHeroes.length === 0) {
      this.heroesService.likedHeroes.push(this.hero);
      console.log('primer paso');
    } else {
      console.log('this.hero.id', this.hero.id);

      if (
        this.heroesService.likedHeroes.every(
          (elem) => elem.id !== this.hero.id
        ) === true
      ) {
        //Meteme ese elemento del array

        this.heroesService.likedHeroes.push(this.hero);
      } else {
        //eliminame ese elemento del array

        let index = this.heroesService.likedHeroes.findIndex(
          (elem) => elem.id === this.hero.id
        );
        this.heroesService.likedHeroes.splice(index, 1);
      }
    }

    console.log('array heroes likeados', this.heroesService.likedHeroes);

    console.log('-------------------------------');
  }

  checkColorLike(value: number): boolean {
    if (
      this.heroesService.likedHeroes.every(
        (elem) => elem.id !== value
      ) === true
    ) {
      return true;
    } else {
      return false;
    }
  }
 */

  changeLikedHeroes():void{
   this.heroesService.changeLikedHeroes(this.hero, this.hero.id)
  }

  checkColorLike():boolean{
    return this.heroesService.checkColorLike(this.hero.id)
  }

}
