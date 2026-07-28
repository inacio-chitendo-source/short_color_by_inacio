import Game from "../libs/game.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]



const condiction = (elements = {}) =>{

    const copo = document.createElement('div');
	let clr;
	const color = elements.colors;

    if(elements.hasColor) copo.className = `copo copo${elements.i}`;
	else copo.className = `copo copo${elements.i + elements.t}`;

    for(let j = 0; j < 4; j++){
		if(elements.hasColor){
			let c = j;
			if(elements.i == 0){
				if(c == 0) c = 2;
				if(c == 2) c = 2;
				if(c == 3) c -= 3;
			}else if(elements.i == 1){
				if(c == 2) c = 1;
				if(c == 0) c = 2; 
				if(c == 3) c = 0;
			}else if(elements.i == 2){
				if( c == 3) c = 0;
				if(c == 3) c -= 1;
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

export default function level_4(){
	
	const verify = new authMiddleware(4);
	if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{
	
		localStorage.removeItem('welcome');
		document.title = 'Level 4';
		const colors = ["#8432c7", "#f5f", "#e7c321f5"];
		let n_colors = colors.length; 
		const fourth_level = new Game({colors, level: 4, empty: 1, cupEmptyNumber: n_colors, func: condiction});
		localStorage.setItem('level', 1);
	
		return fourth_level.draw_cups();
	}
}

