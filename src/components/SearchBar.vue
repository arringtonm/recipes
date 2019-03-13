<template>
  <div>
    <md-field md-inline>
      <md-icon>search</md-icon>
      <label>Search</label>
      <md-input v-model="searchTerm" v-on:input="searchUpdate"> </md-input>
    </md-field>
  </div>
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
    }
  }
};
</script>

<style></style>
