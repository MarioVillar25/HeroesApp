import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private heroesService: HeroesService) {}

  //Creamos un Getter para obtener el Length de Liked Heroes

  public get likedHeroesLength(): number {
    console.log("length",this.heroesService);


    return this.heroesService.likedHeroes.length;
  }
}
