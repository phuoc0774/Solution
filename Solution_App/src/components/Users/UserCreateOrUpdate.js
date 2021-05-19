
import Loader from '../share/Loader'
import ResponsitoryFactory from '../../service/factory/responsitoryfactory'
//
const userRes = ResponsitoryFactory.get('user');

export default {
  name: 'UserCreateOrUpdate',
  components: {
    Loader, 
    // Pager
  },
  mounted() {
    this.get();
  },
  validators: {
    'model.username'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(100);
    },
    'model.email'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(200)
        .email();
    },
    'model.phone'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(10)
        .maxLength(12);
    },
    'model.address'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(400);
    },
    // 'model.password'(value) {
    //   return this.$validator
    //     .value(value)
    //     .required()
    //     .minLength(5)
    //     .maxLength(400);
    // },
    // 'model.password_retype'(value) {
    //   return this.$validator
    //     .value(value)
    //     .required()
    //     .minLength(5)
    //     .maxLength(400);
    // }
  },
  data() {
    return {
      isLoading: false,
      isChangePassword: null,
      model: {
        usid: 0,
        username: null,
        email: null,
        password: null,
        password_new: null,
        password_retype: null,
        phone: null,
        role: null,
        address: null,
      }
    }
  },
  methods: {
    get() {
      var self = this;
      let id = self.$route.params.id; // console.log(self.$route.params);
      if (!id) return;

      self.isChangePassword = false; // this.isLoading = true;
      console.log(`self.isChangePassword  ${self.isChangePassword}`);
      userRes.getById(id).then(function (res) {
        var data = res && res.data;
        self.model = data.data;
        // self.model.username = data.username;
        // console.log(data);
      });

      

      // this.$proxies.productProxy.get(id)
      //   .then(x => {
      //     this.model = x.data;
      //     this.isLoading = false;
      //   })
      //   .catch(() => {
      //     this.isLoading = false;
      //     this.$notify({
      //       group: "global",
      //       type: "is-danger",
      //       text: 'Ocurrió un error inesperado'
      //     });
      //   })
    },
    save() {
      this.$validate().then(success => {
        if (!success) return;

        // this.isLoading = true;

        // if(this.model.productId) {
        //   this.$proxies.productProxy.update(this.model.productId, this.model)
        //   .then(() => {
        //     this.$notify({
        //       group: "global",
        //       type: "is-success",
        //       text: 'Producto actualizado con éxito'
        //     });
        //     this.$router.push('/products');
        //   })
        //   .catch(() => {
        //     this.isLoading = false;
        //     this.$notify({
        //       group: "global",
        //       type: "is-danger",
        //       text: 'Ocurrió un error inesperado'
        //     });
        //   });
        // } else {
        //   this.$proxies.productProxy.create(this.model)
        //   .then(() => {
        //     this.$notify({
        //       group: "global",
        //       type: "is-success",
        //       text: 'Producto creado con éxito'
        //     });
        //     this.$router.push('/products');
        //   })
        //   .catch(() => {
        //     this.isLoading = false;
        //     this.$notify({
        //       group: "global",
        //       type: "is-danger",
        //       text: 'Ocurrió un error inesperado'
        //     });
        //   });
        // }

      })
    },
    onClickChangePassword(){
      var self = this;
      if(self.isChangePassword === null) return;
      console.log(`onClickChangePassword`);
      self.isChangePassword = !self.isChangePassword;
    },
    onClickCancel(){
      this.$router.push('/Users');
    }
  }
}
