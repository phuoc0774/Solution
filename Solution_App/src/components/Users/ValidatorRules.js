
var ValidatorRules = {
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
    'model.password_old'(value) {
        console.log('model.password_old');
        if(value === undefined) value ="";
        var self = this;
        var isCreate = self.isCreate;
        var isChangePassword = self.isChangePassword;
        // console.log(self.password_old);
       
           
        var selfValidator = self.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(400);

        //EXE
        if(isCreate || !isChangePassword){
            selfValidator._messages.length = 0;
            selfValidator._messages = [];
        }else
        if(self.password_old != value)
        {
            selfValidator._messages.push("Vui lòng nhập chính xác mật khẩu đang sử dụng!");
        }
        return selfValidator;
    },
    'model.password'(value) {
        // console.log('model.password');
        if(value === undefined) value ="";
        var self = this;        
        var isCreate = self.isCreate;
        var isChangePassword = self.isChangePassword;//console.log(`isCreate ${isCreate}; isChangePassword ${isChangePassword}`);
        var selfValidator = self.$validator
            .value(value)
            .required()
            .minLength(5)
            .maxLength(400);

        // EXE
        //create
        if(isCreate)
            return selfValidator;
        //update: không change password
        if(!isChangePassword){
            selfValidator._messages.length = 0;
            selfValidator._messages = [];
            return selfValidator;
        }else
        //update: change password
        {
            return selfValidator;
        }
    },
    'model.password_retype'(value) {
        // console.log('model.password_retype');
        if(value === undefined) value ="";
        var self = this;         
        var isCreate = self.isCreate;
        var isChangePassword = self.isChangePassword;    
        var selfValidator =  self.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(400);
        if(self.model.password != self.model.password_retype){
            selfValidator._messages.push("Xác nhận mật khẩu không chính xác");
        }
        // EXE
        //create
        if(isCreate)
            return selfValidator;
        //update: không change password
        if(!isChangePassword){
            selfValidator._messages.length = 0;
            selfValidator._messages = [];
            return selfValidator;
        }else
        //update: change password
        {
            return selfValidator;
        }
    }
  };

export default {
    CreateOrUpdateUser(){
        return ValidatorRules;
    }
}

  