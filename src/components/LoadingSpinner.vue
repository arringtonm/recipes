<template>
  <div class="spinner-container">
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner"
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  width: 100%;
  height: 80vh;
}
.md-progress-spinner {
  margin: auto auto;
}
</style>
