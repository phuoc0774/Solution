import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'

import store from './store/appstore'
import VueConfirmDialog from 'vue-confirm-dialog'
import SimpleVueValidation from 'simple-vue-validator'


Vue.config.productionTip = false

Vue.use(Notifications);
Vue.use(VueConfirmDialog)


Vue.use(SimpleVueValidation, {
  mode: 'manual',
  templates: {
    error: 'Lỗi định dạng',
    required: 'Bắt buộc',
    float: 'Debe ser un número.',
    integer: 'Debe ser un entero.',
    number: 'Debe ser un número.',
    lessThan: 'Debe ser menor a {0}.',
    lessThanOrEqualTo: 'Debería ser menor o igual a {0}.',
    greaterThan: 'Debe ser mayor a {0}.',
    greaterThanOrEqualTo: 'Debería ser mayor o igual a {0}.',
    between: 'Debe estar entre {0} y {1}.',
    size: 'El tamaño debería ser {0}.',
    length: 'Debe ingresar {0} caracteres.',
    minLength: 'Ít nhất {0} kí tự',
    maxLength: 'Tối đa {0} kí tự',
    lengthBetween: 'La longitud debería estar entre {0} y {1}.',
    in: 'Debe ser {0}.',
    notIn: 'No debería ser {0}.',
    match: 'No se pueden comparar.',
    regex: 'Formato inválido.',
    digit: 'Debe ser un dígito.',
    email: 'Email không hợp lệ',
    url: 'Url inválida.'
  }
});

Vue.use({
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$validator', {
      value: SimpleVueValidation.Validator
    })
  }
});

Vue.use({
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$user', {
      value: {
        initialize(access_token) {
          let strToken = localStorage.getItem("access_token") || access_token || null;
          var token = null, user = {};
          if(strToken != null)
          {
            token = strToken.split(".");
            user = JSON.parse(
                decodeURIComponent(
                  atob(token[1])
                    .split("")
                    .map(c => {
                      return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                      );
                    })
                    .join("")
                )
              );
          }
          // console.log(user);
          function _getValue(obj, key) {
            var keys = Object.keys(obj);
            var _key = keys.filter(_ => _.includes(`claims/${key}`));
            if(_key.length == 0) return null;
            return obj[_key[0]];
          }

          store.state.user = {
            id: _getValue(user, 'nameidentifier'),
            // name: _getValue(user, 'name'),
            email: _getValue(user, 'emailaddress'),
            roles: _getValue(user, 'role'),
            iat: user.iat || null,
            iss: user.iss || null,
            jti: user.jti || null,
            nbf: user.nbf || null,
            sub: user.sub || null,
            access_token: strToken,
          };
        }
      }
    })
  }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')







// import $ from "jquery";
// // Vue.use($);
// // window.$ = $;
// window.$ = window.jQuery = require('jquery');

// Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

// import '@babel/polyfill'
// Vue.use({
//   install(Vue) {
//     Object.defineProperty(Vue.prototype, '$proxies', {
//       value: proxyConfig
//     })
//   }
// });


// Vue.use({
//   install(Vue) {
//     Object.defineProperty(Vue.prototype, '$validatorRules', {
//       value:{
//         'model.username'(value) {
//             return this.$validator
//                 .value(value)
//                 .required()
//                 .minLength(5)
//                 .maxLength(100);
//         },
//         'model.email'(value) {
//             return this.$validator
//                 .value(value)
//                 .required()
//                 .minLength(5)
//                 .maxLength(200)
//                 .email();
//         },
//         'model.phone'(value) {
//             return this.$validator
//                 .value(value)
//                 .required()
//                 .minLength(10)
//                 .maxLength(12);
//         },
//         'model.address'(value) {
//             return this.$validator
//                 .value(value)
//                 .required()
//                 .minLength(5)
//                 .maxLength(400);
//         },
//         'model.password'(value) {
//           return this.$validator
//             .value(value)
//             .required()
//             .minLength(5)
//             .maxLength(400);
//         },
//         'model.password_retype'(value) {
//           var self = this;      
//           var selfValidator =  self.$validator
//             .value(value)
//             .required()
//             .minLength(5)
//             .maxLength(400);
//             if(self.model.password != self.model.password_retype){
//                 selfValidator._messages.push("Xác nhận mật khẩu không chính xác");
//             }
//             console.log(selfValidator);
//         return selfValidator;
//         }
//       } //objRule
//     })
//   }
// });

