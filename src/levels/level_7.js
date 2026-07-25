import Game from "../libs/game";
import { authMiddleware } from "../Middleware/AuthMiddleware";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]
export default function level_7(){

	const verify = new authMiddleware(7);
	if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{

		localStorage.removeItem('welcome');
		document.title = 'Level 7';
		const colors = ["yellow", "red"];
		let n_colors = colors.length; 
		const seventh_level = new Game({colors, level: 7, empty: 0, cupEmptyNumber: n_colors});
		localStorage.setItem('level', 7);
	
		return seventh_level.draw_cups();
	}
}

