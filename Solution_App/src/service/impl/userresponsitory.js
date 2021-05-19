
import responsitory from '../reponsitory/responsitory'
//import axios from 'axios';
const resource = '/user'
export default {
  get(){
    return responsitory.get(`${resource}`);
  },  
  getById (id) {
    return responsitory.get(`${resource}/${id}`)
  },
  create (obj, detail) {
    var _resource = resource;
    if(detail) _resource+= `/${detail}`;
    return responsitory.post(`${_resource}`, obj)
  },
  createAll(objs) {
    return responsitory.post(`${resource}/insertall`, objs)
  },
  update (obj, detail) {
    var _resource = resource;
    if(detail) _resource+= `/${detail}`;
    else{
      if (obj[detail]) _resource+= `/${obj[detail]}`;
    }
    return responsitory.put(`${_resource}`, obj)
  },
  //updateAll,
  delete (id) {
    return responsitory.delete(`${resource}/${id}`)
  }
  //deleteAll,
}


