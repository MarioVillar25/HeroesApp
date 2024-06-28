import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/character.interface';
import {  Router } from '@angular/router';

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

  //Ruta para saber la URL
  public ruta: string = this.router.url;

  @Output() public emisionLikedHeroes = new EventEmitter<Heroes[]>();
  @Output() public emisionHeroes = new EventEmitter<Heroes[]>();
  @Output() public emisionValorInput = new EventEmitter<string>();

  constructor(private heroesService: HeroesService, private router: Router) {}

  //Para buscar el héroe

  public searchHero() {
    //Creamos en newTag en el que almacenaremos el valor del input
    const newTag = this.tagInput.nativeElement.value;

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
    this.tagInput.nativeElement.value = '';
  }

  //Para buscar el héroe favorito

  public searchFavouriteHero() {
    //Creamos en newTag en el que almacenaremos el valor del input
    const newTag = this.tagInput.nativeElement.value;

    if (newTag === '') {
      this.emisionLikedHeroes.emit(this.heroesService.likedHeroes);
    } else {
      //Primero hacemos comprobacion de que newTag está en LikedHeroes:
      if (this.checkEqualityName(newTag)) {
        this.heroesService.getHeroByQuery(newTag).subscribe((heroesFilt) => {
          this.emisionHeroes.emit(heroesFilt.data.results);
          this.emisionValorInput.emit(newTag);
        });
      } else {
        //me tiene que dar error porque ese valor no está en likedHeroes
        //this.emisionValorInput.emit(newTag);
      }
    }

    //reseteamos el valor del input
    this.tagInput.nativeElement.value = '';
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
