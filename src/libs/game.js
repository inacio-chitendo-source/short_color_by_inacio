import 'bootstrap-icons/font/bootstrap-icons.css';
import { routeConfig }  from "../route/router.js";


export default class game{
	constructor(elements = {}) {
		this.colors = elements.colors || [];
		this.conditionLevel = elements.func || function(){}; 
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
		document.getElementById("palco").innerHTML = '';
		
		if( typeof component.view() == 'object'){
			document.getElementById("palco").append(component.view());
		}
	}
	
	matchRoute(){
		for(let route in routeConfig){
			if(route.includes(":")){
				const regex = new RegExp("^" + route.replace(/:\w+/g, "(.+)") + "$");
				const match = this.path.match(regex);
				if(match){ 
					return {component: routeConfig[route] || routeConfig["/"], params: {id:Math.floor(match[1])}};
				}
			}
		}
		return {component: routeConfig[this.path] || routeConfig["/"], params: {void : 0}};

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
					this.path = '/level_'+btn.className;
					this.navigateTo('/level_'+btn.className);
				}else if(btn.className == 1){
					this.path = '/level_1';
					this.navigateTo('/level_1');
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
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 2:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 3:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 4:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 5:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 6:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 7:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 8:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 9:
			return this.conditionLevel({colors, i, hasColor, t});
		break;

		case 10:
			return this.conditionLevel({colors, i, hasColor, t});
		break;
	}
	
    return copo;
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
			let element1 = elem1, cups = elem2, second_class = segClass;
			let bgColor1, first_class = firstClass, firstColor = elem1, t = 600;


			firstColor.querySelectorAll('div').forEach(color =>{
			//console.log(color)
			if(color.classList[2] == 'c3'){
				
				if(color.classList[1] == 'transparent'){
					
					let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
					if(verColor == 'transparent'){
						let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
						if(verColor == 'transparent'){
							let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 3)}`).classList[1];
							if(verColor == 'transparent'){
								//faz nada
							}else{
								bgColor1 = verColor;
							}	
						}else{
							bgColor1 = verColor;
						}
					}else{
						bgColor1 = verColor;
					}
				}else{
					bgColor1 = color.classList[1];
				}	
			}
		})

			if(arrayColor[i-1] == undefined){
				if(arrayColor1[0].split(' ')[1] == arrayColor1[1].split(' ')[1] && arrayColor1[2].split(' ')[1] == arrayColor1[3].split(' ')[1] && arrayColor1[0].split(' ')[1] == arrayColor1[3].split(' ')[1]){
					cups_back(this.palco, true)
				}else{	
								
					if(second_class == -1 || second_class == 6){

						if(second_class == -1) second_class = 0;
						else second_class = 7;

						element1.className = `isMoving copo${second_class}`;
						element1.style.marginLeft = '-10.8em';
						element1.style.marginTop = '-5rem';
						//criar efeito agua escorrendo
						changeColor(element1, cups);

					}else{

						element1.className = `isMoving copo${second_class}`;
						element1.style.marginLeft = '-5.8em';
						element1.style.marginTop = '-5rem';
						//criar efeito agua escorrendo
						changeColor(element1, cups);
						
					}
					setTimeout(()=>{
						element1.className = first_class;
						element1.style.marginLeft = '';
						element1.style.marginTop = '';
					}, 3000);
				}
			}else if(bgColor1 == arrayColor[i-1].split(' ')[1]){
				if(second_class == -1 || second_class == 6){
									
					if(second_class == -1) second_class = 0;
					else second_class = 7;

					element1.className = `isMoving copo${second_class}`;
					element1.style.marginLeft = '-10.8em';
					element1.style.marginTop = '-5rem';
					//criar efeito agua escorrendo
						changeColor(element1, cups);
					

				}else{

					element1.className = `isMoving copo${second_class}`;
					element1.style.marginLeft = '-5.8em';
					element1.style.marginTop = '-5rem';
					//criar efeito agua escorrendo
						changeColor(element1, cups);
				}
				setTimeout(()=>{
					element1.className = first_class;
					element1.style.marginLeft = '';
					element1.style.marginTop = '';
				}, 3000);
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
				
				//condiction to know and changing about the clickState
				if(i == 2){
					clickState = false;
				}
				 
				if(clickState){
					let arrayColor = [];

					cups.querySelectorAll('div').forEach((clr, i) =>{
						arrayColor[i] = clr.className;
					})

					if(arrayColor[0].split(' ')[1] != 'transparent'){
						if(arrayColor[0].split(' ')[1] == arrayColor[1].split(' ')[1] && arrayColor[2].split(' ')[1] == arrayColor[3].split(' ')[1] && arrayColor[0].split(' ')[1] == arrayColor[3].split(' ')[1]){
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
					let classe = localStorage.getItem('elementCup');
					const element1 = this.palco.querySelector('.'+classe.split(' ')[1]);

					//the main part of moving 
					let first_class = element1.className;
					let second_class = parseInt(cups.classList[1].slice(4, 6) - 1);
					let arrayColor = [], arrayColor1 = [];

					elementCup.querySelectorAll('div').forEach((clr, i) =>{
						arrayColor[i] = clr.className;
					});

					element1.querySelectorAll('div').forEach((clr, i) =>{
						arrayColor1[i] = clr.className;
					});
					
					//moving cups
					if(localStorage.getItem('elementCup') != elementCup.className){
						if(arrayColor[3].split(' ')[1] == 'transparent'){
							if(arrayColor[2].split(' ')[1] == 'transparent'){
								if(arrayColor[1].split(' ')[1] == 'transparent'){
									if(arrayColor[0].split(' ')[1] == 'transparent'){
										if(arrayColor1[0].split(' ')[1] == arrayColor1[1].split(' ')[1] && arrayColor1[2].split(' ')[1] == arrayColor1[3].split(' ')[1] && arrayColor1[0].split(' ')[1] == arrayColor1[3].split(' ')[1]) cups_back(this.palco, true);	
										else move(element1, cups, second_class, this.changeColor, arrayColor, arrayColor1, first_class, 0, this.palco);
									}else{
										if(arrayColor1[0].split(' ')[1] == arrayColor1[1].split(' ')[1] && arrayColor1[2].split(' ')[1] == arrayColor1[3].split(' ')[1] && arrayColor1[0].split(' ')[1] == arrayColor1[3].split(' ')[1]) cups_back(this.palco, true);	
										else move(element1, cups, second_class, this.changeColor, arrayColor, arrayColor1, first_class, 1, this.palco);
									}
								}else{
									if(arrayColor1[0].split(' ')[1] == arrayColor1[1].split(' ')[1] && arrayColor1[2].split(' ')[1] == arrayColor1[3].split(' ')[1] && arrayColor1[0].split(' ')[1] == arrayColor1[3].split(' ')[1]) cups_back(this.palco, true);	
									else move(element1, cups, second_class, this.changeColor, arrayColor, arrayColor1, first_class, 2, this.palco);	
								}
							}else{
								if(arrayColor1[0].split(' ')[1] == arrayColor1[1].split(' ')[1] && arrayColor1[2].split(' ')[1] == arrayColor1[3].split(' ')[1] && arrayColor1[0].split(' ')[1] == arrayColor1[3].split(' ')[1]) cups_back(this.palco, true);	
								else move(element1, cups, second_class, this.changeColor, arrayColor, arrayColor1, first_class, 3, this.palco);
								this.win();
							}
						}else{
							cups_back(this.palco, true);
						}
					}
				}

				//controlling clicks for just 2 clicks accepts
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
        	firstColor = element;
        	bgColor2 = color;

			//effect bow in the first cup
			firstColor.querySelector(`.c${c}`).style =` 
				background: transparent; 
				border-left:3.8em solid ${bgColor1}; 
				border-top:3.8em solid transparent;`
			;

			setTimeout(()=>{
				firstColor.querySelector(`.c${c}`).style = '';
				firstColor.querySelector(`.c${c}`).className = `color ${bgColor2} c${c}`;
				firstColor.querySelector(`.c${c}`).style.background = bgColor2;
			}, 3000);
			return;

    	}else if(n_cup == 2){

        	// effect about the second cup
        	secondColor = element;
        	bgColor1 = color;
        
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
				//if(){}
	        	//create the moving of the color when is getting in
		    	if(c != 3) secondColor.querySelector(`.c${c}`).style = ` 
					background: transparent; 
					border-bottom:${n / 100}em solid ${bgColor1};`
				;
		    	else secondColor.querySelector(`.c${c - 1}`).style = ` 
					position: absolute;
					margin-bottom: ${j - 3}em;
					background: ${bgColor1}; 
					height: ${3 + (n / 100)}em;`
				;

				n++;
		    	if(n == (3 * 100)) {
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
					secondColor.querySelector(`.c${c}`).className = `color ${bgColor1} c${c}`;
			    	secondColor.querySelector(`.c${c}`).style.background = bgColor1;
		    	};
	    	}, (1000 / 100 ));
			return;
    	}
	}

		let bgColor1, bgColor2, position1, position2;
		 
		firstColor.querySelectorAll('div').forEach(color =>{
			//console.log(color)
			if(color.classList[2] == 'c3'){
				
				if(color.classList[1] == 'transparent'){
					
					let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 1)}`).classList[1];
					if(verColor == 'transparent'){
						let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 2)}`).classList[1];
						if(verColor == 'transparent'){
							let verColor = firstColor.querySelector(`.c${(parseInt(color.classList[2].slice(1, 2)) - 3)}`).classList[1];
							if(verColor == 'transparent'){
								//faz nada
							}else{
								bgColor1 = verColor;
							}	
						}else{
							bgColor1 = verColor;
						}
					}else{
						bgColor1 = verColor;
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
			
			copo.querySelectorAll('div').forEach((color, i)=>{
				arrayColor[i] = color.className;
				//console.log(arrayColor)
			})
			if(arrayColor[0].split(' ')[1] == arrayColor[1].split(' ')[1] && arrayColor[2].split(' ')[1] == arrayColor[3].split(' ')[1] && arrayColor[0].split(' ')[1] == arrayColor[3].split(' ')[1] && arrayColor[0].split(' ')[1] != 'transparent'){
				verify = true;
				contador++;
				console.log(verify, contador, n_cups, this.level)
			}						
		})
		
		if(verify == true && contador == n_cups){
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
					this.path = `/level_${this.level + 1}`;
					this.navigateTo(`/level_${this.level + 1}`)
				})
				this.palco.append(div);
			}, 3200)
		}
	}
}