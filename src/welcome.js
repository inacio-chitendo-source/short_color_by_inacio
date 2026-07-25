import Game from "./libs/game.js";

export default function welcome(){
	const game = new Game();
	if(localStorage.getItem('welcome') == 'true'){
		
		game.palco.innerHTML = '';
		game.welcome();

	}else{

		const div = document.createElement('div');
		div.className = 'welcome';
		div.style = `
			width: 100%;
			//text-align: center;
		`;
		
		div.innerHTML +=`
			<div class='def menu-top'>
				<div>a</div>
				<div>b</div>
			</div>
			<div align='center'>
				<h1>Short Color by Inácio</h1>
				<button>Iniciar</button>
			</div>
		`;
		div.querySelector('button').addEventListener('click', ()=>{
			game.palco.innerHTML = '';
			//game.path = '/level_1';
			//game.navigateTo('/level_1');
			game.welcome();
		});
		return div;
	}
}

