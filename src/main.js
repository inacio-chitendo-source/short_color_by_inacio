import Game from "./libs/game";
import 'bootstrap-icons/font/bootstrap-icons.css';


const app = () =>{
	const game = new Game();
	return game.router();
}

window.addEventListener("DOMContentLoaded", app);
// Quando o usuário usa os botões "voltar" ou "avançar"
window.addEventListener("popstate",app);


