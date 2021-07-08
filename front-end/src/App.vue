<template>
  <div id="app">
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand href="#">Heidi the Mechanic</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

  <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>

          <span class="text-white mr-2"> User:</span>
         <span class="text-white mr-4">{{userName}}</span>

          <b-button size="sm" class="px-4 py-1 " @click="logOut" variant="danger" type="button">Logout</b-button>

        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>


  </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: "App",
  computed:{
    userName(){
      return this.$store.state.user.firstName+' '+ this.$store.state.user.lastName;
    }
  },
  methods:{
    logOut(){
      this.$store.commit("logOut");
      this.$router.push("/login");
    }
  }
};
</script>
