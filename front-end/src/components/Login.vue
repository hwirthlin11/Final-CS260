<template>
  <div>
    
    <b-container class="bv-example-row">
       <b-col  cols="12" md="8" sm="8" lg="5" class="login-card">
 <div class="card-custom py-4 px-3 shadow-sm p-3 mb-5 bg-white rounded ">
  <h2 class="mx-2 pb-4">Login</h2>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-col cols="12">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
        
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
       <b-col cols="12">
<b-form-group
        id="input-group-2"
        label="Password:"
        class="mb-4"
        label-for="input-1"
        
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>
       </b-col>
        <b-col  class="text-center">
      <b-button type="submit" variant="success" class="col-lg-6">Login</b-button>
        </b-col>
    </b-form>
    
  </div>
       </b-col>
</b-container>
  </div>
</template>

<script>
export default {
  name: "Login",
   data() {
      return {
        form: {
          email: '',
          password: '',
        }
      }
    }
    ,
    methods: {
      onSubmit(event) {
        event.preventDefault()
        //alert(JSON.stringify(this.form))
        this.$store.dispatch('login',this.form)
          .then((res)=>{
            if(res)
            {
            this.$router.push('/dashboard')
            }
          }
            )
          .catch((error)=>{
            alert(error);
          });

      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
      }
    }
};
</script>
