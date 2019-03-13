<template>
  <div>
    <!-- <div class="md-elevation-5 md-alignment-horizontal-center"> -->
    <!-- <span class="md-display-3">Mike's Bytes</span> -->
    <md-field md-inline id="seachinputholder">
      <md-icon>search</md-icon>
      <label>Search</label>
      <md-input v-model="searchTerm" v-on:input="searchUpdate" id="searchinput">
      </md-input>
      <md-button @click="searchReset">Reset filters </md-button>
    </md-field>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    searchTerm: String
  },
  data: function() {
    return {};
  },
  methods: {
    searchUpdate: function(event) {
      this.$emit("searchTermUpdated", this.searchTerm);
    },
    searchReset() {
      this.$emit("searchReset");
    }
  }
};
</script>

<style>
#searchinputholder {
  /* background-color: red; */
  flex-grow: 1;
  display: inline;
}
</style>
