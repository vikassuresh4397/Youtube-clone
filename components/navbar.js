function navbar() {
  return `<div id="top">
        <a href="index.html">
          <img
            id="logo"
            src="https://www.freeiconspng.com/thumbs/youtube-logo-png/youtube-logo-png-transparent-image-5.png"
            alt=""
        /></a>
  
        <div id="search">
          <input id="query" placeholder="Search" type="text" oninput="debounce(searchVideos,1000)"/>
          <img
            src="https://cdn-icons-png.flaticon.com/512/7175/7175253.png"
            alt=""
          />
        </div>
  
        <div id="profileicon">
        <a href="">  <img
        src="https://cdn-icons-png.flaticon.com/512/5697/5697997.png"
        alt=""
      /></a>
      <a href=""> <img
      src="https://cdn-icons-png.flaticon.com/512/7596/7596589.png"
      alt=""
    /></a>
         
          <a href="login.html">  <img
          id="mics"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
        /></a>
         
        </div>
      </div>
  
      <div id="filters">
        <button id="title">
        By Title
        </button>
        <button onclick="views()">
         By views
        </button>
        <button onclick="time()">
         By time
        </button>
      </div>`;
}

export default navbar;
