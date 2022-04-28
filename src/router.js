
let userIds = window.sessionStorage.getItem('userIds');
let uderid = JSON.parse(userIds);
const url = `/src/pages/dashboard.html?:${uderid}`;
console.log(uderid)

const route = (event) => {

  event = event || window.event;

  event.preventDefault();

  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  404: "/pages/404.html",
  "/src/index.html": "/src/pages/login.html",
  "/src/pages/dashboard.html?:id": url,
  "/src/pages/canvas.html": "/src/pages/canvas.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  console.log(path + '?' + uderid)
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
