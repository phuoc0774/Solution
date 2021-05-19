<template>
  <div id="app">
    <notifications group="global" position="top right" style="top:20px;right:20px;">
      <template slot="body" scope="props">
        <div :class="'notification ' + props.item.type">
          <button type="button" @click="props.close" class="delete"></button>
          <div v-html="props.item.text"></div>
        </div>
      </template>
    </notifications>
    <vue-confirm-dialog></vue-confirm-dialog>



    <Header></Header>
    <div v-if="isLoggedIn" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Users" v-if="intRole == opRole.admin">Users</router-link> |
      <router-link to="/ImportSoTram">Số/Trạm BTS</router-link>
      <router-view  :key="$route.path"/>
      
    </div>
    <LoginAndRegister v-else></LoginAndRegister>

  </div>
</template>


<style src="./css/bulma.min.css" scoped></style> // <style src="bulma/css/bulma.min.css" scoped></style>
<script>
import store from './store/appstore';
import LoginAndRegister from './components/share/LoginAndRegister';
import Header from './components/share/Header';
// import UserIndex from './components/Users/UserIndex'
// <router-link to="/users/create">Create User</router-link>|

export default {
  name: "app",
  mounted() {
    this.initialize();
  },
  components: {
    Header,
    // Footer,
    LoginAndRegister,
    // UserIndex,
  },
  data() {
    return {
      isLoggedIn: false,
      intRole: -1,
      opRole: {'admin': '1', 'user': '2'},
    };
  },
  methods: {
    initialize() {
      let self = this;
      console.log("App.vue");
    },
    updateNav(){
      var self = this;
       self.intRole = store.state.user && store.state.user.roles || -1;
       console.log(`${self.intRole}  ${self.opRole.admin}`);
    }
  }
};
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
