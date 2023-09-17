import navbar from "./components/navbar.js";
// console.log(navbar);
let navbar_div = document.querySelector("#navbar");
navbar_div.innerHTML = navbar();

let API = "AIzaSyAUOrcRTExluwZtFn44PZwEX0Qj6n-wD6g";
//var datas;
async function mostPopular() {
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${API}`
    ); //200&chart=mostPopular&regionCode=IN&key=${API_KEY}`
    let data = await res.json();
    let datas = data.items;
    // appendMovies(datas);
    //videofilter(data);
    let myPromise = new Promise(function (resolve, reject) {
      setInterval(() => {
        let movie = datas;
        if (movie != null) {
          resolve(movie);
        } else {
          reject("ERR! Your promise cannot be resolve");
        }
      }, 1000);
    });
    async function main() {
      try {
        let response = await myPromise;
        append(response);
      } catch (error) {
        console.log(error);
      }
    }
    main();
    // console.log(data.items);
  } catch (error) {
    console.log("ERR! Server cannot give data ");
  }
}
mostPopular();

function append(data) {
  let container = document.querySelector("#container");
  container.innerHTML = null;
  data.forEach(({ snippet, id: { videoId } }) => {
    let title = snippet.title;

    let image = snippet.thumbnails.high.url;
    let channelName = snippet.channelTitle;
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = image;
    let channel = document.createElement("p");
    channel.innerText = channelName;
    channel.style.fontSize = "smaller";
    let name = document.createElement("h4");
    name.innerText = title;

    let data = {
      snippet,
      videoId,
    };
    div.addEventListener("click", function () {
      localStorage.setItem("video_details", JSON.stringify(data));
      window.location.href = "playVideo.html";
    });

    div.append(img, name, channel);
    container.append(div);
  });
}

// document.onclick = () => {
//   datas.sort((a, b) => a.datas.snippet.title - b.datas.snippet.title);
// };

window.searchVideos = async () => {
  let query = document.getElementById("query").value;
  console.log(query);
  try {
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API}`
    );
    let data = await res.json();
    let datas = data.items;
    append(datas);
    //videofilter(data);

    //  console.log(datas);
  } catch (error) {
    console.log("ERR! Server cannot give data ");
  }
};

let id;
window.debounce = (func, delay) => {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(() => {
    func();
  }, delay);
};

document.getElementById("title").addEventListener("click", title);
async function title() {
  let res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${API}`
  ); //200&chart=mostPopular&regionCode=IN&key=${API_KEY}`
  let data = await res.json();
  let det = data.items;
  det.sort((a, b) => a.snippet.channelTitle - b.snippet.channelTitle);
  append(det);
  console.log(det);
}
