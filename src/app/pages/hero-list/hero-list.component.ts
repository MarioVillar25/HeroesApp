import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { HeroesService } from '../../services/heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { Character, Heroes } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from '../../components/searcher/searcher.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule, SearcherComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  public heroes: Heroes[] = [];
  public inputValue: string = '';

  constructor(private heroesService: HeroesService) {}

  //Para obtener TODOS los héroes

  getAllHeroes(): void {
    this.heroesService.getAllHeroes().subscribe((heroes) => {

      this.heroes = heroes.data.results;

    });
  }

  //Para obtener el Héroe por Query

  getHeroByQuery(heroesFiltered: Heroes[]): void {
    this.heroes = heroesFiltered;
    console.log('this.heroesFiltered', this.heroes);
  }

  //Para obtener el valor del Input del SearchBox

  getInputValue(value: string): void {
    this.inputValue = value;
  }

  ngOnInit(): void {
    this.getAllHeroes();
  }
}
