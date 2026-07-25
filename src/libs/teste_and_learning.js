const myElement = document.getElementById('m');

myElement.addEventListener('click', (e)=>{
	const rect = myElement.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	
	console.log("coordenadas em relação ao elemento", x, y);
});

document.addEventListener('click', (e)=>{
	//coordenadas em relação a janela do navegador
	
	const xInWindow = e.clientX;
	const yInWindow = e.clientY;
	
	//coordenadas em relacao ao document inteiro
	
	const xInDocument = e.pageX;
	const YInDocument = e.pageY;
	
	console.log('coordenadas janela', xInWindow, yInWindow);
	console.log('coordenadas pagina', xInDocument, YInDocument);
});