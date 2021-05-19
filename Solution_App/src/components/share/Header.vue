<template>

  <div>
    <div  style="display:inline;">
      <a class="navbar-item">
        <img src="../../assets/logo.png" alt="KODOTI" />
      </a>
    </div>
    <button id="btnEditProfile" v-if="this.$parent.isLoggedIn" @click="onClickEditProfile">Edit Profile</button>
    <button id="btnLogout" v-if="this.$parent.isLoggedIn" @click="onClickLogout">Logout</button>

    
    <!-- <router-link to="/users/editprofile">
        <button id="myButton" class="foo bar">Edit Profile</button>
    </router-link> -->
       <!-- <router-link :to="{name: 'myRoute'}">
        <button id="myButton" class="foo bar">Edit Profile</button>
    </router-link> -->
  
  </div>

  
  <!-- <div class="hero-head">
    <header class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            <img src="../assets/logo.png" alt="KODOTI" />
          </a>
          <span class="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" class="navbar-menu">
          <div class="navbar-end">
            <router-link :class="{'is-active': $route.name === 'default'}" class="navbar-item" to="/">Inicio</router-link>
            <router-link :class="{'is-active': $route.path.startsWith('/orders')}" class="navbar-item" to="/orders">Órdenes</router-link>
            <router-link :class="{'is-active': $route.path.startsWith('/clients')}" class="navbar-item" to="/clients">Clientes</router-link>
            <router-link :class="{'is-active': $route.path.startsWith('/products')}" class="navbar-item" to="/products">Productos</router-link>
            <router-link :class="{'is-active': $route.path.startsWith('/users')}" v-if="user.roles.includes('Admin')" class="navbar-item" to="/users">Usuarios</router-link>
            <span class="navbar-item">
              <a @click="logout" class="button is-danger is-inverted">
                <span class="icon">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                <span>Desconectarse</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </header> 
  </div>-->
</template>

<script>
import store from "../../store/appstore";
export default {
  name: "Header",
  data() {
    return {
      
      // user: this.$store.state.user
    };
  },
  methods: {
    onClickLogout() {
      localStorage.removeItem("access_token");
      this.$parent.isLoggedIn = false;
    },
    onClickEditProfile() {
      this.$router.push('/users/editprofile');
      // this.$router.push('userseditprofile');
    },
  },
};
</script>
