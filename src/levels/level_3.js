import Game from "../libs/game.js";
import { authMiddleware } from "../Middleware/AuthMiddleware.js";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]


//structurs of all colors in this level
const condiction = (elements = {}) =>{

    const copo = document.createElement('div');
	let clr;
	const color = elements.colors;

    if(elements.hasColor) copo.className = `copo copo${elements.i}`;
	else copo.className = `copo copo${elements.i + elements.t}`;

    for(let j = 0; j < 4; j++){
		if(elements.hasColor){
			let c = j;
			if(c == 2) c -= 2;
			else if(c == 3) c -= 2; 
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


export default function level_3(){

    const verify = new authMiddleware(3);
    if(verify.onlyIfPassedLastLevel() == false){
        history.back();
    }else{

        localStorage.removeItem('welcome');
        document.title = 'Level 3';
        const colors = ["orange", "gray"];
        let n_colors = colors.length; 
        const third_level = new Game({colors, level: 3, empty: 0, cupEmptyNumber: n_colors, func: condiction});
        localStorage.setItem('level', 3);
        
        return third_level.draw_cups();
    }
}
