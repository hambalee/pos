<template>
  <div id="drawer">
    <v-toolbar clipped-left class="hidden-lg-and-up">
      <v-btn
        text
        @click.stop="drawer = !drawer"
        class="hidden-lg-and-up"
      >
        <i class="material-icons">menu</i>
      </v-btn>
      <!--       <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items> -->
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      width="200"
      id="drawer"
      app
      absolute
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list>
        <v-list-item
          v-for="([icon, text, url], i) in items"
          :key="i"
          link
          @click="$router.push('/' + url)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  data: () => ({
    drawer: null,
    items: [
      ["view_comfortable", "Stock", "stock"],
      ["shopping_cart", "Shop", "shop"],
      ["show_chart", "Report", "report"],
      ["history", "Transaction", "transaction"]
    ]
  })
};
</script>

<style></style>
