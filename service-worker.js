const CACHE_NAME = "most-app-cache-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./package.json",
    "./package-lock.json",
    "./manifest.json",
    "./app.js",
    "./vite.config.js",

    // ***************************************
    // COMPONENTS
    // ***************************************
    "./src/components/funcCard.js",
    "./src/components/funcSongPaid.js",
    "./src/components/functions.js",
    "./src/components/loading.js",

    // JSON AND LIBRARY 
    "./src/json/countries.json",
    "./src/json/styles.json",
    "./src/library/jquery.js",

    // ***************************************
    // PAGES OF MOST SOUND
    // ***************************************
    "./src/pages/Apoio/index.js",
    "./src/pages/Apoio/function/function.js",
    "./src/pages/Artist/index.js",
    "./src/pages/Artist/function/function.js",
    "./src/pages/Artist/style.css",
    "./src/pages/Def/index.js",
    "./src/pages/Def/function/function.js",
    "./src/pages/Explore/index.js",
    "./src/pages/Explore/function/function.js",
    "./src/pages/Explore/style.css",
    "./src/pages/Index/index.js",
    "./src/pages/Index/function/function.js",
    "./src/pages/Index/style.css",
    "./src/pages/Login/index.js",
    "./src/pages/Login/function/function.js",
    "./src/pages/Login/style.css",
    "./src/pages/Logout/index.js",
    "./src/pages/Most/index.js",
    "./src/pages/Most/function/functio.js",
    "./src/pages/Most/style.css",
    "./src/pages/Perfil/index.js",
    "./src/pages/Perfil/function/function.js",
    "./src/pages/Perfil/style.css",
    "./src/pages/Player/index.js",
    "./src/pages/Player/player.js",
    "./src/pages/Player/function/function.js",
    "./src/pages/Player/style.css",
    "./src/pages/Post/index.js",
    "./src/pages/Post/chat.js",
    "./src/pages/Post/notify.js",
    "./src/pages/Post/show_post.js",
    "./src/pages/Post/function/function.js",
    "./src/pages/Post/style.css",
    "./src/pages/Signup/index.js",
    "./src/pages/Signup/function/function.js",
    "./src/pages/Signup/style.css",
    "./src/pages/Upload/music.js",
    "./src/pages/Upload/post.js",
    "./src/pages/Upload/store.js",
    "./src/pages/Upload/video.js",
    "./src/pages/Upload/style.css",
    "./src/pages/Video/index.js",
    "./src/pages/Video/function/function.js",
    "./src/pages/Video/style.css",

    // *******************************************
    // ROUTES
    // *******************************************
    "./src/routas_js/route.js",
    "./src/routas_js/router.js",

    // SERVER
    "./src/server/api.js",

    // *********************************************
    // STYLES
    // *********************************************
    "./src/styles/most.js",
    "./src/styles/theme.js",
    "./src/styles/style.css",

    // *********************************************
    // ICONES AND ICONS
    // *********************************************
    "./src/assets/icones/aleatorio.png",
    "./src/assets/icones/back.png",
    "./src/assets/icones/homed.png",
    "./src/assets/icones/home.js",
    "./src/assets/icones/icon.jpg",
    "./src/assets/icones/icon.png",
    "./src/assets/icones/image.jpg",
    "./src/assets/icones/img.png",
    "./src/assets/icones/list.PNG",
    "./src/assets/icones/next.png",
    "./src/assets/icones/replay.png",
    "./src/assets/icones/son.PNG",
    "./src/assets/icones/sound2.png",
    "./src/assets/icones/backgrounds/bg0.jpg",
    "./src/assets/icones/backgrounds/bg1.jpg",
    "./src/assets/icones/backgrounds/bg2.jpg",
    "./src/assets/icones/backgrounds/bg3.jpg",
    "./src/assets/icones/backgrounds/bg4.jpg",
    "./src/assets/icones/backgrounds/bg5.jpg",
    "./src/assets/icones/backgrounds/bg6.jpg",
    "./src/assets/icones/backgrounds/bg7.jpg",
    "./src/assets/icones/backgrounds/bg8.jpg",
    "./src/assets/icones/backgrounds/bg9.jpg",
    "./src/assets/icons/pause (2).png",
    "./src/assets/icons/play (2).png",
    "./src/assets/icons/b_search.png",
    "./src/assets/icons/b_tblimport.png",
    "./src/assets/icons/b_comment.png"
];

self.addEventListener("install", event =>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("fetch", event =>{
    event.respondWith(
        caches.match(event.request).then(response =>{
            return response || fetch(event.request);
        })
    );
});