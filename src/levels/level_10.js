import Game from "../libs/game.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]
export default function level_10(){

	const verify = new authMiddleware(10);
	if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{

		localStorage.removeItem('welcome');
		document.title = 'Level 10';
		const colors = ["yellow", "red"];
		let n_colors = colors.length; 
		const tenth_level = new Game({colors, level: 10, empty: 0, cupEmptyNumber: n_colors});
		localStorage.setItem('level', 10);
	
		return tenth_level.draw_cups();
	}
}