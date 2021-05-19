
import axios from 'axios';
const baseDomain = 'https://localhost:44339';
const baseUrl = `${baseDomain}/api`;
var strToken = getTokenByLocal();
const instance = axios.create({
  baseURL:baseUrl,
  headers: {
    'authorization': `Bearer ${strToken}`,
    'lang': 'vn'
  }
});

function getTokenByLocal() {
  var str = localStorage.getItem("access_token");
  // if(!str) console.log(`getTokenByLocal(${str.length})`);
  return str;
}


export default instance;