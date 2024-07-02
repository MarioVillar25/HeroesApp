import { Component, EventEmitter, Output } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/character.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent {
  //Ruta para saber la URL
  public ruta: string = this.router.url;

  //Valor del Input

  public inputValue = '';

  //Outputs:

  @Output() public emisionLikedHeroes = new EventEmitter<Heroes[]>();
  @Output() public emisionHeroes = new EventEmitter<Heroes[]>();
  @Output() public emisionValorInput = new EventEmitter<string>();

  constructor(private heroesService: HeroesService, private router: Router) {}

  //Para buscar el héroe

  public searchHero() {
    //Creamos en newTag en el que almacenaremos el valor del input
    const newTag = this.inputValue;

    //Metemos condición: Si el string está vacío
    //Volvemos a llamar a todos los héroes

    if (newTag === '') {
      this.heroesService.getAllHeroes().subscribe((allHeroes) => {
        this.emisionValorInput.emit(newTag);
        this.emisionHeroes.emit(allHeroes.data.results);
      });
    } else {
      //Llamamos al servicio para meter newTag al array vacío de _tagsHistory
      this.heroesService.getHeroByQuery(newTag).subscribe((heroesFilt) => {
        this.emisionValorInput.emit(newTag);
        this.emisionHeroes.emit(heroesFilt.data.results);
      });
    }

    //reseteamos el valor del input
    this.inputValue = '';
  }

  //GETTER para likedHeroes del servicio:

  public get heroesLikeados(): Heroes[] {
    return this.heroesService.likedHeroes;
  }

  //Para buscar el héroe favorito

  public searchFavouriteHero() {
    //Creamos en newTag en el que almacenaremos el valor del input
    const newTag = this.inputValue;

    if (newTag === '') {
      this.emisionLikedHeroes.emit(this.heroesService.likedHeroes);

      //? meter GETTER del servicio?
    } else {
      //Primero hacemos comprobacion de que newTag está en LikedHeroes:
      if (this.checkEqualityName(newTag)) {
        this.heroesService.getHeroByQuery(newTag).subscribe((heroesFilt) => {
          this.emisionHeroes.emit(heroesFilt.data.results);
          //this.emisionValorInput.emit(newTag);
        });
      } else {
        //me tiene que dar error porque ese valor no está en likedHeroes
        this.emisionValorInput.emit(newTag);
        this.emisionHeroes.emit([]);
      }
    }

    //reseteamos el valor del input
    this.inputValue = '';
  }

  //Para comprobar que el valor del input existe en LikedHeroes

  public checkEqualityName(value: string): boolean {
    let state = false;

    for (let i = 0; i < this.heroesService.likedHeroes.length; i++) {
      if (value == this.heroesService.likedHeroes[i].name) {
        state = true;
      }
    }

    return state;
  }
}
