import Game from "../libs/game";
import { authMiddleware } from "../Middleware/AuthMiddleware";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]

const condition = (elements = {}) =>{

    const copo = document.createElement('div');
	let clr;
	const color = elements.colors;

    if(elements.hasColor) copo.className = `copo copo${elements.i}`;
	else copo.className = `copo copo${elements.i + elements.t}`;

    for(let j = 0; j < 4; j++){
		if(elements.hasColor){
			let c = j;
			if(elements.i == 0){
				if(c == 0) c = 3;
				else if(c == 1) c = 3;
				else if(c == 2) c = 2;
				else if(c == 3) c -= 3;
			}else if(elements.i == 1){
				if(c == 2) c = 1;
				else if(c == 0) c = 2; 
				else if(c == 3) c = 3;
			}else if(elements.i == 2){
				if( c == 3) c = 0;
				else if(c == 3) c -= 1;
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

export default function level_6(){

	const verify = new authMiddleware(6);
    if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{

		localStorage.removeItem('welcome');
		document.title = 'Level 6';
		const colors = ["#f8f408fd", "#f30707fd", "#9e9c0cfd", "#490e1f"];
		let n_colors = colors.length; 
		const sixth_level = new Game({colors, level: 6, empty: 1, cupEmptyNumber: n_colors, func: condition});
		localStorage.setItem('level', 6);
	
		return sixth_level.draw_cups();
	}
}

