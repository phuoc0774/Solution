import Loader from '../share/Loader'
import ResponsitoryFactory from '../../service/factory/responsitoryfactory'
//
import ValidatorRules from "./ValidatorRules.js"
const userRes = ResponsitoryFactory.get('user');
  
export default {
    name: 'UserCreate',
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
            isCreate: true,
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
            }
        }
    },
    methods: {
        initialize(){
            var self = this; // console.log(self.$validatorRules);
        },
        onClickCreateUser() {
            console.log("onClickCreateUser");
            var self = this;
            self.$validate().then( async(success) => {
                console.log(success);
                if (!success) return;

                // Correct retype password
                if (self.model.password != self.model.password_retype) {
                    self.showNotify("Vui lòng nhập chính xác mật khẩu!", 2);
                    self.model.password = null;
                    self.model.password_retype = null;
                    return;
                }
                // Existing: Username, Email
                var resUser = await userRes.get(_ => _);
                var arrUser = resUser && resUser.data && resUser.data.data || [];
                var users_dupName = arrUser.filter(_ => _.username.toLowerCase() == self.model.username.toLowerCase());
                var users_dupEmail = arrUser.filter(_ => _.email.toLowerCase() == self.model.email.toLowerCase());
                // console.log(users);
                if (users_dupName.length > 0) {
                    self.showNotify("Tên tài khoản đã tồn tại!", 2);
                    return;
                }
                if (users_dupEmail.length > 0) {
                    self.showNotify("Đã có tài khoản sử dụng email này!", 2);
                    return;
                }
                self.isLoading = true;

                //EXE
                userRes.create(self.model).then(function (res) {
                    var data = res && res.data;
                    if (data.success) {
                        self.model.username = null,
                        self.model.email = null,
                        self.model.password = null,
                        self.model.password_retype = null,
                        self.model.phone = null,
                        self.model.address = null;
                        self.showNotify("Tạo tài khoản thành công!", 1);
                    } else {
                        console.log(data);
                        self.showNotify(`Tạo tài khoản không thành công!\n${data && data.message}`, 2);
                    }
                });//userRes.create()
                    
             
            })//self.$validate().then(
        },
        onClickCancel() {
            this.$router.push('/Users');
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
