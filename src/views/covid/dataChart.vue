<template lang="">
  <div class="countryPage">
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

    <h2 class="title">Select a country</h2>
    <div class="countries">
      <div v-for="country in countries" class="country">
        <router-link :to="`data/${country}`">{{ country }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { LoadingModule } from "@/store/modules/loading";
export default {
  data() {
    return {
      countries: null,
    };
  },

  mounted() {
    this.fetchCountryData();
  },
  created() {
    this.loadingReset();
  },

  methods: {
    fetchCountryData() {
      const options = {
        method: "GET",
        url: "https://covid-193.p.rapidapi.com/countries",

        headers: {
          "X-RapidAPI-Key":
            "e214c47123mshcba1ef9f72f64b6p1cb281jsn5fd07351aa28",
          "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        },
      };
      axios.request(options).then((response) => {
        this.$store.dispatch("InvertLoading");
        return (this.countries = response.data.response);
      });
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

.countryPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 30px;
    color: #232e38;
  }
  .countries {
    text-align: center;
    .country {
      
      margin: 20px 0px;
      font-weight: bold;
      font-size: 20px;
      color: #f7f7f7;
      background: #0b5e56;
      padding: 20px;
      border-radius: 20px;
    }
  }
}
</style>
