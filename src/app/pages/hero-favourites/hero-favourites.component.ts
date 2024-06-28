import { Component, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/character.interface';
import { HeroesService } from '../../services/heroes.service';
import { CardComponent } from '../../components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from '../../components/searcher/searcher.component';

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

  public ngOnInit(): void {
    this.getAllLikedHeroes();
  }

  //Para obtener todos los heroes favoritos

  public getAllLikedHeroes(): void {
    this.likedHeroes = this.heroesService.likedHeroes;
  }

  //Para obtener el Héroe por Nombre

  public getHeroByQuery(heroesFiltered: Heroes[]): void {
    this.likedHeroes = heroesFiltered;
    console.log('this.heroesFiltered', this.likedHeroes);
    //TODO: Asegurarse que solamente busca entre los favoritos
  }

  //Para obtener el valor del Input del SearchBox

  public getInputValue(value: string): void {
    this.inputValue = value;
  }

  //Para actualizar el valor de heroes favoritos y recargar el array
  //en el componente de hero-favourites

  public reloadFavorites(value: Heroes[]): void {
    this.likedHeroes = value;
  }
}
