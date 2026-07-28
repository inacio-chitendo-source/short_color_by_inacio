import Game from "../libs/game.js";

//["yellow", "red", "pink", "green", "blue", "orange", "gray", "brown", "#000", "#8432c7", "#f5f", "#e7c321f5"]

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
				if(c == 1) c -= 0;
				else if(c == 2) c -= 1;
				else if(c == 3) c -= 2; 
				clr = color[c];
					
			}else{
				let c = j;
				if(c == 0) c += 1;
				else if(c == 1) c -=1; 
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


export default function level_1(){

	document.title = 'Level 1';
	localStorage.removeItem('welcome');
	
	const colors = ["#000", "brown"];
	let n_colors = colors.length;
	const first_level = new Game({colors, level: 1, empty: 0, cupEmptyNumber: n_colors, func: condition});
	
	localStorage.setItem('level', 1);
		
	return first_level.draw_cups();
}

