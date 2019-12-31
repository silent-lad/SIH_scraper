<template>
  <div class="home">
    <DataTable :Ideas="ideaList" :Table="tableName"></DataTable>
  </div>
</template>

<script>
import DataTable from "../components/DataTable.vue";

export default {
  name: "home",
  data: function() {
    return {
      ideaList: [],
      tableName: "All"
    };
  },
  components: {
    DataTable
  },
  created() {
    this.$http
      .get("https://sih-vue.firebaseio.com/AllIdeas.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let idea = data[i];
          this.ideaList.push(idea);
        }
        console.log(data.length);
      });
  }
};
</script>
