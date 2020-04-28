<template>
  <div id="report_card">
    <v-card v-ripple class="mx-auto" max-width="344" outlined>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
          <v-list-item-subtitle class="title">{{subtitle | currency}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ReportCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>