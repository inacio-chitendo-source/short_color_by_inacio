import { light, dark } from "./theme.js";

 
if(!localStorage.getItem("theme")){
    localStorage.setItem("theme", "dark");
}

//definindo variaveis
const body =  document.body;

export const theme = () =>{
    const theme = localStorage.getItem("theme");
    document.querySelectorAll('.liked').forEach(liked =>{
      liked.style = `
        color: red;
      `;
    })
    

      if(theme === "light"){
          body.style = ` 
          background: ${light.bg2};
          color: ${light.color};
          `;
        document.querySelectorAll('a').forEach( a =>{
          a.style = `
            color:   ${light.color};
          `;
        });

        document.querySelectorAll('bi').forEach(bi =>{
          bi.style = `
            color:   ${light.color};
          `;
        });
        
        document.querySelectorAll('.card').forEach(card =>{
          card.style =  `
            background: ${light.bg};
            color: ${light.color2};
          `;
        });

        document.querySelectorAll('.bg').forEach(bg =>{
          bg.style =  `
            background: ${light.bg};
            color: ${light.color2};
          `;
        });

        document.querySelectorAll('.bg2').forEach(bg2 =>{
          bg2.style =  `
            background: ${light.bg2};
            color: ${light.color};
          `;
        });

         document.querySelectorAll('.bg3').forEach(bg3 =>{
          bg3.style =  `
            background: ${light.bg3};
            color: ${light.color3};
          `;
        });
        document.querySelectorAll('.btn').forEach(btn =>{
          btn.style = `
            background: #48a8;
            color: #081003;
          `;
        });
        
        const obj = {
          "clr1" : light.color,
          "clr2" : light.color2,
          "clr3": light.color3,
          "bg3" : light.bg3,
          "bg": light.bg
        } 
        return obj;
      }
    
    if(theme === "dark"){
        body.style = ` 
          background: ${dark.bg2};
          color: ${dark.color};
          `;

        document.querySelectorAll('a').forEach( a =>{
          a.style = `
            color:   ${dark.color};
          `;
        });

        document.querySelectorAll('bi').forEach(bi =>{
          bi.style = `
            color:   ${dark.color};
          `;
        });
        
        document.querySelectorAll('.card').forEach(card =>{
          card.style =  `
            background: ${dark.bg};
            color: ${dark.color2};
          `;
        });

        document.querySelectorAll('.bg').forEach(bg =>{
          bg.style =  `
            background: ${dark.bg};
            color: ${dark.color2};
          `;
        });

        document.querySelectorAll('.bg2').forEach(bg2 =>{
          bg2.style =  `
            background: ${dark.bg2};
            color: ${dark.color};
          `;
        });
         document.querySelectorAll('.bg3').forEach(bg3 =>{
          bg3.style =  `
            background: ${dark.bg3};
            color: ${dark.color3};
            `;
        });
        document.querySelectorAll('.btn').forEach(btn =>{
          btn.style = `
            background: #48a8;
            color: #081003; 
          `;
        });
        
        const obj = {
          "clr1" : dark.color,
           "crl2" : dark.color2,
           "clr3": dark.color3,
           "bg3" : dark.bg3,
           "bg": dark.bg
        } 
        return obj;
    }
}
