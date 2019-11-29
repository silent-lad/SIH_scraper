<template>
  <div class="home">
    <!-- <button
      class="btn btn-outline-primary"
    >REFRESH</button> -->
    <DataTable
      :Ideas="ideaList"
      :Table="tableName"
    ></DataTable>
  </div>
</template>

<script>
import sih from "../assets/sih.json";
import DataTable from "../components/DataTable.vue";

export default {
  name: "home",
  data: function() {
    return {
      ideaList: [],
      tableName: "Selected"
    };
  },
  components: {
    DataTable
  },

  created() {
    this.$http
      .get("https://sih-vue.firebaseio.com/slectedIdeas.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        for (var idea in data) {
          this.ideaList.push(data[idea]);
        }
        // data.forEach(idea => {
        //   this.ideaList.push(idea);
        // });
        // for (let i = 0; i < data.length; i++) {
        //   let idea = data[i];
        //   this.ideaList.push(idea);
        // }
        console.log(data.length);
      });
  }
};
</script>
