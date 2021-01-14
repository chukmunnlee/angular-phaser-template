import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../game.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  constructor(private gameSvc: GameService) { }

  ngOnInit(): void {
    this.gameSvc.createGame(false)
  }

  ngOnDestroy() {
    this.gameSvc.destroyGame()
  }

}
