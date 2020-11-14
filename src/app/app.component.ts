import { Component } from '@angular/core';
import { GameSize } from './modules/minesweeper/enums/game-size.enum';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public readonly GameSize = GameSize;
}
