<template>
  <div>
  <!-- <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand href="#">Mechanic</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>


  </b-navbar> -->


<b-container class="py-4">
  <b-col class="text-center flex-fill">
      <router-link to="/dashboard/service">
 <b-button size="lg" class="mx-4 px-5 mb-4" variant="primary">Book a Service</b-button>
      </router-link>
      <router-link to="/dashboard/appointement">
  <b-button size="lg" variant="success" class=" mb-4">My Appointments</b-button>
      </router-link>
  </b-col>
</b-container>


</div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>
