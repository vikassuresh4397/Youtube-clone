import navbar from "./components/navbar.js";
// console.log(navbar);
let navbar_div = document.querySelector("#navbar");
navbar_div.innerHTML = navbar();

let data = JSON.parse(localStorage.getItem("video_details"));
// console.log(data);

function playVideo(data) {
  let container = document.getElementById("video");

  let iframe = document.createElement("iframe");

  iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1`;
  iframe.height = "100%";
  iframe.width = "100%";
  iframe.setAttribute = ("allowfullscreen", true);

  container.append(iframe);
  let title = document.createElement("h2");
  title.innerHTML = data.snippet.title;
  detail.append(title);
}
playVideo(data);

//// for the recommended section //////////////////

let API = "AIzaSyAUOrcRTExluwZtFn44PZwEX0Qj6n-wD6g";
//var datas;
async function mostPopular() {
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&chart=mostPopular&regionCode=IN&key=${API}`
    ); //200&chart=mostPopular&regionCode=IN&key=${API_KEY}`
    let data = await res.json();
    let datas = data.items;
    append(datas);
    //videofilter(data);

    //console.log(data.items);
  } catch (error) {
    console.log("ERR! Server cannot give data ");
  }
}
mostPopular();

function append(data) {
  let container = document.querySelector("#reco");
  container.innerHTML = null;

  data.forEach(({ snippet, id: { videoId } }) => {
    let image = snippet.thumbnails.high.url;
    let channelName = snippet.channelTitle;
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = image;
    let channel = document.createElement("p");
    channel.innerText = channelName;
    // channel.style.fontSize = "x-smaller";

    let data = {
      snippet,
      videoId,
    };
    div.addEventListener("click", function () {
      localStorage.setItem("video_details", JSON.stringify(data));
      window.location.href = "playVideo.html";
    });

    div.append(img, channel);
    container.append(div);
  });
}
var comments = data.videoId;
async function comment() {
  // let data = JSON.parse(localStorage.getItem("video_details"));

  let res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=10&videoId=${comments}&key=${API}`
  );
  let datas = await res.json();
  let com = datas.items;
  appendComments(com);
  // console.log(com);
}
comment();

function appendComments(data) {
  let container = document.querySelector("#comments");
  container.innerHTML = null;

  data.forEach(({ snippet }) => {
    let image = snippet.topLevelComment.snippet.authorProfileImageUrl;
    let comments = snippet.topLevelComment.snippet.textDisplay;
    let div = document.createElement("div");
    div.setAttribute("id", "commentdiv");
    let div1 = document.createElement("div");
    div1.setAttribute("id", "reply");
    let img = document.createElement("img");
    img.src = image;
    let p = document.createElement("p");
    p.innerHTML = comments;

    //console.log(snippet);
    div.append(img, p);
    container.append(div);
  });
}
