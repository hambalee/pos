<template>
  <div id="drawer">
    <v-app-bar app dense flat dark hide-on-scroll color="primary" class="">
      <v-btn text @click.stop="drawer = !drawer" class="">
        <i class="material-icons">menu</i>
      </v-btn>
      <v-toolbar-title>ร้านมุมินการค้า</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--       <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      width="200"
      id="drawer"
      app
      absolute
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
    <v-img :aspect-ratio="1/1" src="">
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <!-- <div class="subheading">ระบบจัดการร้านวัสดุก่อสร้าง</div> -->
            <div class="body-1"></div>
          </v-col>
        </v-row>
      </v-img>
      <!-- <hr> -->
      <v-list>
        <v-list-item-group mandatory color="white">
          <v-list-item
            v-for="([icon, text, url], i) in items"
            :key="i"
            link
            @click="onClickMenu(url)"
            shaped
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
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
      ["view_comfortable", "คลังสินค้า", "/stock"],
      ["shopping_cart", "หน้าร้าน", "/shop"],
      ["show_chart", "รายงาน", "/report"],
      // ["history", "ประวัติ", "/transaction"]
    ]
  }),
  methods: {
    onClickMenu(url) {
      this.$router.push(url).catch(err => err);
    }
  }
};
</script>

<style></style>
