import Loader from '../share/Loader'
import ResponsitoryFactory from '../../service/factory/responsitoryfactory'
import store from '../../store/appstore';
//
import ValidatorRules from "./ValidatorRules.js"
const userRes = ResponsitoryFactory.get('user');
// var oldPassword = null;
export default {
    name: 'UserUpdate',
    components: {
        Loader,
        // Pager
    },
    mounted() {
        this.initialize();
    },
    validators: ValidatorRules.CreateOrUpdateUser(),
    data() {
        return {
            isLoading: false,
            isCreate: false,
            isEditProfile: false,
            isChangePassword: false,
            password_old: null,
            model: {
              // usid: 0,
              username: null,
              email: null,
              password_old: null,
              password: null,
              password_retype: null,
              phone: null,
              role: 2,
              address: null,
            },
            intRole: -1,
            intId: null,
            opRole: {'admin': '1', 'user': '2'},
        }
    },
    methods: {
      initialize(){
          var self = this;
          self.model.username = null,
          self.model.email = null,
          self.model.password_old = null,
          self.model.password = null,
          self.model.password_retype = null,
          self.model.phone = null,
          self.model.address = null;
          self.password_old = null;
          self.intRole = store.state.user.roles;
          self.intId = null;
          // console.log(self.intRole);
          // console.log(store.state.user);
          // self.isChangePassword = false;
          //
          self.id = self.$route.params.id; 
          if (!self.id) {
            self.isEditProfile = true;
            self.id = store.state.user.id;
          }
          if(self.id < 1){console.log("Unknow ID user to udate"); return;}

          console.log(`self.isChangePassword  ${self.isChangePassword}`);
          userRes.getById(self.id).then(function (res) {
            var data = res && res.data;
            self.model = data.data;
            self.password_old = data.data.password;
          });
      },
      onClickUpdateUser() {
          console.log("onClickUpdateUser");
          var self = this;
          self.$validate().then( (success) => {
              console.log(success);
              if (!success) return;
              self.isLoading = true;

              //EXE
              //var objUpdate = {address: self.model.address};
              // userRes.update(objUpdate, id).then(function (res) {
              userRes.update(self.model, self.id).then(function (res) {
                var data = res && res.data;
                if (data.success) {
                    self.showNotify("Cập nhật thông tin tài khoản thành công!", 1);
                    self.isChangePassword = false;
                    self.initialize();
                } else {
                    console.log(data);
                    self.showNotify(`Cập nhật thông tin tài khoản không thành công!\n${data && data.message}`, 2);
                }
              });//userRes.update()
          })//self.$validate().then(
      },
      onClickChangePassword(){
        var self = this;
        if(self.isChangePassword === null) return;
        console.log(`onClickChangePassword`);
        self.isChangePassword = !self.isChangePassword;
        self.model.password_old = null;
        self.model.password = null;
        self.model.password_retype = null;
      },
      onClickCancel() {
        var self = this;
        if(self.isEditProfile == true){
          this.$router.push('/');
        }else {
          this.$router.push('/Users');
        }
      },
      getStrValidator(nameField){
          var self = this;
          var arrError = self.validation.allErrors(nameField);
          if(arrError.length == 0) return "";
          return arrError.join(', ') + ".";
      },
      showNotify(text, type = 1, group = "global") {
          var self = this;
          self.isLoading = false;
          var strType = "is-success";
          if (type == 2) strType = "is-warning";
          self.$notify({
              group: group,
              type: strType,
              text: text,
          });
      },
    }
}


//isChangePassword
// if (self.isChangePassword) {
//     var isWrong = false;
//     // Correct retype password
//     if(self.model.password != self.model.password_retype){
//       self.showNotify("Vui lòng nhập chính xác mật khẩu!", 2);
//       self.model.password = null;
//       self.model.password_retype = null;
//       isWrong = true;
//     }
//     // Existing: verify old password or admin role
//     if(oldPassword != self.model.password_old){
//       self.model.password_old = null;
//       console.log(`${oldPassword}`);
//       self.showNotify("Vui lòng nhập chính xác mật khẩu đang khả dụng!", 2);
//       isWrong = true;
//     }

//     //return;
//     if(isWrong)
//       return;
// }


      