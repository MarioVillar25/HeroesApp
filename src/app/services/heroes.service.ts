import { Injectable } from '@angular/core';
import { Character, Heroes } from '../interfaces/character.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ComicsData } from '../interfaces/comics.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  //TODO: meter en environments

  public finalURL: string =
    'ts=1719221103905&apikey=7b8a712b1fe2407b75c2cf1b7ca3d9b5&hash=04d6f9bd92df8e4f6f1ef343a695d4bf';

  public baseURL: string = 'https://gateway.marvel.com';

  //Estado para los likes

  public likeState: boolean = false;

  //Array de los Heroes likeados.

  public likedHeroes: Heroes[] = [];

  constructor(private http: HttpClient) {}

  //Para obtener todos los héroes

  public getAllHeroes(): Observable<Character> {
    return this.http.get<Character>(
      `${this.baseURL}/v1/public/characters?limit=50&${this.finalURL}`
    );
  }

  //Para obtener héroe por nombre

  public getHeroByQuery(query: string): Observable<Character> {
    return this.http.get<Character>(
      `${this.baseURL}/v1/public/characters?name=${query}&${this.finalURL}`
    );
  }

  //Para obtener héroe por id

  public getHeroById(id: string): Observable<Character | undefined> {
    return this.http
      .get<Character>(
        `${this.baseURL}/v1/public/characters/${id}?${this.finalURL}`
      )
      .pipe(catchError((error) => of(undefined)));
  }

  //Para obtener comics por id de un héroe determinado

  public getComicsByHeroId(id: string) {
    return this.http
      .get<ComicsData>(
        `${this.baseURL}/v1/public/characters/${id}/comics?${this.finalURL}`
      )
      .pipe(catchError((error) => of(undefined)));
  }

  //* FUNCIONES PARA EL SISTEMA DE LIKES

  //Para cambiar el estado del like
  //? se está usando este método?

  public changeLikeState(value: boolean) {
    return (value = !value);
  }

  //Para dar like y dislike a un héroe

  public changeLikedHeroes(hero: Heroes, id: number): void {
    if (this.likedHeroes.length === 0) {
      this.likedHeroes.push(hero);
    } else {
      if (this.likedHeroes.every((elem) => elem.id !== id) === true) {
        //Meteme ese elemento del array
        this.likedHeroes.push(hero);
        localStorage.setItem('LikedHeroes', JSON.stringify(this.likedHeroes));
      } else {
        //eliminame ese elemento del array

        let index = this.likedHeroes.findIndex((elem) => elem.id === id);
        this.likedHeroes.splice(index, 1);
        localStorage.setItem('LikedHeroes', JSON.stringify(this.likedHeroes));
      }
    }
  }

  //para poder cambiar el color del corazón

  public checkColorLike(value: number): boolean {
    if (this.likedHeroes.every((elem) => elem.id !== value) === true) {
      return true;
    } else {
      return false;
    }
  }

  //Load Local Storage

  loadLocalStorage(): void {
    this.likedHeroes = JSON.parse(localStorage.getItem('LikedHeroes')!);
  }
}
