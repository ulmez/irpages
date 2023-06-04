<script>
/* eslint-disable */
// Spline renderer. (SMAs, EMAs, TEMAs...
// you know what I mean)
// TODO: make a real spline, not a bunch of lines...

// Adds all necessary stuff for you.
import Overlay from "../../mixins/overlay.js";
import { mapGetters } from "vuex";

export default {
  name: "Compare",
  mixins: [Overlay],
  methods: {
    meta_info() {
      return { author: "C451", version: "1.0.0" };
    },
    // Here goes your code. You are provided with:
    // { All stuff is reactive }
    // $props.layout -> positions of all chart elements +
    //  some helper functions (see )
    // $props.interval -> candlestick time interval
    // $props.sub -> current subset of candlestick data
    // $props.data -> your indicator's data subset.
    //  Comes "as is", should have the following format:
    //  [[<timestamp>, ... ], ... ]
    // $props.colors -> colors (see TradingVue.vue)
    // $props.cursor -> current position of crosshair
    // $props.settings -> indicator's custom settings
    //  E.g. colors, line thickness, etc. You define it.
    // $props.num -> indicator's layer number (of All
    // layers in the current grid)
    // $props.id -> indicator's id (e.g. EMA_0)
    // ~
    // Finally, let's make the canvas dirty!
    draw(ctx) {
      // console.log(this.$props.data);

      try {
        ctx.lineWidth = this.line_width;
        ctx.strokeStyle = this.color;
        ctx.beginPath();

        const layout = this.$props.layout;
        const i = this.data_index;
        const data = this.$props.data;

        // console.log(data);

        // let data = this.getCompareDatasOnChart[0];//this.$props.data;
        const mainData = this.$props.sub;
        const initValue = data[0][1] + 1;

        // console.log(initValue);

        // try {
        //   initValue = data[0][1] + 1;
        // } catch (error) {
        //   initValue = 19;
        // }

        const data0 = [];

        // console.log('data', data);
        // console.log('mainData', mainData);
        // console.log('compareDatas', this.$store.getters["compareDatas"]);

        // try {
        data.map((item, index) => {
          data0.push([item[0], (mainData[index][1] * item[1]) / initValue]);
        });

        for(var p of data0) {
          const x = layout.t2screen(p[0]);
          const y = layout.$2screen(p[i]);
          ctx.lineTo(x, y);
        }

        ctx.stroke();
      } catch (error) {
        console.log(error.message);
      }
    },

    // For all data with these types overlay will be
    // added to the renderer list. And '$props.data'
    // will have the corresponding values. If you want to
    // redefine the default behviour for a prticular
    // indicator (let's say EMA),
    // just create a new overlay with the same type:
    // e.g. use_for() { return ['EMA'] }.
    use_for() {
      return ["Compare"];
    },

    // Colors for the legend, should have the
    // same dimention as a data point (excl. timestamp)
    data_colors() {
      return [this.color];
    },
  },
  // Define internal setting & constants here
  computed: {
    ...mapGetters(['getCompareDatasOnChart']),
    sett() {
      return this.$props.settings;
    },
    line_width() {
      return this.sett.lineWidth || 0.75;
    },
    color() {
      const n = this.$props.num % 5;
      return this.sett.color || this.COLORS[n];
    },
    data_index() {
      return this.sett.dataIndex || 1;
    },
  },
  data() {
    return {
      COLORS: ["#42b28a", "#5691ce", "#612ff9", "#d50b90", "#ff2316"],
    };
  },
};
</script>
