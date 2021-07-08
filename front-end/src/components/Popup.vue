<template>
 <div>
  <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button>

  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
     Popup
    </template>
    <div class="d-block">
      <div>
    <label for="timepicker-invalid">Choose a time </label>
      <b-form-timepicker v-model="value" locale="en" class="mb-3"></b-form-timepicker>

   <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-4"></b-form-datepicker>
  </div>
    </div>
    <div class="text-center">
    <b-button class=" col-lg-6 text-center"  variant="success"   @click="$bvModal.hide('bv-modal-example')">Book</b-button>
  </div>
  </b-modal>
</div>
</template>

<script>
export default {
  name: "Popup",
};
</script>
