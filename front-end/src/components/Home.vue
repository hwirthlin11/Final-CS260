<template>
  <div >
<b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand href="#">Heidi the Mechanic</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>

          <router-link to="/login">
          <b-button size="sm" class="px-4 py-1 mr-3"  variant="success" type="button">Sign in</b-button>
          </router-link>
          <router-link to="/register">
          <b-button size="sm" class="px-4 py-1 " variant="primary" type="button">Sign Up</b-button>
          </router-link>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>


<div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="420"
  >
    <b-carousel-slide
      img-src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVjaGFuaWN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    ></b-carousel-slide>
    <b-carousel-slide
      img-src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1lY2hhbmljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
    ></b-carousel-slide>
  </b-carousel>
</div>

<b-container fluid="sm" class="py-4">
 <h2 class="text-black"></h2>
  <p class="text-black"></p>
</b-container>

  <div  class="bg-secondary text-center py-3" >
    <label class="mb-0 text-white" >© Copyright - 2021  |  Heidi Wirthlin  |  All Rights Reserved | <a href="https://github.com/hwirthlin11/Final-CS260.git">Github</a> </label>
  </div>



    <!-- <h1>Hello App!</h1> -->
    <!-- <p> -->
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <!-- <router-link to="/login">Go to login</router-link>
      <router-link to="/register">Go to register</router-link>
    </p> -->
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    //HelloWorld,
  },
};
</script>
