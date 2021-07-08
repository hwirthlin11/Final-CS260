<template>
  <div>
    <b-container class="bv-example-row ">
       <b-col  cols="12" md="8" sm="8" lg="5" class="login-card">
 <div class="card-custom py-4 px-3 shadow-sm p-3 mb-5 bg-white rounded">
  <h2 class="mx-2 pb-4">Register</h2>
    <b-form @submit="onSubmit" >
       <b-col cols="12">
      <b-form-group
        id="input-group-1"
        label="First Name:"
        label-for="input-1"
        
      >
        <b-form-input
          id="input-1"
          v-model="form.firstName"
          type="text"
          placeholder="Enter first name"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
<b-col cols="12">
      <b-form-group
        id="input-group-1"
        label="Last Name:"
        label-for="input-1"
        
      >
        <b-form-input
          id="input-1"
          v-model="form.lastName"
          type="text"
          placeholder="Enter last name"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
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
        label-for="input-1">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>
       </b-col>


        <b-col  class="text-center mt-4">
      <b-button type="submit" variant="success" class="col-lg-6">Register</b-button>
        </b-col>
    </b-form>
    
  </div>
       </b-col>
</b-container>
  </div>
</template>

<script>
import axios from "axios"
import {parseErrorMessage} from "../helper"
import {BASE_URL} from "../constants"
export default {
  name: "Register",
  data() {
      return {
        form: {
          email: '',
          password: '',
          firstName: '',
          lastName: ''
        },
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
       // alert(JSON.stringify(this.form))
         axios
        .post(BASE_URL + "/api/auth/register", this.form)
        .then((response)=> {
          if (
            response.data &&
            response.data.data &&
            response.data.status == 1
          ) {
             this.$router.push('/login')
          } else {
            alert("something went wrong");
          }
        })
        .catch((error)=> {
          alert(parseErrorMessage(error));
        });
    
       
      }
    }
};
</script>
