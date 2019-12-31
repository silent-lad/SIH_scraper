<template>
  <div class="col-md-12">
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        v-model="search"
        placeholder="Search"
      />
      <input type="number" v-model="pageSize" />
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered" style="width:100%">
        <thead width="400px">
          <tr>
            <th scope="col">#</th>
            <th scope="col" @click="sort('title')">
              Title <i class="fas fa-sort-alpha-down float-right"></i>
            </th>
            <th scope="col" @click="sort('description')">
              Description<i class="fas fa-sort-alpha-down float-right"></i>
            </th>
            <th scope="col">Organistion</th>
            <th @click="sort('complexity')" scope="col">PS No.</th>
            <th scope="col">Bucket</th>
            <th scope="col">Youtube Link</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(idea, index) in (sortedActivity, filteredList)"
            :key="index"
            :class="idea.category"
          >
            <td>{{ index + 1 }}</td>
            <td @click="toggleSelect(idea, index)">{{ idea.title }}</td>
            <td>{{ idea.description }}</td>
            <td>{{ idea.organisation }}</td>
            <td>{{ idea.psNum }}</td>
            <td>{{ idea.bucket }}</td>
            <td>
              <a :href="idea.youtubeLink">{{ idea.youtubeLink }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="prevPage" class="float-left btn btn-outline-info btn-sm">
      <i class="fas fa-arrow-left"></i> Previous
    </button>
    <button @click="nextPage" class="float-right btn btn-outline-info btn-sm">
      Next <i class="fas fa-arrow-right"></i>
    </button>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data: () => ({
    currentSort: "name",
    currentSortDir: "asc",
    search: "",
    searchSelection: "",
    pageSize: 5,
    currentPage: 1
  }),
  props: {
    Ideas: Array,
    Table: String
  },
  methods: {
    toggleSelect: function(idea, index) {
      if (confirm("Are you sure about your actions??")) {
        if (this.Table == "All") {
          var selectedIdeas = this.$http
            .get("https://sih-vue.firebaseio.com/slectedIdeas.json")
            .then(res => {
              if (res.body == null) {
                res.body = [];
              }
              res.body.unshift(idea);
              this.$http
                .put(
                  "https://sih-vue.firebaseio.com/slectedIdeas.json",
                  res.body
                )
                .then(
                  response => console.log(response),
                  err => console.log(err)
                );
            });
          // var selectedIdeas = [];

          // this.Ideas.splice(this.Ideas.indexOf(idea), 1);
          // this.$http
          //   .put("https://sih-vue.firebaseio.com/slectedIdeas.json", this.Ideas)
          //   .then(response => console.log(response), err => console.log(err));
        } else {
          console.log(idea);
          var selectedIdeas = this.$http
            .get("https://sih-vue.firebaseio.com/slectedIdeas.json")
            .then(res => {
              console.log(index);
              res.body.splice(index, 1);
              res.body.indexOf(idea);
              console.log(res.body.indexOf(idea));
              this.$http
                .put(
                  "https://sih-vue.firebaseio.com/slectedIdeas.json",
                  res.body
                )
                .then(
                  response => {
                    console.log(response);
                    this.refresh();
                  },
                  err => console.log(err)
                );
              // }
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
    },
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    nextPage: function() {
      if (this.currentPage * this.pageSize < this.Ideas.length)
        this.currentPage++;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    },
    refresh: function() {
      console.log("hahhahahah");

      this.$http
        .get("https://sih-vue.firebaseio.com/slectedIdeas.json")
        .then(res => {
          this.Ideas = res.body;
        });
    }
  },
  computed: {
    sortedActivity: function() {
      return this.Ideas.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    },
    filteredList() {
      return this.Ideas.filter(data => {
        let title = data.title.toLowerCase().match(this.search.toLowerCase());
        let description = data.description
          .toLowerCase()
          .match(this.search.toLowerCase());
        let org = data.organisation
          .toLowerCase()
          .match(this.search.toLowerCase());
        let complexity = data.complexity
          .toLowerCase()
          .match(this.search.toLowerCase());
        // let phone = data.phone.toLowerCase().match(this.search.toLowerCase());
        // return email || name || city || phone;
        return title || description || org || complexity;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    }
  }
};
</script>

<style>
.Software {
  background: rgba(0, 0, 200, 0.1);
}
.Hardware {
  background: rgba(200, 0, 0, 0.1);
}
th {
  cursor: pointer;
  /* width: 500px !important; */
  white-space: nowrap;
}
tr {
  white-space: normal;
}
td {
  border: 1px solid red;
  padding: 10px;
}
td:nth-child(2),
td:nth-child(1),
td:nth-child(4) {
  font-weight: 900;
}
</style>