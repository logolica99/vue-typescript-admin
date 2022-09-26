import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";


const covidRouter: RouteConfig = {
  path: "/covid",
  component: Layout,
  redirect: "noredirect",
  name: "Covid",
  meta: {
    title: "covidData",
    icon: "chart",
  },

  children: [
    {
      path: "data",

      name: "Country",
      meta: {
        title: "covidCountries",
        noCache: true,
        icon: "chart",
      },
      component: () =>
        import(
          /* webpackChunkName: "bar-chart" */ "@/views/covid/dataChart.vue"
        ),
    },
    {
      path: "data/:country_name",
      name: "Data",
      meta: {
        title: "covidCountryData",
        noCache: true,
        icon: "chart",
      },
      component: () => import("@/views/covid/countryData.vue"),
    },
  ],
};

export default covidRouter;
