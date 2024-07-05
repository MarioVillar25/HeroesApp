import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { HeroesService } from '../../services/heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { Heroes } from '../../interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from '../../components/searcher/searcher.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CardComponent, HttpClientModule, CommonModule, SearcherComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit, OnDestroy {
  @ViewChild('searcher')
  public searcher?: SearcherComponent;
  public peticion: Subscription[] = [];

  public heroes: Heroes[] = [];
  public inputValue: string = '';

  constructor(private heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.getAllHeroes();
    this.heroesService.loadLocalStorage();
    this.searcher?.inputValue;
  }
  public ngOnDestroy(): void {
    //nos desuscribimos del array de peticiones.
    this.peticion.forEach((item) => {
      item.unsubscribe;
    });
  }

  //Para obtener TODOS los héroes

  public getAllHeroes(): void {
    let peticionLocal = this.heroesService.getAllHeroes().subscribe({
      next: (heroes) => {
        this.heroes = heroes.data.results;
        console.log(heroes.data.results);
      },
      error: (err) => {
        alert('ocurrió un error en la petición getAllHeroes');
      },
    });

    this.peticion.push(peticionLocal);
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
