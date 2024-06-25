import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

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
      `${this.baseURL}/v1/public/characters?${this.testURL}`
    );
  }

  getHeroByQuery(query:string): Observable<Character>{
    return this.http.get<Character>(
      `${this.baseURL}/v1/public/characters?name=${query}&${this.testURL}`
    );  }


}
