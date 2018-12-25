<template>
  <div class="home">
    <DataTable :Ideas="ideaList"></DataTable>
  </div>
</template>

<script>
import sih from "../assets/sih.json";
import DataTable from "../components/DataTable.vue";

export default {
  name: "home",
  data: function() {
    return {
      ideaList: sih
    };
  },
  components: {
    DataTable
  }
};
</script>
