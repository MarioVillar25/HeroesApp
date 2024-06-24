import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFavouritesComponent } from './hero-favourites.component';

describe('HeroFavouritesComponent', () => {
  let component: HeroFavouritesComponent;
  let fixture: ComponentFixture<HeroFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFavouritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
