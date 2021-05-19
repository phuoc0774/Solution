<template>
  <div class="columns is-centered">
    <div class="column is-6">
      <!-- <div class="has-text-centered">
        <img src="../assets/logo.png" />
        <hr />
      </div> -->
      <div class="box">
        <div class="tabs is-boxed">
          <ul>
            <li :class="{'is-active': tab === 'login'}">
              <a @click="tab = 'login'">Login</a>
            </li>
            <li :class="{'is-active': tab === 'register'}">
              <a @click="tab = 'register'">Register</a>
            </li>
          </ul>
        </div>

        <form @submit.prevent="authenticate" v-if="tab === 'login'">
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.username"
              required
              class="input"
              type="text"
              placeholder="User name"
            />
          </div>
          <div class="field">
            <input
              :disabled="login.loading"
              v-model="login.password"
              required
              autocomplete="false"
              class="input"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="field">
            <button :disabled="login.loading" type="submit" class="button is-info">Login</button>
          </div>
        </form>

        <form @submit.prevent="addNewUser" v-if="tab === 'register'">
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.username"
              required
              autocomplete="false"
              class="input"
              type="text"
              placeholder="User name"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.email"
              required
              autocomplete="false"
              class="input"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.password"
              required
              autocomplete="false"
              class="input"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.password_retype"
              required
              autocomplete="false"
              class="input"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.phone"
              required
              autocomplete="false"
              class="input"
              type="text"
              placeholder="Phone"
            />
          </div>
          <div class="field">
            <input
              :disabled="register.loading"
              v-model="register.address"
              required
              autocomplete="false"
              class="input"
              type="text"
              placeholder="Address"
            />
          </div>
          <div class="field">
            <button :disabled="register.loading" type="submit" class="button is-info">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>




<style src="bulma/css/bulma.min.css" scoped></style>
<script>
import store from '../../store/appstore'
// <style src="../../css/bulma.min.css" scoped></style> 
// import "bulma/css/bulma.min.css"

import ResponsitoryFactory from '../../service/factory/responsitoryfactory'
const authRes = ResponsitoryFactory.get('auth');
const userRes = ResponsitoryFactory.get('user');

// import Vue from 'vue'
// console.log(Vue.$validateRules);

export default {
  name: "LoginAndRegister",
  data() {
    return {
      tab: "login",
      login: {
        username: null,
        password: null,
        loading: false
      },
      register: {
        username: null,
        password: null,
        password_retype: null,
        email: null,
        phone: null,
        address: null,
        role: 2,
        loading: false
      }
    };
  },
  methods: {
     authenticate() {
      console.log("authenticate()");
      this.login.loading = true;
      let self = this;
      self.$parent.isLoading = true;


     
      authRes.login(this.login).then(function (result) {
        self.login.loading = false;
        // self.$parent.isLoading = false;
        //
        if(result.data && result.data.success){
          var data = result.data.data;
          var objToken = data.token;
          var access_token = objToken.access_token;

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("strobj_token", JSON.stringify(objToken));
          // console.log(access_token);


          self.$user.initialize();
          self.$parent.isLoggedIn = true;
          self.$parent.updateNav();
          self.$notify({
            group: "global",
            type: "is-success",
            text: "Đăng nhập thành công!"
          });
          // console.log(store.state.user);
        }else {
          // self.$parent.isLoading = false;
          var reson = result.data && result.data.message || "##";
          self.$notify({
            group: "global",
            type: "is-warning",
            text: `Đăng nhập không thành công!\n${reson}`
          });
        }
      });
    },
    async addNewUser() {
    console.log("addNewUser()");
    let self = this;
    if(self.register.password != self.register.password_retype){
      self.showNotify("Vui lòng nhập chính xác mật khẩu!", 2);
      self.register.password = null;
      self.register.password_retype = null;
      return;
    }
    if(!self.register.phone || self.register.phone.length > 10){
       self.showNotify("Vui lòng số điện thoại 10 số!", 2);
       return;
    }
    var resUser = await userRes.get(_ => _);
    var arrUser = resUser && resUser.data && resUser.data.data || [];
    var users_dupName = arrUser.filter(_ => _.username.toLowerCase() == self.register.username.toLowerCase());
    var users_dupEmail = arrUser.filter(_ => _.email.toLowerCase() == self.register.email.toLowerCase());
    // console.log(users);
    if(users_dupName.length > 0){
       self.showNotify("Tên tài khoảng đã tồn tại!", 2);
       return;
    }    
    if(users_dupEmail.length > 0){
       self.showNotify("Đã có tài khoảng sử dụng email này!", 2);
       return;
    }
    this.register.loading = true;
    userRes.create(self.register).then(function (res) {
      self.register.loading = false;
      var data = res && res.data;
      if(data.success){
        self.register.username= null,
        self.register.password= null,
        self.register.password_retype= null,
        self.register.email= null,
        self.register.phone=null,
        self.register.address= null;
        self.showNotify("Tạo tài khoảng thành công!", 1);
      }else{
        console.log(res);
        self.showNotify(`Tạo tài khoảng không thành công!\n${data && data.message}`, 2);
      }
    });

    //   this.register.loading = true;
    //   this.$proxies.identityProxy
    //     .register(this.register)
    //     .then(() => {
    //       this.register.email = null;
    //       this.register.password = null;
    //       this.register.firstName = null;
    //       this.register.lastName = null;

    //       this.$notify({
    //         group: "global",
    //         type: "is-success",
    //         text: "Su cuenta ha sido creada con éxito"
    //       });

    //       this.register.loading = false;
    //     })
    //     .catch(x => {
    //       if (x.response.status === 400) {
    //         this.$notify({
    //           group: "global",
    //           type: "is-warning",
    //           text: x.response.data
    //         });
    //       }

    //       this.register.loading = false;
    //     });
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
};
</script>

