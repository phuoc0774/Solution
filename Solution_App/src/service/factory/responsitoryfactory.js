
import sotrambstresponsitory from '../impl/sotrambtsresponsitory'
import authresponsitory from '../impl/authresponsitory'
import userresponsitory from '../impl/userresponsitory'
import khoasotrambtsresponsitory from '../impl/khoasotrambtsresponsitory'
const responsitories = {
  sotrambts: sotrambstresponsitory,
  auth: authresponsitory,
  user: userresponsitory,
  khoasotrambts: khoasotrambtsresponsitory,
}
export default {
  get: name => responsitories[name]
}
