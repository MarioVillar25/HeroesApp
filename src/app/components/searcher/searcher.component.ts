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

  //@Input() heroes: Heroes[] = [];
  @Output() emisionHeroes = new EventEmitter<Heroes[]>();
  @Output() emisionValorInput = new EventEmitter<string>();

  constructor(private heroesService: HeroesService) {}

  searchHero() {
    //Creamos en newTag en el que almacenaremos el valor del input
    const newTag = this.tagInput.nativeElement.value;
    console.log('newTag', newTag);

    //Metemos condición: Si el string está vacío
    //Volvemos a llamar a todos los héroes

    if (newTag === '') {
      this.heroesService.getAllHeroes().subscribe((heroes) => {
        this.emisionHeroes.emit(heroes.data.results);
      });
    } else {
      //Llamamos al servicio para meter newTag al array vacío de _tagsHistory
      this.heroesService.getHeroByQuery(newTag).subscribe((heroesFilt) => {
        console.log('heroesFiltered', heroesFilt);
        this.emisionValorInput.emit(newTag);
        this.emisionHeroes.emit(heroesFilt.data.results);
      });
    }

    //reseteamos el valor del input
    this.tagInput.nativeElement.value = '';
  }
}
