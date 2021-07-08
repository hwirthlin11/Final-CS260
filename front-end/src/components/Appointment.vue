<template>
  <div>
    
  <b-button style="
    margin-top: 10px;
    margin-left: 10px;
" variant="outline-primary" @click="back()"> <b-icon-arrow-left></b-icon-arrow-left></b-button>

  <div class="container my-4">

<h3 class="mb-4 ml-1">Appointment</h3>
     <div>
    <b-table sticky-header class="bg-light" :items="items" :fields="fields" hover responsive="sm">
      <template #cell(action)="row">
        <div class="d-flex">
        <b-button size="sm" variant="danger"  @click="deleteAppointment(row.item.id)" class="px-4 mr-2">
        Delete
        </b-button>
         <b-button size="sm" variant="success"  @click="bookPopUp(row.item, $event.target)" class="px-4">
        Update
        </b-button>
</div>
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
    <b-button class=" col-lg-6 text-center"  variant="success"   @click="bookPopUpSubmit($event.target)">Update</b-button>
  </div>
  </b-modal>
  </div>
</template>

<script>
import axios from "axios"
import {parseErrorMessage} from "../helper"
import {BASE_URL} from "../constants"

export default {
  name: "Appointment",
   data() {
      return {
         bookTime:'',
        bookDate:'',
        selectedItem:{},
        fields: ['Service','Date','Time', 'Action' ],
        items: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          
        }
      }
    },
    methods:{
      back(){
        this.$router.push("/dashboard")
      },
      deleteAppointment(id)
      {
  var x;
     if (confirm("Are you sure?") == true) {
         
        
         axios
        .delete(BASE_URL + "/api/appointment/"+id,{headers: { 'Authorization': `Bearer ${this.$store.state.user.token}` }})
        .then((response)=> {
          if (
            response.data &&
            response.data.status == 1
          ) {
            alert("you appointement has been deleted");
            this.items=[];
            this.loadAppointments();
          } else {
            alert("something went wrong");
          }
        })
        .catch((error)=> {
          alert(parseErrorMessage(error));
        });
     } else {
         x = "You pressed Cancel!";
     }
     return x; 
      },
       bookPopUp(item, button) {
        this.infoModal.title = `Book`
        this.selectedItem=item;
        this.bookTime=item.Time;
        this.bookDate=item.Date;
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      bookPopUpSubmit(button)
      {
        let payload={date:this.bookDate,time:this.bookTime};
        
         axios
        .put(BASE_URL + "/api/appointment/"+this.selectedItem.id, payload,{headers: { 'Authorization': `Bearer ${this.$store.state.user.token}` }})
        .then((response)=> {
          if (
            response.data &&
            response.data.data &&
            response.data.status == 1
          ) {
            alert("you appointement has been updated");
            this.items=[];
            this.loadAppointments();
          } else {
            alert("something went wrong");
          }
        })
        .catch((error)=> {
          alert(parseErrorMessage(error));
        });
        this.$root.$emit('bv::hide::modal', this.infoModal.id, button)
      },
      loadAppointments(){
      axios
        .get(BASE_URL + "/api/appointment",{headers: { 'Authorization': `Bearer ${this.$store.state.user.token}` }})
        .then((response)=> {
          console.log(response);
          if (
            response.data &&
            response.data.data &&
            response.data.status == 1
          ) {
            response.data.data.forEach(element => {
              let _item={   Service: element.serviceName ,Date:element.date  ,  Time:element.time,id:element._id }
              this.items.push(_item)
            });
            
          } else {
            alert("something went wrong");
          }
        })
        .catch((error)=> {
          alert(parseErrorMessage(error));
        });
      }
    },
    mounted()
    {
      this.loadAppointments();
    }
    
};
</script>