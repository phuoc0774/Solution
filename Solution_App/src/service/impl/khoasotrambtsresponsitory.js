
//import axios from 'axios';
import responsitory from '../reponsitory/responsitory'
const resource = '/khoasotrambts'
export default {
  get(){
    return responsitory.get(`${resource}`);
  },  
  getById (usid) {
    return responsitory.get(`${resource}/${usid}`)
    // return responsitory.get(`${resource}?id=${usid}`)
  },
  getByQueryString (thang, nam) {
    var obj = {params: {}};
    obj.params.thang = thang;
    obj.params.nam = nam;
    return responsitory.get(`${resource}/getbyquerystring`, obj);
  },
  create(user, detail) {
    var _resource = resource;
    if(detail) _resource+= `/${detail}`;
    return responsitory.post(`${_resource}`, user)
  },
  createAll(user) {
    return responsitory.post(`${resource}/insertall`, user)
  },
  update (user, detail) {
    var _resource = resource;
    if(detail) _resource+= `/${detail}`;
    return responsitory.put(`${_resource}`, user) 
  },
  delete (usid) {
    return responsitory.delete(`${resource}/${usid}`)
  },
  deleteAll (ids) {
    return responsitory.post(`${resource}/deleteall`, ids)
  }
}
