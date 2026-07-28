import Game from "../libs/game.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";




const condition = (elements = {}) =>{

    const copo = document.createElement('div');
	let clr;
	const color = elements.colors;

    if(elements.hasColor) copo.className = `copo copo${elements.i}`;
	else copo.className = `copo copo${elements.i + elements.t}`;

	for(let j = 0; j < 4; j++){
		if(elements.hasColor){
			if(elements.i == 0){
				let c = j;
				if(c == 1) c -= 1;
				else if(c == 2) c -= 1;
				else if(c == 3) c -= 2; 
				clr = color[c];
					
			}else{
				let c = j;
				if(c == 0) c += 1;
				else if(c == 2) c -=2;
				else if(c == 3) c -= 3; 
				clr = color[c];
					
			}
					
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


export default function level_2(){

    const verify = new authMiddleware(2);
    if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{
    
    	document.title = 'Level 2';

		const colors = ["yellow", "red"];
    	let n_colors = colors.length; 
    	const second_level = new Game({colors, level: 2, empty: 0, cupEmptyNumber: n_colors, func: condition});
    	
		localStorage.setItem('level', 2);
    
    	return second_level.draw_cups();
	}
}