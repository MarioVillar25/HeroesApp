import { Component, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/character.interface';
import { HeroesService } from '../../services/heroes.service';
import { CardComponent } from '../../components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from '../../components/searcher/searcher.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-hero-favourites',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule, SearcherComponent],
  templateUrl: './hero-favourites.component.html',
  styleUrl: './hero-favourites.component.scss',
})
export class HeroFavouritesComponent implements OnInit {
  public likedHeroes: Heroes[] = [];
  public inputValue: string = '';

  constructor(private heroesService: HeroesService) {}

  public getAllLikedHeroes(): void {
    this.likedHeroes = this.heroesService.likedHeroes;
  }

  //Para obtener el Héroe por Query

  public getHeroByQuery(heroesFiltered: Heroes[]): void {
    this.likedHeroes = heroesFiltered;
    console.log('this.heroesFiltered', this.likedHeroes);
    //TODO: Asegurarse que solamente busca entre los favoritos
  }

  //Para obtener el valor del Input del SearchBox

  public getInputValue(value: string): void {
    this.inputValue = value;
    //TODO: Meter esta función en el servicio
  }

  public ngOnInit(): void {
    this.getAllLikedHeroes();
  }
}
