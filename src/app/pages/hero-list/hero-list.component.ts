import { Component, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { HeroesService } from '../../services/heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { Heroes } from '../../interfaces/character.interface';
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
  @ViewChild('searcher')
  public searcher?: SearcherComponent;

  public heroes: Heroes[] = [];
  public inputValue: string = '';

  constructor(private heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.getAllHeroes();
    this.heroesService.loadLocalStorage();
    this.searcher?.inputValue;
  }

  //Para obtener TODOS los héroes

  public getAllHeroes(): void {
    this.heroesService.getAllHeroes().subscribe((heroes) => {
      this.heroes = heroes.data.results;
    });
  }

  //Para obtener el Héroe por Query

  public getHeroByQuery(heroesFiltered: Heroes[]): void {
    this.heroes = heroesFiltered;
    console.log('this.heroesFiltered', this.heroes);
  }

  //Para obtener el valor del Input del SearchBox

  //TODO: NgModel para mostrar el input en el HTML
  //desde el hijo se hace el [NgModel] y se guarda en una variable.
  //Se pone en el input del HTML

  public getInputValue(value: string): void {
    this.inputValue = value;
  }
}
