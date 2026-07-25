import Game from "../libs/game";

 
export function authMiddleware(level){
    this.level = level;
}

authMiddleware.prototype = {
    onlyIfPassedLastLevel: function(){
        if(this.level - 1 != localStorage.getItem(`level_${this.level - 1}`)){
            return false;
        }else{
            return true;
        }
    }
}
