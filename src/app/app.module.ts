import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MinesweeperModule } from './modules/minesweeper/minesweeper.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, MinesweeperModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
