<template>
  <v-content>
    <div id="core-views">
      <v-container>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </div>
  </v-content>
</template>

<script>
export default {
  name: "Views"
};
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
