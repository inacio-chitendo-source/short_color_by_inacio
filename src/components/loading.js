import api from "../server/api";

export const loader = () =>{
    return `
        <div id='loading' align='center'>
		    <div class='loader'></div>
            <p>carregando...</p>
	    </div>
    `;
}
 
export function status(msg){
    
    //document.getElementById('status').style.display = 'block';

    if(msg == 'TypeError: Failed to fetch' || msg == 'sem'){
        localStorage.setItem('connectionState', 'off');
    }else{
        localStorage.setItem('connectionState', 'on');
    }
}

export function offline(){
    const div = document.createElement('div');
    div.className = 'offline';

    div.innerHTML +=`
        <div>
        </div>
        <div>Sem Conexao</div>
    `.trim();
    return div;
}