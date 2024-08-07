import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroes } from '../../interfaces/character.interface';
import { Comic } from '../../interfaces/comics.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss',
})
export class HeroPageComponent implements OnInit {
  public hero!: Heroes;
  public comics!: Comic[];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.reclaimHeroById();
    this.reclaimComicsByHeroId();
    this.heroesService.loadLocalStorage();
  }

  //Función para llamar a la info de Hero por Id
  public reclaimHeroById(): void {
    //usamos el activatedRoute para reclamar el id por params
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((heroById) => {
        if (!heroById) return this.router.navigate(['heroes']);
        //console.log( "heroId",heroById.data.results[0]);
        return (this.hero = heroById.data.results[0]);
      });
  }

  //Función para llamar a la info del comic por hero Id

  public reclaimComicsByHeroId(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getComicsByHeroId(id)))
      .subscribe((comics) => {
        if (!comics) return;

        return (this.comics = comics?.data.results);
      });
  }

  //Función para dar like y dislike

  public changeLikedHeroes(): void {
    this.heroesService.changeLikedHeroes(this.hero, this.hero.id);
  }

  //Función para dar cambiar color del corazón del like

  public checkColorLike(): boolean {
    return this.heroesService.checkColorLike(this.hero.id);
  }
}
