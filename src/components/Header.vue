<template>
  <div>
    <h1 class="md-display-3 myheader" role="button" @click="goHome">
      liz's bytes
    </h1>
    <md-field md-inline id="seachinputholder">
      <md-icon>search</md-icon>
      <label>Search</label>
      <md-input v-model="searchTerm" v-on:input="searchUpdate" id="searchinput">
      </md-input>
      <md-button @click="searchReset">Reset filters </md-button>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "Header",
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
    },
    goHome() {
      this.$emit("goHome");
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
.myheader {
  margin-top: 0em;
  font-style: italic;
  font-family: "Caveat", cursive;
}
.myheader:hover {
  cursor: pointer;
}
</style>
