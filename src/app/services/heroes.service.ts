import { Injectable } from '@angular/core';
import { Character, Heroes } from '../interfaces/character.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ComicsData } from '../interfaces/comics.interface';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public finalURL: string = environments.FINAL_URL;
  public baseURL: string = environments.BASE_URL;

  //Array de los Heroes likeados.

  public likedHeroes: Heroes[] = [];

  constructor(private http: HttpClient) {}

  //* FUNCIONES PARA LLAMADAS A LA API

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

  //* FUNCIONES PARA EL LOCAL STORAGE

  //Load Local Storage

  public loadLocalStorage(): void {
    this.likedHeroes = JSON.parse(localStorage.getItem('LikedHeroes')!);
  }
}
