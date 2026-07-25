import welcome from "../welcome.js";
import level_1 from "../levels/level_1.js";
import level_2 from "../levels/level_2.js";
import level_3 from "../levels/level_3.js";
import level_4 from "../levels/level_4.js";
import level_5 from "../levels/level_5.js";
import level_6 from "../levels/level_6.js";
import level_7 from "../levels/level_7.js";
import level_8 from "../levels/level_8.js";
import level_9 from "../levels/level_9.js";
import level_10 from "../levels/level_10.js";

export const routeConfig = {
  	"/": { 
		view: welcome
	},
    "/level_1": { 
		view: level_1
	},
	"/level_2": { 
		view: level_2
	},
	"/level_3": { 
		view: level_3
	},
	"/level_4": { 
		view: level_4
	},
	"/level_5": { 
		view: level_5
	},
	"/level_6": { 
		view: level_6
	},
	"/level_7": { 
		view: level_7
	},
	"/level_8": { 
		view: level_8
	},
	"/level_9": { 
		view: level_9
	},
	"/level_10": { 
		view: level_10
	}
}


