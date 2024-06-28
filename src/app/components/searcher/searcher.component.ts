import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/character.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.scss',
})
export class SearcherComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  //el tagInput siempre va a tener un valor

  public ruta: string = this.router.url;

  //@Input() heroes: Heroes[] = [];
  @Output() public emisionHeroes = new EventEmitter<Heroes[]>();
  @Output() public emisionValorInput = new EventEmitter<string>();

  constructor(private heroesService: HeroesService, private router: Router) {}

  public searchHero() {
    console.log('searchHero');

    //Creamos en newTag en el que almacenaremos el valor del input
    const newTag = this.tagInput.nativeElement.value;
    //console.log('newTag', newTag);

    //Metemos condición: Si el string está vacío
    //Volvemos a llamar a todos los héroes

    if (newTag === '') {

      this.emisionHeroes.emit(this.heroesService.likedHeroes);












    } else {
      //Llamamos al servicio para meter newTag al array vacío de _tagsHistory
      this.heroesService.getHeroByQuery(newTag).subscribe((heroesFilt) => {
        //console.log('heroesFiltered', heroesFilt);
        this.emisionValorInput.emit(newTag);
        this.emisionHeroes.emit(heroesFilt.data.results);
      });
    }

    //reseteamos el valor del input
    this.tagInput.nativeElement.value = '';
  }

  searchFavouriteHero() {
    //Creamos en newTag en el que almacenaremos el valor del input
    const newTag = this.tagInput.nativeElement.value;

    console.log('searchFavouriteHero');
    console.log(this.heroesService.likedHeroes);
    console.log(this.checkEqualityName(newTag));

    if (newTag === '') {







    } else {
      //Primero hacemos comprobacion de que newTag está en LikedHeroes:
      if (this.checkEqualityName(newTag)) {
        this.heroesService.getHeroByQuery(newTag).subscribe((heroesFilt) => {
          this.emisionHeroes.emit(heroesFilt.data.results);
          this.emisionValorInput.emit(newTag);
        });
      } else {
        //me tiene que dar error porque ese valor no está en likedHeroes

        console.log('Ese heroe no lo tienes en likes');

        //this.emisionValorInput.emit(newTag);
      }
    }

    //reseteamos el valor del input
    this.tagInput.nativeElement.value = '';
  }

  //Para comprobar que el valor del input existe en LikedHeroes

  checkEqualityName(value: string): boolean {
    console.log('value', value);

    let state = false;

    for (let i = 0; i < this.heroesService.likedHeroes.length; i++) {
      if (value == this.heroesService.likedHeroes[i].name) {
        state = true;
      }

      console.log('NAME', this.heroesService.likedHeroes[i].name);
    }

    console.log("state", state);


    return state;
  }
}
