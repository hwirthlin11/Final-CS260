<template>
  <div>

<b-button style="
    margin-top: 10px;
    margin-left: 10px;
" variant="outline-primary" @click="back()"> <b-icon-arrow-left></b-icon-arrow-left></b-button>

  <div class="container my-4">

    <h3 class="mb-4 ml-1">Service</h3>
     <div>
    <b-table sticky-header class="bg-light" :items="items" :fields="fields" hover responsive="sm">
      <template #cell(action)="row">
        <b-button  size="md" variant="success"  @click="bookPopUp(row.item, $event.target)" class="px-4">
         Book
        </b-button>

        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->

      </template>


    </b-table>
  </div>


  </div>
<!-- Pop up-->
  <b-modal :id="infoModal.id" :title="infoModal.title" ok-only  hide-footer>
    <template #modal-title>
     Popup
    </template>
    <div class="d-block">
      <div>
    <label for="timepicker-invalid">Choose a time </label>
      <b-form-timepicker v-model="bookTime" locale="en" class="mb-3"></b-form-timepicker>

   <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" v-model="bookDate" class="mb-4"></b-form-datepicker>
  </div>
    </div>
    <div class="text-center">
    <b-button class=" col-lg-6 text-center"  variant="success"   @click="bookPopUpSubmit($event.target)">Book</b-button>
  </div>
  </b-modal>
  </div>
</template>

<script>
import axios from "axios"
import {parseErrorMessage} from "../helper"
import {BASE_URL} from "../constants"
export default {
  name: "Service",
  data() {
      return {
        bookTime:'',
        bookDate:'',
        selectedItem:{},
        fields: ['Service', 'Action' ],
        items: [
          {  id:1, Service: 'Oil Change' },
          {  id: 2, Service: 'Engine Tuning' },
          {  id: 3, Service: 'Suspension Tuning' },


        ],
        infoModal: {
          id: 'info-modal',
          title: '',

        }
      }
    },
    methods:{
       bookPopUp(item, button) {
        this.infoModal.title = `Book`
        this.selectedItem=item;
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      bookPopUpSubmit(button)
      {
        let payload={date:this.bookDate,time:this.bookTime,serviceId:this.selectedItem.id,serviceName:this.selectedItem.Service}

         axios
        .post(BASE_URL + "/api/appointment", payload,{headers: { 'Authorization': `Bearer ${this.$store.state.user.token}` }})
        .then((response)=> {
          if (
            response.data &&
            response.data.data &&
            response.data.status == 1
          ) {
            alert("Congrats! Your appointement has been booked.");
          } else {
            alert("something went wrong");
          }
        })
        .catch((error)=> {
          alert(parseErrorMessage(error));
        });
        this.$root.$emit('bv::hide::modal', this.infoModal.id, button)
      },
      back(){
        this.$router.push("/dashboard")
      }
    }
};
</script>
