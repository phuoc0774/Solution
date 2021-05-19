
import responsitory from '../reponsitory/responsitory'
//import axios from 'axios';
const resource = '/auth'
export default {
  login (obj, detail) {
    var _resource = resource;
    _resource +="/login"
    if(detail) _resource+= `/${detail}`;
    return responsitory.post(`${_resource}`, obj)
  },
}


