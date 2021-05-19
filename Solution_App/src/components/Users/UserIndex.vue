<template>
  <div>
    <h2 class="title">List of User</h2>
    <Loader v-if="isLoading" />
    <template v-else>
      <el-table id="tblUser"
        :data="users"
        border
        height="480"
        style="width: 100%"
        header-row-class-name="trheader"
        >
        <el-table-column
          fixed="left"
          type="index"
          prop="stt"
          label="STT"
          align="center"
          min-width="40">
        </el-table-column>
        <el-table-column
          fixed
          prop="username"
          label="Username"
          header-align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          header-align="center"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="Phone"
          header-align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="role"
          label="Role"
          align="center"
          min-width="50">
        </el-table-column>
        <el-table-column
          prop="address"
          label="Address"
          header-align="center"
          min-width="320">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations"
          header-align="center"
          min-width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <router-link :to="`/users/edit/${scope.row.usid}`" style="color:#409EFF">Edit</router-link>
            </el-button>
            <el-button @click="onClickDelete(scope.row, scope.$index, users)" style="font-weight: bold" type="text" size="small">Delete</el-button>
            <el-button @click="onClickMakeAsAdmin(scope.row, scope.$index, users)" style="font-weight: bold" type="text" size="small">Edit Role</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="field has-text-right">
        <router-link to="/users/create">Create user</router-link>
      </div>
    </template>
  </div>
</template>

<style>
  .trheader th{
   background: #409eff;
    color: #fefffc;
 }

  /* .trheader{
   background: #409eff !important;
    color: #fefffc !important;
 } */
/* thead > tr > th > div {
    text-align: left;
    color: red;
} */
/* thead > p{
    text-align: left;
    color: red;
} */
</style>

<script>
// $("thead > tr > th > div").css("color", "red")
// <el-button @click="onClickDetail(scope.row, scope.$index, users)" type="text" size="small">Detail/Edit</el-button>
// <router-link :to="`/products/${item.productId}/edit`">Editar</router-link>
// <style src="bulma/css/bulma.min.css" scoped></style>
// <style src="../../css/bulma.min.css" scoped></style> 
// import Pager from '../../shared/Pager'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/index.js';
Vue.use(ElementUI);

import Loader from '../share/Loader'
import ResponsitoryFactory from '../../service/factory/responsitoryfactory'
//
const userRes = ResponsitoryFactory.get('user');

export default {
    name: 'UserIndex',
    components: {
        Loader, 
        // Pager
    },
    mounted() {
      this.getUsers();
    },
    data() {
        return {
          isLoading: false,
          users: [],
      }
    },
    methods: {
      getUsers(){
        var self = this;
        self.isLoading = true;
        userRes.get().then(function (resp) {
          self.users = resp.data && resp.data.data || [];
          self.isLoading = false;
        })
      },
      onClickDetail(row, index, users){
        // this.$router.push('/products');
      },
      async onClickDelete(row, index, users){
        var self=  this;
        self.$confirm(
        {
          message: `Thực hiện xóa ${row.username}?`,
          button: {yes: "Đồng ý", no: "Thoát"},
          callback: async (confirm) => {
            if(confirm)
            {
              var data = await userRes.delete(row.usid).then(function (res) {
                var data = res && res.data;
                return data;
              });
              if(data.success){
                users.splice(index, 1);
                self.showNotify(`Đã xóa thành công!`);
              }else{
                self.showNotify(`Xóa không thành công!\n${data.message}`, 2);
              }
            }
          }
        });
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
</script>