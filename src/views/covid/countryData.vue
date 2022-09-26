<template lang="">
  <div class="dataPage">
    <el-dialog
      :visible="$store.state.loading.loading"
      width="20%"
      center
      :show-close="false"
    >
      <div class="loader">
        <img src="./assets/loader.gif" alt="" />
      </div>
    </el-dialog>

    <h2 class="countryName">{{ $route.params.country_name }}</h2>
    <h3 class="title totalCases">Coronavirus Cases:</h3>
    <h4 v-if="statistics != null" class="totalCases">
      {{ statistics[0]["cases"]["total"] }}
    </h4>
    <h3 class="title deaths">Deaths:</h3>
    <h4 v-if="statistics != null" class="deaths">
      {{ statistics[0]["deaths"]["total"] }}
    </h4>
    <h3 class="title recovered">Recovered:</h3>
    <h4 v-if="statistics != null" class="recovered">
      {{ statistics[0]["cases"]["recovered"] }}
    </h4>
    <div class="graphs">
      <DataGraph
        :xAxisData="dailyActiveCasesX"
        :yAxisData="totalCasesY"
        id="chart1"
        color="blue"
        :title="'Total Coronavirus Cases in ' + $route.params.country_name"
      />
    </div>

    <div>
      <DataGraph
        id="chart3"
        :xAxisData="dailyActiveCasesX"
        :yAxisData="dailyActiveCasesY"
        color="green"
        :title="'Active Cases in ' + $route.params.country_name"
      />
    </div>
    <div>
      <DataGraph
        id="chart4"
        color="red"
        :xAxisData="dailyActiveCasesX"
        :yAxisData="totalDeathsY"
        :title="'Total Coronavirus Deaths in ' + $route.params.country_name"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DataGraph from "@/views/covid/DataGraph";
import { LoadingModule } from "@/store/modules/loading";

export default {
  components: {
    DataGraph,
  },
  data() {
    return {
      centerDialogVisible: false,
      statistics: null,
      historyData: null,
      indexes: null,
      dailyActiveCasesX: [],
      dailyActiveCasesY: [],

      totalCasesY: [],
      totalDeathsY: [],
    };
  },
  created() {
    this.loadingReset();
    this.checkIfValid();
  },
  mounted() {
    this.fetchStatistic();
    this.fetchHistory();
  },
  methods: {
    fetchStatistic() {
      const options = {
        method: "GET",
        url: "https://covid-193.p.rapidapi.com/statistics",
        params: { country: this.$route.params.country_name },
        headers: {
          "X-RapidAPI-Key":
            "e214c47123mshcba1ef9f72f64b6p1cb281jsn5fd07351aa28",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((response) => (this.statistics = response.data.response))
        .catch(function (error) {
          console.error(error);
        });
    },
    fetchHistory() {
      const options = {
        method: "GET",
        url: "https://covid-193.p.rapidapi.com/history",
        params: { country: this.$route.params.country_name },
        headers: {
          "X-RapidAPI-Key":
            "e214c47123mshcba1ef9f72f64b6p1cb281jsn5fd07351aa28",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then((response) => {
          const historyData = response.data.response;
          let day = [];
          let dailyActive = [];

          let totalCases = [];
          let totalDeaths = [];

          for (let data of historyData) {
            day.push(data.day);
            dailyActive.push(data.cases.active);
            totalCases.push(data.cases.total);
            totalDeaths.push(data.deaths.total);
          }
          this.setActiveDailyCasesAxisData(
            day,
            dailyActive,
            totalCases,
            totalDeaths
          );
          this.$store.dispatch("InvertLoading");

          // this.saveData(indexes, response.data.response);
          // return (this.historyData = response.data.response);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    checkIfValid() {
      if(this.$route.params.country_name===":country_name"){
      name: "Country",
        this.$router.push({name:"Country"});
      }
    },

    setActiveDailyCasesAxisData(day, dailyActive, totalCases, totalDeaths) {
      this.dailyActiveCasesX = day;
      this.dailyActiveCasesY = dailyActive;
      this.totalCasesY = totalCases;
      this.totalDeathsY = totalDeaths;
    },
    loadingReset() {
      this.$store.dispatch("InvertLoading");
    },
  },
};
</script>
<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
}

.dataPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .countryName {
    font-size: 53px;
    margin: 0px;
    margin-top: 30px;
    color: #232e38;
  }
  .title {
    font-size: 26px;
    font-weight: 800;
    margin: 20px 0px;

    margin-top: 40px;
  }
  > h4 {
    margin: 0px;
    font-size: 20px;
    font-weight: 800;
  }
  .totalCases {
    color: #654b4b;
  }
  .deaths {
    color: #ed3333;
  }
  .recovered {
    color: #0b980b;
  }
  .graphs {
    margin-top: 62px;
  }
}
</style>
