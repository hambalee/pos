<template>
  <div id="report_minimum">
    <v-data-table
      :headers="headers"
      :items="minimumProducts"
      :items-per-page="5"
      class="elevation-1"
      sort-by="ratio"
    >
      <template v-slot:item.quantityPerUnit="{ item }">
        <v-chip :color="getColor(item.ratio)" dark>{{ item.quantityPerUnit }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReportMinimum',
  data() {
    return {
      headers: [
        {
          text: 'ชื่อสินค้า',
          align: 'start',
          sortable: false,
          value: 'productName'
        },
        { text: 'จำนวนสินค้า', value: 'quantityPerUnit' },
        { text: 'จำนวนขั้นต่ำ', value: 'stockMinimum' },
        // { text: 'อัตราส่วน', value: 'ratio' }
        { text: 'อัตราส่วน', value: 'ratio', align: ' d-none' }
      ],
    }
  },
  created() {
    this.$store.dispatch('products/fetchProducts')
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
      minimumProducts: state => state.products.minimumProducts
    })
  },
  methods: {
    getColor(ratio) {
      if (ratio < 0.5) return 'red'
      else if (ratio < 1) return 'orange'
      else return 'green'
    }
  }
}
</script>

<style scoped>
</style>