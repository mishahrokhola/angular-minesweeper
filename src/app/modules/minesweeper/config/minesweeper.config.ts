import { GameSize } from '../enums/game-size.enum';
import { GameSettings } from '../interfaces/minesweeper.interface';

export abstract class MinesweeperConfig {
	public static readonly settings: Record<GameSize, GameSettings> = {
		[GameSize.small]: {
			size: 10,
			mines: 10,
		},
		[GameSize.medium]: {
			size: 18,
			mines: 40,
		},
		[GameSize.large]: {
			size: 24,
			mines: 99,
		},
	};
}
