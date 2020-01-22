<template>
  <v-navigation-drawer
    app
    absolute
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    permanent
  >
    <v-list>
      <v-list-item v-for="([icon, text, url], i) in items" :key="i" link @click="$router.push('/' + url)">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Drawer",
  data: () => ({
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
