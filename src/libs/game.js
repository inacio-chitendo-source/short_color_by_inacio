import 'bootstrap-icons/font/bootstrap-icons.css';
import { routeConfig }  from "../route/router.js";


export default class game{
	constructor(elements = {}) {
		this.colors = elements.colors || [];
		this.conditionLevelColor = elements.func || function(){}; 
		this.level = elements.level || 0;
		this.empty = elements.empty || 0;
		this.cupEmpty = elements.cupEmptyNumber || 12;
		this.path = window.location.pathname;
		this.n_color = this.colors.length - 1;
		this.copos = document.querySelectorAll('.copo');
		this.palco = document.getElementById('palco');
		this.n_copo = this.copos.length - 1;
		this.i, this.j;
	}
	
	//paths of the game
	router(){
		const {component, params} = this.matchRoute(this.path);
		this.palco.innerHTML = '';
		
		if( typeof component.view() == 'object'){
			this.palco.append(component.view());
		}
	}
	
	matchRoute(){
		for(let route in routeConfig){
			if(route.includes(":")){
				const regex = new RegExp("^" + route.replace(/:\w+/g, "(. +)") + "$");
				const match = this.path.match(regex);
				if(match){ 
					return {component: routeConfig[route] || routeConfig["/short_color_by_inacio/"], params: {id:Math.floor(match[1])}};
				}
			}
		}
		return {component: routeConfig[this.path] || routeConfig["/short_color_by_inacio/"], params: {void : 0}};

	}	 

	// Função que muda a URL sem recarregar
	navigateTo(url) {
		history.pushState(null, null, url);
		this.router();
	}
	
	welcome(){
		localStorage.setItem('welcome', true);
		const div = document.createElement('div');
		div.className = 'welcome';
		div.style = `
			width: 100%;
			text-align: center;
		`;
		
		for(let i = 0; i <= 9; i++){
			let lock;
			if(localStorage.getItem('level_'+ i) != null){
				div.innerHTML +=`
					<button class='${i + 1}'>
						<i class='bi bi-unlock-fill'></i>
						</br>
						<label>Level ${i + 1}</label>
					</button>
				`;
			}else{
				lock = "<i class='bi bi-lock-fill'></i>";
				if(i == 0 ){
					lock = "<i class='bi bi-unlock-fill'></i>";
				}
				div.innerHTML +=`
					<button class='${i + 1}'>
						${lock}</br>
						<label>Level ${i + 1}</label>
					</button>
				`; 
			}
		}

		div.querySelectorAll('button').forEach(btn =>{
			
			btn.addEventListener('click', ()=>{
				if((btn.className - 1) == localStorage.getItem(`level_${btn.className - 1}`)){
					this.path = '/short_color_by_inacio/level_'+btn.className;
					this.navigateTo('/short_color_by_inacio/level_'+btn.className);
				}else if(btn.className == 1){
					this.path = '/short_color_by_inacio/level_1';
					this.navigateTo('/short_color_by_inacio/level_1');
				}else{
					alert('precisas passar os niveis anteriores primeiro!')
				}
			});
		});
		
		this.palco.append(div);
		
	}
	
	//create cups of the game each level
	copo(colors, i, level, hasColor = true, t = 12){
   
	switch(level){
		
		case 1:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 2:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 3:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 4:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 5:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 6:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 7:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 8:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 9:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;

		case 10:
			return this.conditionLevelColor({colors, i, hasColor, t});
		break;
	}
	
    return;
	}
	
	draw_cups(){

		//cups with colors
		for(this.i = 0; this.i <= this.n_color; this.i++){
			this.palco.append(this.copo(this.colors, this.i, this.level));
		}

		//cups without colors
		for(this.i = 0; this.i <= this.empty; this.i++){
			this.palco.append(this.copo(this.colors, this.i, this.level, false, this.cupEmpty));
		}

		//function to move the cups and the main function
		this.movement_cups();
	}
	
	//function to move and controlling all cups in this game
	movement_cups(copos){
		
		//function that put cups down when other stands up
		function cups_back(palco, state){
			let c ;
			palco.querySelectorAll('.copo').forEach(cups =>{
				if(cups.style.marginTop.trim() != '' && cups.style.marginTop.trim() != '0px'){
						c = cups;
				}
			});
			
			if( c != undefined && state == true){
				if(c.style.marginTop.slice(0, 3) == '-20'){
					c.style.marginTop = (Math.floor(c.style.marginTop.slice(1, 3)) - 20) + 'px';
				}
			}
		}


		//funcao que verifica se as cores sao iguais ou se o copo esta cheio com a mesma cor e somente depoi permite se move ou nao
		function move(elem1, elem2, segClass, changeColor, arrayColor, arrayColor1, firstClass, i, palco){
			//move para o ultimo elemento
			// i -> index of color
			let element1 = elem1, cups = elem2, second_class = segClass;
			let bgColor1, first_class = firstClass, firstColor = elem1, t = 1800;
			let countFirstCup = 0, countSecondCup = 0;


			firstColor.querySelectorAll('div').forEach(color =>{
				//console.log(color)
				if(color.classList[2] == 'c3'){
				
					if(color.classList[1] == 'transparent'){
					
						let verColorC2 = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
						if(verColorC2 == 'transparent'){
							let verColorC1 = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
							if(verColorC1 == 'transparent'){
								let verColorC0 = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 3)}`).classList[1];
								if(verColorC0 == 'transparent'){
									//faz nada
								}else{
									bgColor1 = verColorC0;
								}	
							}else{
								bgColor1 = verColorC1;
							}
						}else{
							bgColor1 = verColorC2;
						}
					}else{
						bgColor1 = color.classList[1];
					}	
				}
			})
			 
			let array = [];
			element1.querySelectorAll('div').forEach((color, i) =>{
				if(color.classList[1] == bgColor1) {
					array[countFirstCup] = i;
					countFirstCup++;
				};
			});

			elem2.querySelectorAll('div').forEach((color, i) =>{
				if(color.classList[1] == 'transparent') {
					countSecondCup++;
				};
			})

			if(array.length == 3 ){
				if(array.includes(3) && array.includes(2) && array.includes(1)){
					countFirstCup = 3;
				}else if(array.includes(2) && array.includes(1) && array.includes(0)){
					 countFirstCup = 3	
				}else if(array.includes(3) && array.includes(2)){
					countFirstCup = 2;
				}else{
					countFirstCup = 1;
				}
			}else if(array.length == 2){
				if(array[0] > array[1] && array[0] - 1 == array[1]){
					if(array[0] - 1 == array[1]) countFirstCup = 2;
				}else if(array[0] < array[1] && array[1] - 1 == array[0]){
					if(array[1] - 1 == array[0]) countFirstCup = 2;
				}else{
					countFirstCup = 1;
				}
			}else{
				countFirstCup = 1;
			}

			console.log(countFirstCup, countSecondCup)

			if(countSecondCup > 2 && countFirstCup == 3){
				t *= 3;
			}else if(countSecondCup == 2 && countFirstCup == 3){
				t *=2;
			}else if(countSecondCup >= 2 && countFirstCup == 2){
				console.log('aqui')
				t *=2;
			}

			localStorage.setItem('timeUp', t);

			if(arrayColor[i-1] == undefined){
				if(arrayColor1[0] == arrayColor1[1] && arrayColor1[2] == arrayColor1[3] && arrayColor1[0] == arrayColor1[3]){
					cups_back(this.palco, true);
				}else{	
					
					if( window.outerWidth < 800){
						if(second_class == -1 || second_class == 3  || second_class == 7 || second_class == 11){
							
							if(second_class == -1) second_class = 0;
							else if(second_class == 3) second_class = 4;
							else if(second_class == 7) second_class = 8;
							else if(second_class == 11) second_class = 12;
							
							element1.className = `isMoving copo${second_class}`;
							element1.style.marginLeft = '-11.5em';
							element1.style.marginTop = '-5rem';
						
							//CHANGE COLOR AND WATER EFFECT
							changeColor(element1, cups);
						}else{
							
							element1.className = `isMoving copo${second_class}`;
							element1.style.marginLeft = '-5.8em';
							element1.style.marginTop = '-5rem';
						
							//CHANGE COLORS AND WATER EFFECT
							changeColor(element1, cups);
						}
					}else{
						//IF USER CLICK THE FIRST CUPS UP AND DOWN LEFT
						if(second_class == -1 || second_class == 6){

							if(second_class == -1) second_class = 0;
							else second_class = 7;

							element1.className = `isMoving copo${second_class}`;
							element1.style.marginLeft = '-11.5em';
							element1.style.marginTop = '-5rem';
						
							//CHANGE COLOR AND WATER EFFECT
							changeColor(element1, cups);

						}else {

							element1.className = `isMoving copo${second_class}`;
							element1.style.marginLeft = '-5.8em';
							element1.style.marginTop = '-5rem';
						
							//CHANGE COLORS AND WATER EFFECT
							changeColor(element1, cups);
						
						}
					}
					setTimeout(()=>{
						element1.className = first_class;
						element1.style.marginLeft = '';
						element1.style.marginTop = '';
					}, t);
				}

			}else if(bgColor1 == arrayColor[i-1]){
				if( window.outerWidth < 800){
					if(second_class == -1 || second_class == 3  || second_class == 7 || second_class == 11){
						
						if(second_class == -1) second_class = 0;
						else if(second_class == 3) second_class = 4;
						else if(second_class == 7) second_class = 8;
						else if(second_class == 11) second_class = 12;
						console.log(second_class)
						element1.className = `isMoving copo${second_class}`;
						element1.style.marginLeft = '-11.5em';
						element1.style.marginTop = '-5rem';
					
						//CHANGE COLOR AND WATER EFFECT
						changeColor(element1, cups);
					}else{
						
						element1.className = `isMoving copo${second_class}`;
						element1.style.marginLeft = '-5.8em';
						element1.style.marginTop = '-5rem';
						
						//CHANGE COLORS AND WATER EFFECT
						changeColor(element1, cups);
					}
				}else{
					if(second_class == -1 || second_class == 6){
									
						if(second_class == -1) second_class = 0;
						else second_class = 7;

						element1.className = `isMoving copo${second_class}`;
						element1.style.marginLeft = '-11.5em';
						element1.style.marginTop = '-5rem';
					
						//CHANGE COLORS AND WATER EFFECT
						changeColor(element1, cups);
					

					}else{

						element1.className = `isMoving copo${second_class}`;
						element1.style.marginLeft = '-5.8em';
						element1.style.marginTop = '-5rem';

						//CHANGE COLORS AND WATER EFFECT
						changeColor(element1, cups);
					}
				}
				setTimeout(()=>{
					element1.className = first_class;
					element1.style.marginLeft = '';
					element1.style.marginTop = '';
				}, t);
			}else{
				cups_back(palco, true);
			}
		}


		let clickState = false, i = 0, elementCup;
		this.palco.querySelectorAll('.copo').forEach(cups =>{
			
			cups.addEventListener('click', (e)=>{
				elementCup = cups;
				clickState = true;
				i++;
				
				//save the class of the first element clicked 
				if(i == 1){
					localStorage.setItem('elementCup', elementCup.className);
				}
				
				//condiction to know and changing the clickState
				if(i == 2){
					clickState = false;
				}
				 
				if(clickState){
					let arrayColor = [];

					cups.querySelectorAll('div').forEach((clr, i) =>{
						arrayColor[i] = clr.classList[1];
					});

					//filter the cups if it has color or not
					if(arrayColor[0] != 'transparent'){
						if(arrayColor[0] == arrayColor[1] && arrayColor[2] == arrayColor[3] && arrayColor[0] == arrayColor[3]){
							clickState = true;
							i = 0;
						}else{	
									
							if(cups.style.marginTop.slice(0, 3) == '-20'){
								cups_back(this.palco, clickState);
								cups.style.marginTop = (Math.floor(cups.style.marginTop.slice(1, 3)) - 20) + 'px';
							}else{
								if(cups.style.marginTop.slice(0, 1) == '0'){
									cups_back(this.palco, clickState);
									cups.style.marginTop = (Math.floor(cups.style.marginTop.slice(0, 1)) - 20) + 'px';
								}else{
									cups_back(this.palco, clickState);
									cups.style.marginTop = (Math.floor(cups.style.marginTop.slice(0, 2)) - 20) + 'px';
								}
							}
						}
					}else{
						clickState = true;
						i = 0;
					}
				}else{

					//here is where the cups will be moved					
					//let´s make the moving here and putting water down
					if(localStorage.getItem('elementCup') == elementCup.className){
						cups_back(this.palco, true);
						//console.log(elementCup.className);
					}

					//datas of the first element clicked
					let classe = '.'+localStorage.getItem('elementCup').split(' ')[1];
					const element1 = this.palco.querySelector(classe);

					//the main part of moving 
					let first_class = element1.className;
					let second_class = parseInt(cups.classList[1].slice(4, 6) - 1);
					let arrayColorCup2 = [], arrayColorCup1 = [];

					elementCup.querySelectorAll('div').forEach((clr, i) =>{
						arrayColorCup2[i] = clr.classList[1];
					});

					element1.querySelectorAll('div').forEach((clr, i) =>{
						arrayColorCup1[i] = clr.classList[1];
					});
					
					//moving cups
					if(localStorage.getItem('elementCup') != elementCup.className){
						if(arrayColorCup2[3] == 'transparent'){
							if(arrayColorCup2[2] == 'transparent'){
								if(arrayColorCup2[1] == 'transparent'){
									if(arrayColorCup2[0] == 'transparent'){
										if(arrayColorCup1[0] == arrayColorCup1[1] && arrayColorCup1[2] == arrayColorCup1[3] && arrayColorCup1[0] == arrayColorCup1[3]) cups_back(this.palco, true);	
										else move(element1, cups, second_class, this.changeColor, arrayColorCup2, arrayColorCup1, first_class, 0, this.palco);
										this.win();
									}else{
										if(arrayColorCup1[0] == arrayColorCup1[1] && arrayColorCup1[2] == arrayColorCup1[3] && arrayColorCup1[0] == arrayColorCup1[3]) cups_back(this.palco, true);	
										else move(element1, cups, second_class, this.changeColor, arrayColorCup2, arrayColorCup1, first_class, 1, this.palco);
										this.win();
									}
								}else{
									if(arrayColorCup1[0] == arrayColorCup1[1] && arrayColorCup1[2] == arrayColorCup1[3] && arrayColorCup1[0] == arrayColorCup1[3]) cups(this.palco, true)
									else move(element1, cups, second_class, this.changeColor, arrayColorCup2, arrayColorCup1, first_class, 2, this.palco);	
									this.win();
								}
							}else{
								if(arrayColorCup1[0] == arrayColorCup1[1] && arrayColorCup1[2] == arrayColorCup1[3] && arrayColorCup1[0] == arrayColorCup1[3]) cups(this.palco, true)
								else move(element1, cups, second_class, this.changeColor, arrayColorCup2, arrayColorCup1, first_class, 3, this.palco);
								this.win();
							}
						}else{
							cups_back(this.palco, true);
						}
					}
				}

				//controlling clicks for just 2 clicks accepted
				if(i == 2){
					i = 0;
				}
			});
		})
	}

	// function que vai alterar as cores dos copos
	changeColor(firstColor, secondColor){

		function effectWater(element, color, n_cup, c){    
			
			if(n_cup == 1){
        	
			//effect about the first cup
        	let bgColor2 = color;
			const colorFirstCup = firstColor.querySelector(`.c${c}`);
			
			let counter = 0, i = 0, t = 0, arraySameColor = [], transparent = -1;
			
			for(i = c; i >= 0; i--){
				//quantas cores iguais
				// t -> retorna o index da ultima cor
				//counter -> conta o total das cores iguais

				if(colorFirstCup.classList[1] == element.querySelector(`.c${i}`).classList[1]){
					arraySameColor[counter] = element.querySelector(`.c${i}`).className;
					counter++;
					t = i;
				}
			}

			secondColor.querySelectorAll('div').forEach(color =>{
				if(color.classList[1] == 'transparent') transparent++;
			});

			if(arraySameColor.length - 1 == 2){

				if(c - 2 == t && arraySameColor[1].split(' ')[1] == colorFirstCup.classList[1] && transparent > 1 ){
					//3 cores iguais e 3 ou 4 espaços vazios
					let color2 = firstColor.querySelector(`.c${c - 1}`);
					const color3 = firstColor.querySelector(`.c${c - 2}`);
					localStorage.setItem('n_color_iguais', 3);

					colorFirstCup.className = `color ${bgColor2} c${c}`;
					color2.className = `color ${bgColor2} c${c - 1}`;
					color3.className = `color ${bgColor2} c${c - 2}`;
					
					//effect bow in the first cup
					colorFirstCup.style =` 
						background: transparent; 
						border-left:3.8em solid ${bgColor1}; 
						border-top:3.8em solid transparent;`
					;

					setTimeout(()=>{
						colorFirstCup.style = '';
						colorFirstCup.style.background = bgColor2;
						color2.style.background = bgColor2;
						color3.style.background = bgColor2;
					}, 1800 * 3);
					return;
					//console.log(colorFirstCup, color2, color3)
				}else if(c - 2 == t && arraySameColor[1].split(' ')[1] == colorFirstCup.classList[1] && transparent == 1 ){
					//3 cores iguais e 2 espaços vazios
					const color2 = firstColor.querySelector(`.c${c - 1}`);
					localStorage.setItem('n_color_iguais', 3);

					colorFirstCup.className = `color ${bgColor2} c${c}`;
					color2.className = `color ${bgColor2} c${c - 1}`;
					
					//effect bow in the first cup
					colorFirstCup.style =` 
						background: transparent; 
						border-left:3.8em solid ${bgColor1}; 
						border-top:3.8em solid transparent;`
					;

					setTimeout(()=>{
						colorFirstCup.style = '';
						colorFirstCup.style.background = bgColor2;
						color2.style.background = bgColor2;
					}, 1800 * 2);
					return;
				
				}
			
			}else if(c -1 == t && transparent >= 1 ){
				//console.log('as duas cores que se seguem sao iguais e 2 ou + 2 vaz');
				const color2 = firstColor.querySelector(`.c${c - 1}`);
				localStorage.setItem('n_color_iguais', 2);

				colorFirstCup.className = `color ${bgColor2} c${c}`;
				color2.className = `color ${bgColor2} c${c - 1}`;
					
					//effect bow in the first cup
					colorFirstCup.style =` 
						background: transparent; 
						border-left:3.8em solid ${bgColor1}; 
						border-top:3.8em solid transparent;`
					;

					setTimeout(()=>{
						colorFirstCup.style = '';
						colorFirstCup.style.background = bgColor2;
						color2.style.background = bgColor2;
					}, 1800 * 2);
					return;
			
			}
			
			localStorage.setItem('n_color_iguais', 1);
			colorFirstCup.className = `color ${bgColor2} c${c}`;
			
			//effect bow in the first cup
			colorFirstCup.style =` 
				background: transparent; 
				border-left:3.8em solid ${bgColor1}; 
				border-top:3.8em solid transparent;`
			;

			setTimeout(()=>{
				colorFirstCup.style = '';
				colorFirstCup.style.background = bgColor2;
			}, 1800);
			return;

    	
		}else if(n_cup == 2){

        	// effect about the second cup
        	let bgColor1 = color;
			const colorSecondCup = secondColor.querySelector(`.c${c}`);
			

			let counter = 0, i = 0; 
			let sameColor = Number(localStorage.getItem('n_color_iguais'));
			
			for(i = c; i <= 3; i++){
				//quantas cores iguais
				// t -> retorna o index da ultima cor
				//counter -> conta o total das cores iguais

				if(secondColor.querySelector(`.c${i}`).classList[1] == 'transparent'){
					counter++;
				}
				
			}

			
			localStorage.setItem('emptyCup', counter);
			//console.log(counter, sameColor);

			if(sameColor == 3 && counter > 2){
				//tres cores iguais e 3 ou mais vazios
				const color2 = secondColor.querySelector(`.c${c + 1}`);
				const color3 = secondColor.querySelector(`.c${c + 2}`);
				console.log('aqui')
				colorSecondCup.className = `color ${bgColor1} c${c}`;
				color2.className = `color ${bgColor1} c${c + 1}`;
				color3.className = `color ${bgColor1} c${c + 2}`; 

				let n = 0, j = 0, h = 13.5;
				if(c == 1){
					j = 3;
					h = h - 3;
				}else if(c == 2){
					j = 6;
					h = h - 6;
				}else if(c == 3){
					j = 9;
					h = h - 9;
				}
			
				//draw the vertical line of the color
				secondColor.querySelector(`.c${c + 1}`).style = `
					position: absolute;
					background: ${bgColor1}; 
					width: .2em; 
					height: ${h}em;
					margin-left: -25px;
					margin-bottom: ${j}rem; 
					border-top: 10%;`
				;
			
				const defColor = setInterval(()=>{
					//if(){}
	        		//create the moving of the color when is getting in
		    		colorSecondCup.style = ` 
						background: transparent; 
						border-bottom:${n / 10}em solid ${bgColor1};`
					;
		    		

					n++;
		    		if(n == (3 * 30)) {
						//clean the interval
			    		clearInterval(defColor)
			    	
						//clean the effect of water 
						secondColor.querySelector(`.c${c+1}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: em;
							margin-left: ;
							margin-bottom: 0; 
							border-top: 0;`
						;

						secondColor.querySelector(`.c${c}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: em;
							margin-left: ;
							margin-bottom: 0; 
							border-top: 0;`
						;
						

						//change the classes of the both cups cup 1 and cup 2 their classes and their colors
			    		color2.style.background = bgColor1
						color3.style.background = bgColor1
						colorSecondCup.style.background = bgColor1;
		    		};
					
	    		}, (600 / 10 ));
				return;

			}else if(sameColor == 3 && counter == 2 ){
				//tres cores iguais e 2 vazios
				const color2 = secondColor.querySelector(`.c${c + 1}`);

				colorSecondCup.className = `color ${bgColor1} c${c}`;
				color2.className = `color ${bgColor1} c${c + 1}`; 

				let n = 0, j = 0, h = 13.5;
				if(c == 1){
					j = 3;
					h = h - 3;
				}else if(c == 2){
					j = 6;
					h = h - 6;
				}else if(c == 3){
					j = 9;
					h = h - 9;
				}
			
				//draw the vertical line of the color
				secondColor.querySelector(`.c${c + 1}`).style = `
					position: absolute;
					background: ${bgColor1}; 
					width: .2em; 
					height: ${h}em;
					margin-left: -25px;
					margin-bottom: ${j}rem; 
					border-top: 10%;`
				;
			
				const defColor = setInterval(()=>{
					//if(){}
	        		//create the moving of the color when is getting in
		    		colorSecondCup.style = ` 
						background: transparent; 
						border-bottom:${n / 10}em solid ${bgColor1};`
					;
		    		

					n++;
		    		if(n == (3 * 20)) {
						//clean the interval
			    		clearInterval(defColor)
			    	
						//clean the effect of water 
						secondColor.querySelector(`.c${c+1}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: em;
							margin-left: ;
							margin-bottom: 0; 
							border-top: 0;`
						;

						secondColor.querySelector(`.c${c}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: em;
							margin-left: ;
							margin-bottom: 0; 
							border-top: 0;`
						;
						

						//change the classes of the both cups cup 1 and cup 2 their classes and their colors
			    		color2.style.background = bgColor1
						colorSecondCup.style.background = bgColor1;
		    		};
					
	    		}, (600 / 10 ));
				return;

			}else if(sameColor == 2 && counter >= 2){
				//duas cores iguais
				const color2 = secondColor.querySelector(`.c${c + 1}`);

				colorSecondCup.className = `color ${bgColor1} c${c}`;
				color2.className = `color ${bgColor1} c${c + 1}`; 

				let n = 0, j = 0, h = 13.5;
				if(c == 1){
					j = 3;
					h = h - 3;
				}else if(c == 2){
					j = 6;
					h = h - 6;
				}else if(c == 3){
					j = 9;
					h = h - 9;
				}
			
				//draw the vertical line of the color
				secondColor.querySelector(`.c${c + 1}`).style = `
					position: absolute;
					background: ${bgColor1}; 
					width: .2em; 
					height: ${h}em;
					margin-left: -25px;
					margin-bottom: ${j}rem; 
					border-top: 10%;`
				;
			
				const defColor = setInterval(()=>{
					//if(){}
	        		//create the moving of the color when is getting in
		    		colorSecondCup.style = ` 
						background: transparent; 
						border-bottom:${n / 10}em solid ${bgColor1};`
					;
		    		

					n++;
		    		if(n == (3 * 20)) {
						//clean the interval
			    		clearInterval(defColor)
			    	
						//clean the effect of water 
						secondColor.querySelector(`.c${c+1}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: em;
							margin-left: ;
							margin-bottom: 0; 
							border-top: 0;`
						;

						secondColor.querySelector(`.c${c}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: em;
							margin-left: ;
							margin-bottom: 0; 
							border-top: 0;`
						;
						

						//change the classes of the both cups cup 1 and cup 2 their classes and their colors
			    		color2.style.background = bgColor1
						colorSecondCup.style.background = bgColor1;
		    		};
					
	    		}, (600 / 10 ));
				return;
			}
			colorSecondCup.className = `color ${bgColor1} c${c}`;
			//=============================================================
			//n -> controller of setInterval
			// c -> index of the color like c0 c1 c2 c3
			// h -> hight of the water line
			//j -> hight of the each div's color
			//=============================================================
        	let n = 0, j = 0, h = 13.5;
			if(c == 1){
				j = 3;
				h = h - 3;
			}else if(c == 2){
				j = 6;
				h = h - 6;
			}else if(c == 3){
				j = 9;
				h = h - 9;
			}
			
			//draw the vertical line of the color
			if(c != 3) secondColor.querySelector(`.c${c + 1}`).style = `
				position: absolute;
				background: ${bgColor1}; 
				width: .2em; 
				height: ${h}em;
				margin-left: -25px;
				margin-bottom: ${j}rem; 
				border-top: 10%;`
			;
	    	else secondColor.querySelector(`.c${c}`).style = `
				position: absolute;
				background: ${bgColor1}; 
				width: .2em; 
				height: ${h}em;
				margin-left: -25px;
				margin-bottom: ${j}rem; 
				border-top: 10%;`
			;
	    	
			
			const defColor = setInterval(()=>{
				
	        	//create the moving of the color when is getting in
		    	if(c != 3) secondColor.querySelector(`.c${c}`).style = ` 
					background: transparent; 
					border-bottom:${n / 10}em solid ${bgColor1};`
				;
		    	else secondColor.querySelector(`.c${c - 1}`).style = ` 
					position: absolute;
					margin-bottom: ${j - 3}em;
					background: ${bgColor1}; 
					height: ${3 + (n / 10)}em;`
				;

				n++;
		    	if(n == (3 * 10)) {
					//clean the interval
			    	clearInterval(defColor)
			    	
					//clean the effect of water
					if(c != 3){ 
						secondColor.querySelector(`.c${c+1}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: em;
							margin-left: ;
							margin-bottom: 0; 
							border-top: 0;`
						;
					}else{ 
						secondColor.querySelector(`.c${c}`).style = `
							position: ;
							background: ; 
							width: em; 
							height: ;
							margin-left: ;
							margin-bottom: ; 
							border-top: ;`
						;
						secondColor.querySelector(`.c${c - 1}`).style = `
							position: ;
							background: ${bgColor1} ; 
							width: em; 
							height: 3em;
							margin-left: ;
							margin-bottom: ; 
							border-top: ;`
						;
					}

					//change the classes of the both cups cup 1 and cup 2 their classes and their colors
			    	secondColor.querySelector(`.c${c}`).style.background = bgColor1;
		    	};
	    	}, (600 / 10 ));
			return;
    	}
	}

		let bgColor1, bgColor2, position1, position2;
		 
		firstColor.querySelectorAll('div').forEach(color =>{
			//console.log(color)
			if(color.classList[2] == 'c3'){
				
				if(color.classList[1] == 'transparent'){
					
					let verColorC2 = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
					if(verColorC2 == 'transparent'){
						let verColorC1 = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
						if(verColorC1 == 'transparent'){
							let verColorC0 = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 3)}`).classList[1];
							if(verColorC0 == 'transparent'){
								//faz nada
							}else{
								bgColor1 = verColorC0;
							}	
						}else{
							bgColor1 = verColorC1;
						}
					}else{
						bgColor1 = verColorC2;
					}
				}else{
					bgColor1 = color.classList[1];
				}	
			}
		})

		secondColor.querySelectorAll('div').forEach(color =>{
			if(color.classList[2] == 'c3'){
				bgColor2 = color.classList[1];
			}
			if(color.classList[2] == 'c3'){
				
				if(color.classList[1] == 'transparent'){
				}else{

					let verColor = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
					let verColorAfter = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
					if(verColor == 'transparent' && verColorAfter != 'transparent'){
						bgColor2 = verColorAfter;
					}else{

						let verColor = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
						let verColorAfter = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 3)}`).classList[1];
						if(verColor == 'transparent' && verColorAfter != 'transparent'){
							bgColor2 = verColorAfter;
						}else{
						
							let verColor = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 3)) - 2)}`).classList[1];
							if(verColor != 'transparent'){
								bgColor2 = verColor;
							}
						}
					}
					bgColor2 = color.classList[1];
				}	
			}
		})

		firstColor.querySelectorAll('div').forEach(color =>{
			
			if(color.classList[2] == 'c3' && bgColor2 == 'transparent' && bgColor1 != 'transparent'){
				
				let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 0)}`).classList[1];
				
				if(verColor == 'transparent'){
					let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
					
					if(verColor == 'transparent'){
						let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
						
						if(verColor == 'transparent'){
							let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 3)}`).classList[1];
					
							if(verColor != 'transparent'){
								//effect water first cup
								effectWater(firstColor, bgColor2, 1, 0);
							}	
													
						}else if(verColor != 'transparent'){
							//effect water first cup
							effectWater(firstColor, bgColor2, 1, 1);
						}	

					}else if(verColor != 'transparent'){
						//effect water first cup
						effectWater(firstColor, bgColor2, 1, 2);
				
					}
				
				}else if(verColor != 'transparent'){
					//effect water first cup
					effectWater(firstColor, bgColor2, 1, 3);
				}
			}
		})

		secondColor.querySelectorAll('div').forEach(color =>{
			
			if(color.classList[2] == 'c3' && bgColor2 == 'transparent' && bgColor1 != 'transparent'){
				
				let verColor = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 3)}`).classList[1];
				let verColorBefore = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
				if(bgColor1 == verColor && verColorBefore == 'transparent'){
					//efeito tipo agua
					effectWater(secondColor, bgColor1, 2, 1);
				}else if(verColor == 'transparent' && verColorBefore == 'transparent'){
					//efeito tipo agua
					effectWater(secondColor, bgColor1, 2, 0);
					
				}else{

					let verColor = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
					let verColorBefore = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
					if(bgColor1 == verColor && verColorBefore == 'transparent'){
						
						//efeito tipo agua
						effectWater(secondColor, bgColor1, 2, 2);
					
					}else if(verColor == 'transparent' && verColorBefore == 'transparent'){
						
						//efffect water
						effectWater(secondColor, bgColor1, 2, 1);
					
					}else{

						let verColor = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
						let verColorBefore = secondColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 0)}`).classList[1];
						if(bgColor1 == verColor && verColorBefore == 'transparent'){
							
							//effect water
							effectWater(secondColor, bgColor1, 2, 3);

						}else if(verColor == 'transparent' && verColorBefore == 'transparent'){
							
							//effect water
							effectWater(secondColor, bgColor1, 2, 2);

						}else{
							if(color.classList[1] == 'transparent'){
								color.className = `color ${bgColor1} c2`;
								color.style.background = bgColor1;
							}
						}
					}
				}
			}
		})
	}

	gameOver(){
		
	}
	
	win(){
		let verify = false, arrayColor = [], contador = 0;
		const n_cups = this.colors.length - 1;
		

		this.palco.querySelectorAll('.copo').forEach((copo, index) =>{
			//console.log(copo);
			copo.querySelectorAll('div').forEach((color, i)=>{
				arrayColor[i] = color.classList[1];
				//console.log(arrayColor)
			})
			if(arrayColor[0] == arrayColor[1] && arrayColor[2] == arrayColor[3] && arrayColor[0] == arrayColor[3] && arrayColor[0] != 'transparent'){
				verify = true;
				contador++;
				//console.log(verify, contador, n_cups, this.level)
			}						
		})
		
		if(verify == true && contador > n_cups){
			localStorage.setItem(`level_${this.level}`, this.level);
			setTimeout(()=>{
				console.log('voce ganhou o nivel '+this.level);
				const div = document.createElement('div');
				div.className = 'winner';
				div.style = `
					display: flex;
					position: fixed;
					background: ;
					width: 100%;
					padding: .8rem;
					align-items: center;
					justify-content: center;
					z-index: 100000;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				`;

				div.innerHTML +=`
					<button>Jogar Nivel ${this.level + 1}</button>
				`;
				const btn = div.querySelector('button');
				btn.style = `
					background: green;
					height: 4em;
					width: 100%;
					border-radius: 1.5rem;
					text-align: center;
					color: #fff;
					font-size: 2rem;
				`;
			
				btn.addEventListener('click', ()=>{
					this.path = `/short_color_by_inacio/level_${this.level + 1}`;
					this.navigateTo(`/short_color_by_inacio/level_${this.level + 1}`)
				})
				this.palco.append(div);
			}, Number(localStorage.getItem('timeUp')) + 200)
		}
	}
}