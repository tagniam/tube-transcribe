import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }

}
