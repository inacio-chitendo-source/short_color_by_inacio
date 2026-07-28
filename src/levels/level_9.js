import Game from "../libs/game";
import { authMiddleware } from "../Middleware/AuthMiddleware";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]
const condition = ( elements = {} ) =>{
	const copo = document.createElement('div');
	let clr;
	const color = elements.colors;

    if(elements.hasColor) copo.className = `copo copo${elements.i}`;
	else copo.className = `copo copo${elements.i + elements.t}`;

    for(let j = 0; j < 4; j++){
		if(elements.hasColor){
			let c = j;
			if(elements.i == 0){
				if(c == 0) c = 5;
				else if(c == 1) c = 6;
				else if(c == 2) c = 4;
				else if(c == 3) c = 6;
			}else if(elements.i == 1){
				if(c == 2) c = 1;
				else if(c == 1) c = 2;
				else if(c == 0) c = 4; 
				else if(c == 3) c = 3;
			}else if(elements.i == 2){
				if(c == 1) c = 5;
				else if(c == 2) c = 1;
				else if( c == 3) c = 5;
				else if(c == 2) c = 1;
			}else if(elements.i == 4){
				if(c == 3) c = 4;
				else if(c == 1) c = 3;
			}

			clr = color[c];
					
			const div = document.createElement('div');
			div.style = `background: ${clr};`;
			div.className = `color ${clr} c${j}`;
			copo.append(div);
		}else{
			clr = 'transparent';
			const div = document.createElement('div');
			div.style = `background: ${clr};`;
			div.className = `color ${clr} c${j}`;
			copo.append(div);
		}
	}
	return copo;
}

export default function level_9(){

	const verify = new authMiddleware(9);
    if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{

		localStorage.removeItem('welcome');
		document.title = 'Level 9';
		const colors = ["red", "yellow", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"];
		let n_colors = colors.length; 
		const ninth_level = new Game({colors, level: 9, empty: 1, cupEmptyNumber: n_colors, func: condition});
		localStorage.setItem('level', 9);
	
		return ninth_level.draw_cups();
	}
}

