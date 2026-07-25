import { routeConfig } from "../routas_js/route";
import { loader } from "../components/loading"
import { theme } from "../styles/most";
import { authMiddleware, payload } from "../Middleware/AuthMiddleware";

 	

let states = [], stateIndex = 0;
	
export function useState(initial){
	const i = stateIndex;
	states[i] = states[i] ?? initial;
	
	const setState = val =>{
		states[i] = typeof val === "function" ? val(states[i]) : val;
		router();
	};
	stateIndex++;
	return [states[i], setState];
}
	
let effects = [];
export function useEffect(callback, deps){
	const i = stateIndex;
	const hasChanged = !effects[i] || !deps || deps.some((d, j) => d !== effects[i][1][j]);
		
	if(hasChanged){
		setTimeout(callback, 0);
		effects[i] = [callback, deps];
	}
	stateIndex++;
}

let refs = [];
export function useRef(initial){
	const i = stateIndex;
	refs[i] = refs[i] || { current: initial};
	stateIndex++;
	return refs[i];
}


export function router() {
	authMiddleware();
	stateIndex = 0;
	const path = window.location.pathname;
	const {component, params} = matchRoute(path);
	theme();
	document.getElementById("app").innerHTML = '';
	if( typeof component.view() == 'object'){
		document.getElementById("app").append(component.view(params));	
	}
}

function matchRoute(path){
	for(let route in routeConfig){
		if(route.includes(":")){
			const regex = new RegExp("^" + route.replace(/:\w+/g, "(.+)") + "$");
			const match = path.match(regex);
			if(match){ 
				return {component: routeConfig[route] || routeConfig["/NotFound"], params: {id:Math.floor(match[1])}};
			}
		}
	}
	return {component: routeConfig[path] || routeConfig["/NotFound"], params: {void : 0}};

} 

// Função que muda a URL sem recarregar
export function navigateTo(url) {
	history.pushState(null, null, url);
	router();
}

// Intercepta cliques em links com data-link
document.addEventListener('click', e =>{	
	if(e.target.className == 'bi bi-arrow-left'){
		e.preventDefault();
		history.back();
	}
	if(e.target.className.includes('page')){
		navigateTo(e.target.id);
	}
	const Link = e.target.closest("[data-link]");
	if(Link){
		e.preventDefault();
		navigateTo(Link.href);
	}
});

// Quando o usuário usa os botões "voltar" ou "avançar"
window.addEventListener("popstate",router);
