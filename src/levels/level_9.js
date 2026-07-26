import Game from "../libs/game";
import { authMiddleware } from "../Middleware/AuthMiddleware";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]
const condition = () =>{
	
}

export default function level_9(){

	const verify = new authMiddleware(9);
    if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{

		localStorage.removeItem('welcome');
		document.title = 'Level 9';
		const colors = ["yellow", "red"];
		let n_colors = colors.length; 
		const ninth_level = new Game({colors, level: 9, empty: 1, cupEmptyNumber: n_colors, func: condition});
		localStorage.setItem('level', 9);
	
		return ninth_level.draw_cups();
	}
}

