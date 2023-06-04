<template>
  <div class="trading-vue-legend" v-bind:style="calc_style">
    <!-- <div>
      <pre>
        {{ indicators[5] }}
      </pre>
    </div> -->

    <div class="t-vue-ind" v-for="(ind,index) in indicators" :key="index">
      <div v-if="
        (ind.id === 'Splines_0' && getShowDisplayButton.ma20) ||
        (ind.id === 'Splines_1' && getShowDisplayButton.ma50) ||
        (ind.id === 'Splines_2' && getShowDisplayButton.ma200) ||
        (ind.id === 'Earnings_0' && getShowDisplayButton.earningDate) ||
        (ind.id === 'InsiderDot_0' && getShowDisplayButton.insidersByTransaction) ||
        (ind.id === 'Earnings1_0' && getShowDisplayButton.insidersSilentPeriod) ||
        (ind.id === 'TextTool_0' && getShowDisplayButton.textTool) ||
        (ind.id === 'NewsTool_0' && getShowDisplayButton.newsTool)
        " style="display:flex">
        <span class="t-vue-iname">{{ind.name}}</span>
        <button-group
          v-bind:buttons="common.buttons"
          v-bind:ov_id="ind.id"
          v-bind:grid_id="grid_id"
          v-bind:index="ind.index"
          v-bind:tv_id="common.tv_id"
          v-bind:display="ind.v"
          v-on:legend-button-click="button_click"
        ></button-group>
        <span class="t-vue-ivalues" v-if="ind.v && ind.name!='Insiders: By Transaction'">
          <span
            class="t-vue-lspan t-vue-ivalue"
            v-for="(v, vIndex) in ind.values"
            :style="{ color: v.color }"
            :key="vIndex"
          >{{v.value}}</span>
        </span>
        <span v-if="ind.unk" class="t-vue-unknown">(Unknown type)</span>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ButtonGroup from "./ButtonGroup.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ChartLegend",
  props: ["common", "values", "grid_id", "meta_props"],
  components: { ButtonGroup },
  // mounted() {
  //   console.log(this.indicators);
  // },
  computed: {
    ...mapGetters([
      'getShowOverlays',
      'getShowDisplayButton'
    ]),
    ohlcv() {
      if (!this.$props.values || !this.$props.values.ohlcv) {
        return Array(6).fill("n/a");
      }
      const prec = this.layout.prec;

      return [
        this.$props.values.ohlcv[1].toFixed(prec),
        this.$props.values.ohlcv[2].toFixed(prec),
        this.$props.values.ohlcv[3].toFixed(prec),
        this.$props.values.ohlcv[4].toFixed(prec),
        this.$props.values.ohlcv[5]
          ? this.$props.values.ohlcv[5].toFixed(2)
          : "n/a"
      ];
    },
    indicators() {
      const values = this.$props.values;
      const f = this.format;
      var types = {};
      
      // console.log(this.json_data);

      return this.json_data
      .filter(x => x.settings.legend !== false && !x.main)
      .map(x => {
        // console.log(x);

        if(!(x.type in types)) {
          types[x.type] = 0;
        }

        const id = x.type + `_${types[x.type]++}`;

        // console.log(id);

        // console.log({
        //   v: x.settings.display,//"display" in x.settings ? x.settings.display : true,
        //   name: x.name || id,
        //   index: this.json_data.indexOf(x),
        //   id: id,
        //   values: values ? f(id, values) : this.n_a(1),
        //   unk: !(id in (this.$props.meta_props || {})),
        //   s: x.settings.show//"show" in x.settings ? x.settings.show:true
        // });

        return {
          v: x.settings.display,//"display" in x.settings ? x.settings.display : true,
          name: x.name || id,
          index: this.json_data.indexOf(x),
          id: id,
          values: values ? f(id, values) : this.n_a(1),
          unk: !(id in (this.$props.meta_props || {})),
          s: x.settings.show//"show" in x.settings ? x.settings.show:true
        };
      });

      // console.log(JSON.parse(JSON.stringify(this.getShowOverlays)));
      // console.log(kul);

      // return kul;
    },
    calc_style() {
      let top = this.layout.height > 150 ? 10 : 5;
      return {
        top: `${this.layout.offset + top}px`
      };
    },
    layout() {
      const id = this.$props.grid_id;
      return this.$props.common.layout.grids[id];
    },
    json_data() {
      // getShowOverlays
      // console.log(this.$props.common.data);
      return this.$props.common.data;
    }
  },
  methods: {
    ...mapMutations([
      'setShowDisplayButton'
    ]),
    format(id, values) {
      let meta = this.$props.meta_props[id] || {};
      // Matches Overlay.data_colors with the data values
      // (see Spline.vue)
      if (!values[id]) return this.n_a(1);

      // Custom formatter
      if (meta.legend) return meta.legend(values[id]);

      return values[id].slice(1).map((x, i) => {
        const cs = meta.data_colors ? meta.data_colors() : [];
        if (typeof x == "number") {
          // Show 8 digits for small values
          x = x.toFixed(x > 0.001 ? 4 : 8);
        }
        return {
          value: x,
          color: cs ? cs[i] : undefined
        };
      });
    },
    n_a(len) {
      return Array(len).fill({ value: "n/a" });
    },
    button_click(event) {
      console.log(event);
      console.log(this.common.data);
      // this.$emit("legend-button-click", event);

      const showDisplayButton = this.getShowDisplayButton;

      if(event.overlay === 'Splines_0') {
        console.log('MA20');

        for(const item of this.common.data) {
          if(item.name === 'MA 20') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.ma20 = false;
        }
      } else if(event.overlay === 'Splines_1') {
        console.log('MA50');

        for(const item of this.common.data) {
          if(item.name === 'MA 50') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.ma50 = false;
        }
      } else if(event.overlay === 'Splines_2') {
        console.log('MA200');

        for(const item of this.common.data) {
          if(item.name === 'MA 200') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.ma200 = false;
        }
      } else if(event.overlay === 'Earnings_0') {
        console.log('Earning Date');

        for(const item of this.common.data) {
          if(item.name === 'Earning Date') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.earningDate = false;
        }
      } else if(event.overlay === 'InsiderDot_0') {
        console.log('Insiders: By Transaction');

        for(const item of this.common.data) {
          if(item.name === 'Insiders: By Transaction') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.insidersByTransaction = false;
        }
      } else if(event.overlay === 'Earnings1_0') {
        console.log('Insiders: Silent Period');

        for(const item of this.common.data) {
          if(item.name === 'Insiders: Silent Period') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.insidersSilentPeriod = false;
        }
      }/* else if(event.overlay === 'PortfolioTransactions_0') {
        console.log('Portfolio Transactions');

        for(const item of this.common.data) {
          if(item.name === 'Portfolio Transactions') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.portfolioTransactions = false;
        }
      }*/ else if(event.overlay === 'TextTool_0') {
        console.log('Journal Notes');

        for(const item of this.common.data) {
          if(item.type === 'TextTool') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.textTool = false;
        }
      } else if(event.overlay === 'NewsTool_0') {
        console.log('News');

        for(const item of this.common.data) {
          if(item.type === 'NewsTool') {
            console.log(item);
            item.settings.display = event.button !== 'remove' ? !item.settings.display : false;
            item.settings.show = event.button !== 'remove' ? true : false;
          }
        }

        if(event.button === 'remove') {
          showDisplayButton.newsTool = false;
        }
      }

      this.setShowDisplayButton(showDisplayButton);
    }
  }
};
</script>
<style>
.trading-vue-legend {
  position: relative;
  z-index: 100;
  font-size: 1.25em;
  margin-left: 10px;
  pointer-events: none;
}

.t-vue-lspan {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  font-size: 0.95em;
  color: #325D85; /* TODO: move => params */
  margin-left: 0.1em;
  margin-right: 1.4em;
}
.t-vue-title {
  margin-right: 0.25em;
  font-size: 1.45em;
  font-weight: 300;
}
.t-vue-ind {
  margin-left: 0.2em;
  margin-bottom: 0.5em;
  font-weight: 400;
  font-size: 1em;
  color: #000000;
}
.t-vue-ivalue {
  margin-left: 0.5em;
}
.t-vue-unknown {
  color: #999999; /* TODO: move => params */
}
</style>
