import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ComicsData } from '../interfaces/comics.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  //public keyPublic: string = '7b8a712b1fe2407b75c2cf1b7ca3d9b5';
  //private keyPrivate: string = 'e5d22438d3f21e719eeb9b840f6f0961b26b72f2';
  //private hash: string = '04d6f9bd92df8e4f6f1ef343a695d4bf';
  public testURL: string =
    'ts=1719221103905&apikey=7b8a712b1fe2407b75c2cf1b7ca3d9b5&hash=04d6f9bd92df8e4f6f1ef343a695d4bf';
  public baseURL: string = 'https://gateway.marvel.com';

  public heroes: Character[] = [];

  constructor(private http: HttpClient) {}

  getAllHeroes(): Observable<Character> {
    return this.http.get<Character>(
      `${this.baseURL}/v1/public/characters?limit=50&${this.testURL}`
    );
  }

  getHeroByQuery(query: string): Observable<Character> {
    return this.http.get<Character>(
      `${this.baseURL}/v1/public/characters?name=${query}&${this.testURL}`
    );
  }

  getHeroById(id: string): Observable<Character | undefined> {
    return this.http
      .get<Character>(
        `${this.baseURL}/v1/public/characters/${id}?${this.testURL}`
      )
      .pipe(catchError((error) => of(undefined)));
  }

  getComicsByHeroId(id:string){
    return this.http
    .get<ComicsData>(
      `${this.baseURL}/v1/public/characters/${id}/comics?${this.testURL}`
    )
    .pipe(catchError((error) => of(undefined)));
  }
}
