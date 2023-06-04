<template>
  <!-- the template must be implemented in similar way to the rest. will be done after look'n'feel is ok -->
  <div class="trading-vue-data-toolbar" :style="styles" style="z-index:10 !important; border: 0px solid green;">
    <div class="trading-vue-data-toolbar-container">
      <div class="trading-vue-data-toolbar-date">
        <div class="trading-vue-data-toolbar-company-name">
          <span
            class="company-name"
            style="color: rgba(0,0,0,.4); font-size: 12px; font-weight: 500; text-transform: uppercase; border: 0px solid"
          >{{title_txt}}</span>
        </div>
        <!-- <div class="trading-vue-data-toolbar-compare" @click="activeCompare=true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
            <path
              fill="currentColor"
              d="M13.5 6a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM4 14.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"
            />
            <path fill="currentColor" d="M9 14h4v-4h1v4h4v1h-4v4h-1v-4H9v-1z" />
          </svg>
          {{this.$t('Compare')}}
        </div> -->
        <div class="chart-toolbar-date-container">
          <div
            class="trading-vue-data-toolbar-item"
            :class="{'active':range=='10y'}"
            @click="filterDay(10,'y')"
          >{{this.$t('ten_years')}}</div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{'active':range=='5y'}"
            @click="filterDay(5,'y')"
          >{{this.$t('five_years')}}</div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{'active':range=='3y'}"
            @click="filterDay(3,'y')"
          >{{this.$t('three_years')}}</div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{'active':range=='1y'}"
            @click="filterDay(1,'y')"
          >{{this.$t('one_year')}}</div>
          <!-- <div class="trading-vue-data-toolbar-item" @click="filterDay('','y')">All</div> -->
        </div>
        <div class="chart-toolbar-date-container">
          <div
            class="trading-vue-data-toolbar-item"
            :class="{'active':interval=='30interval'}"
            @click="filterDay(30,'interval')"
          >M</div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{'active':interval=='7interval'}"
            @click="filterDay(7,'interval')"
          >{{this.$t('W_V')}}</div>
          <div
            class="trading-vue-data-toolbar-item"
            :class="{'active':interval=='1interval'}"
            @click="filterDay(1,'interval')"
          >D</div>
          <!-- <div class="trading-vue-data-toolbar-item" @click="filterDay('','')">All</div> -->
        </div>
        <div class="trading-vue-line-type">
          <div
            class="btn-line-type res"
            :class="{'active':lineType=='Candles'}"
            @click="chnLineType('Candles')"
          >
          </div>
          <div
            class="btn-line-type spline"
            :class="{'active':lineType=='Spline'}"
            @click="chnLineType('Spline')"
          >
          </div>
        </div>
        <div class="trading-vue-line-type"></div>
      </div>
     <!-- this is the drop down menu -->
      <div class="trading-vue-legend-group"> 
        <div class="trading-vue-legend-group-title" @click="showLegends=!showLegends">
          <span style="color:#081016;">{{this.$t('Overlays')}}</span>
          <v-icon v-if="showLegends" style="font-size:1.8em; color:#081016;">mdi-chevron-up</v-icon>
          <v-icon v-else style="font-size:1.8em; color:#081016;">mdi-chevron-down</v-icon>
        </div>
        <ul v-show="showLegends">
          <template v-for="(caption, cIndex) in orders" @key="'C'+cIndex">
            <li class="divider" :key="`L_${cIndex}`" v-if="cIndex > 0 && regendsByCaption(caption).length > 0"/>
              <!-- :class="{'ma-start': item.overlay=='Ma 20' , 'ma-end': item.overlay =='Ma 200'} " -->
            <li
              v-for="(item, index) in regendsByCaption(caption)"
              @click="regend_click(item)"
              :key="`i_${cIndex}_${index}`"
              class="d-flex align-center"
            >
            <!-- <v-icon size="15px" class="mr-1" color="grey" v-if="item.display">check</v-icon> -->
            <v-icon size="15px" class="mr-1" color="grey" v-if="(item.overlay === getMa20.name && getMa20.settings.display) || (item.overlay === getMa20.name && getShowDisplayButton.ma20)">check</v-icon>
            <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getMa50.name && getMa50.settings.display) || (item.overlay === getMa50.name && getShowDisplayButton.ma50)">check</v-icon>
            <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getMa200.name && getMa200.settings.display) || (item.overlay === getMa200.name && getShowDisplayButton.ma200)">check</v-icon>
            <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getEarningDate.name && getEarningDate.settings.display) || (item.overlay === getEarningDate.name && getShowDisplayButton.earningDate)">check</v-icon>
            <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getInsidersByTransaction.name && getInsidersByTransaction.settings.display) || (item.overlay === getInsidersByTransaction.name && getShowDisplayButton.insidersByTransaction)">check</v-icon>
            <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getInsidersSilentPeriod.name && getInsidersSilentPeriod.settings.display) || (item.overlay === getInsidersSilentPeriod.name && getShowDisplayButton.insidersSilentPeriod)">check</v-icon>
            <!-- <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getPortfolioTransactions.name && getPortfolioTransactions.settings.display) || (item.overlay === getPortfolioTransactions.name && getShowDisplayButton.portfolioTransactions)">check</v-icon> -->
            <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getJournalNotes.name && getJournalNotes.settings.display) || (item.overlay === getJournalNotes.name && getShowDisplayButton.textTool)">check</v-icon>
            <v-icon size="15px" class="mr-1" color="grey" v-else-if="(item.overlay === getNews.name && getNews.settings.display) || (item.overlay === getNews.name && getShowDisplayButton.newsTool)">check</v-icon>
            <v-icon size="15px" class="mr-1" v-else style="opacity:0">check</v-icon>
              {{item.overlay}}
            </li>
          </template>
          <template v-if="false">
            <li
              class="d-flex align-center"  
              @click="trade_history_status"
            >
            <v-icon size="15px" class="mr-1" color="grey" v-if="this.tradeHistoryStatus">check</v-icon>
            <v-icon size="15px" class="mr-1" v-else style="opacity:0">check</v-icon>
              Porfolio Trade History
            </li>
          </template>
        </ul>
      </div>
    </div>
    <!-- <compare-data :open="activeCompare" @close="activeCompare=false" @chnData="filterDay" /> -->
  </div>
</template>

<script>
/* eslint-disable */
import Icons from "../stuff/icons.json";
// import CompareData from "./CompareData";
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "DataToolbar",
  // components: {
  //   CompareData
  // },
  props: ["data", "height", "colors", "tv_id", "config", "width", "title_txt"],
  data() {
    return {
      orders: [
        ['Earning Date', 'MA 20' , 'MA 50', 'MA 200'],
        ['Insiders: By Transaction' , 'Insiders: Silent Period'],
        'Compare',
        // ['Portfolio Transactions'],
        ['Portfolio Trade History'],
        ['Journal Notes'],
        ['News']
      ],
      interval: "1interval",
      activeCompare: false,
      tool_count: 0,
      range: "5y",
      lineType: "Spline",
      showLegends: false,
      tradeHistoryStatus: true,
    };
  },
  mounted() {},
  methods: {
    ...mapMutations([
      'setShowOverlays',
      'setShowDisplayButton'
    ]),
    trade_history_status() {
      if(this.tradeHistoryStatus === false){
        this.tradeHistoryStatus = true;
      }
      else {
        this.tradeHistoryStatus = false;
      }
      this.$emit("legend-button-click", {
        button: "trade_history",
        dataIndex: 9,
        grid: 0,
        overlay: "TradeHistory_1",
        type: "onchart",
        tradeHistoryStatus: this.tradeHistoryStatus
      });
      this.showLegends = false;

    },
    regend_click(item) {
      console.log(item);
      console.log(this.$props.data.onchart);

      const showDisplayButton = this.getShowDisplayButton;

      if(item.overlay === 'MA 20') {
        showDisplayButton.ma20 = !showDisplayButton.ma20;
      } else if(item.overlay === 'MA 50') {
        showDisplayButton.ma50 = !showDisplayButton.ma50;
      } else if(item.overlay === 'MA 200') {
        showDisplayButton.ma200 = !showDisplayButton.ma200;
      } else if(item.overlay === 'Earning Date') {
        showDisplayButton.earningDate = !showDisplayButton.earningDate;
      } else if(item.overlay === 'Insiders: By Transaction') {
        showDisplayButton.insidersByTransaction = !showDisplayButton.insidersByTransaction;
      } else if(item.overlay === 'Insiders: Silent Period') {
        showDisplayButton.insidersSilentPeriod = !showDisplayButton.insidersSilentPeriod;
      }/* else if(item.overlay === 'Portfolio Transactions') {
        showDisplayButton.portfolioTransactions = !showDisplayButton.portfolioTransactions;
      }*/ else if(item.overlay === 'Journal Notes') {
        showDisplayButton.textTool = !showDisplayButton.textTool;
      } else if(item.overlay === 'News') {
        showDisplayButton.newsTool = !showDisplayButton.newsTool;
      }

      this.setShowDisplayButton(showDisplayButton);

      this.showLegends = false;
      this.$emit("legend-button-click", item);
    },
    chnLineType(type) {
      this.lineType = type;
      this.$emit("chnLineType", type);
    },
    filterDay(val, key) {
      this.activeCompare = false;
      var now = new Date();
      var to = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      );
      var from = "";
      if (key == "y") {
        this.range = val + key;

        if (val == "") this.$emit("chnInterval", val);
        else {
          from = new Date(
            now.getFullYear() - val,
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          );
          this.$emit("chnDateFilter", from.getTime(), to.getTime());
        }
      } else if (key == "interval") {
        this.interval = val + key;

        this.$emit("chnInterval", val);
      } else if (key == "") {
        this.range = "";
        this.interval = "";
        this.$emit("chnInterval", val);
      }
    },
    /**
     * Removing element of array that have duplicate element.
     */
    uniqBy(arr, key) {
        let seen = new Set();
        return arr.filter(item => {
            let k = item[key];
            return seen.has(k) ? false : seen.add(k);
        });
    }
  },
  computed: {
    ...mapGetters([
      'getShowOverlays',
      'getShowDisplayButton'
    ]),
    getMa20() {
      return this.$props.data.onchart.find((c) => c.name === 'MA 20');
    },
    getMa50() {
      return this.$props.data.onchart.find((c) => c.name === 'MA 50');
    },
    getMa200() {
      return this.$props.data.onchart.find((c) => c.name === 'MA 200');
    },
    getEarningDate() {
      return this.$props.data.onchart.find((c) => c.name === 'Earning Date');
    },
    getInsidersByTransaction() {
      return this.$props.data.onchart.find((c) => c.name === 'Insiders: By Transaction');
    },
    getInsidersSilentPeriod() {
      return this.$props.data.onchart.find((c) => c.name === 'Insiders: Silent Period');
    },
    // getPortfolioTransactions() {
    //   return this.$props.data.onchart.find((c) => c.name === 'Portfolio Transactions');
    // },
    getJournalNotes() {
      return this.$props.data.onchart.find((c) => c.name === 'Journal Notes');
    },
    getNews() {
      return this.$props.data.onchart.find((c) => c.name === 'News');
    },
    base64() {
      return item => {
        return Icons[item];
      };
    },
    regendsByCaption() {
      return (caption) => {
        let regends = this.regends
        if(caption == 'Compare') {
          return regends.filter(item => caption == item.chart_type)
        }

        return regends.filter(item => caption.indexOf(item.overlay) > -1)
      }

    },
    regends() {
      let chartData = this.$props.data;
      var regends = [];
      var show = true;
      if(chartData.onchart) {
        chartData.onchart.map((item, index) => {
          if(item.settings.legend === false) return
          show = item.settings.show === undefined ? true : item.settings.show;
          regends.push({
            chart_type: item.type,
            display: show ,
            button: "remove",
            dataIndex: index,
            overlay: item.name,
            grid: 0,
            type: "onchart"
          });
        })
      }
      
      if (chartData.offchart !== undefined) {
       chartData.offchart.map((item, index) => {
          if(item.settings.legend === false) return
          show = item.settings.show === undefined ? true : item.settings.show;
          regends.push({
            display: show,
            button: "remove",
            dataIndex: index,
            overlay: item.name,
            grid: 0,
            type: "offchart"
          });
        })
      }

      return this.uniqBy(regends, 'overlay');
    },
    styles() {
      let colors = this.$props.colors
      let width = this.$props.width;
      let b = this.$props.config.TB_BORDER
      let w = this.$props.config.TOOLBAR - b
      let c = colors.grid
      let cb = colors.tbBack || colors.back
      let brd = colors.tbBorder || colors.scale
      let st = this.$props.config.TB_B_STYLE

      return {
        top:`${-w}px`,
        width: `${width + 58}px`,
        left:0,
        height: `${w}px`,
        'background-color': cb,
        "border-bottom": `${b}px ${st} ${brd}`
      };
    }
  },
  watch: {
    data: {
      handler(n) {
        // For some reason Vue.js doesn't want to
        // update 'tools' automatically when new item
        // is pushed/removed. Yo, Vue, I herd you
        // you want more dirty tricks?
        if (n.tools) this.tool_count = n.tools.length;
      },
      deep: true
    },
    range(val) {
      this.$emit("chnRange", val);
    }
  },
  created() {
  },
};
</script>

<style>
.trading-vue-data-toolbar {
  border: 0 !important;
  position: relative;
  z-index: 100;
}

.trading-vue-data-toolbar-container {

}

.trading-vue-data-toolbar-date {
  display: flex;
  align-items: center;
  position: relative;
}

.trading-vue-data-toolbar-date > div {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.trading-vue-data-toolbar-compare {
  cursor: pointer;
}

.theme--dark .trading-vue-data-toolbar-item {
  background: rgb(64, 68, 76);
}

.trading-vue-data-toolbar-item {
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 3px;
  cursor: pointer;
  background: rgba(244, 244, 244, 1);
  transition: all 0.15s;
}

.trading-vue-legend-group {
  position: relative;
}
.theme--dark .trading-vue-legend-group-title {
  background: rgb(64, 68, 76);
}
.trading-vue-legend-group-title {
  background: #E0E6EB;
  border-radius: 3px;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}
.trading-vue-legend-group-title > span {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 5px;
}
.theme--dark .trading-vue-legend-group ul {
  background: rgb(64, 68, 76);
}
.trading-vue-legend-group ul {
  position: absolute;
  min-width: 200px;
  right: 0;
  margin: 0;
  padding: 0;
  top: 1.71rem;
  list-style: none;
  border: 1px solid rgb(51, 23, 23);
  border-radius: 3px;
  background: white;
  transition: all 0.25s;
}
.trading-vue-legend-group ul li {
  display: flex;
  justify-items: center;
  font-size: 0.8rem;
  padding: 5px;
  padding-left: 10px;
  cursor: pointer;
}
.trading-vue-legend-group ul li:hover {
  background: blue;
  color: white;
}
.trading-vue-legend-group-title {
  display: flex;
  align-items: center;
}
li.ma-start {
  border-top: 1px solid;
  margin-top: 5px;
}
li.ma-end {
  border-bottom: 1px solid;
  margin-bottom: 5px;
}

.chart-toolbar-date-container {
  border: 0px solid red;
}

.btn-line-type {
  background-color: #f4f4f4;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  cursor: pointer
}

.btn-line-type.active,
.trading-vue-data-toolbar-item.active {
  background-color: #144B4D;
  color: white
}

.btn-line-type.res {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.68 75.68"><rect x="42.74" y="25.1" width="14.15" height="24.23" style="fill:none" stroke="black"/><line x1="49.82" y1="14.28" x2="49.82" y2="24.4" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:2px;"/><line x1="49.82" y1="50.28" x2="49.82" y2="60.4" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:2px;"/><rect x="18.4" y="17.52" width="14.15" height="40.97" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:2px;"/><line x1="25.82" y1="8.28" x2="25.82" y2="18.4" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:2px;"/><line x1="25.82" y1="58.28" x2="25.82" y2="68.4" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:2px;"/></svg>');
}

.btn-line-type.res.active {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.68 75.68"><rect y="-.44" width="75.77" height="76.11" style="fill:none;"/><rect x="42.74" y="25.1" width="14.15" height="24.23" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="49.82" y1="14.28" x2="49.82" y2="24.4" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="49.82" y1="50.28" x2="49.82" y2="60.4" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><rect x="18.4" y="17.52" width="14.15" height="40.97" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="25.82" y1="8.28" x2="25.82" y2="18.4" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="25.82" y1="58.28" x2="25.82" y2="68.4" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/></svg>');
}

.btn-line-type.spline {
  background-image: url('data:image/svg+xml;utf8,<svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.68 75.68"><line x1="9.81" y1="49.94" x2="21.28" y2="39.77" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:3px;"/><line x1="29.88" y1="48.41" x2="19.98" y2="39.76" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:3px;"/><line x1="43.51" y1="36.73" x2="28.54" y2="48.52" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:3px;"/><line x1="54.92" y1="36.94" x2="42.88" y2="36.94" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:3px;"/><line x1="66.39" y1="24.03" x2="54.19" y2="37.27" style="fill:none; stroke:black; stroke-miterlimit:10; stroke-width:3px;"/></svg>');
}

.btn-line-type.spline.active {
  background-image: url('data:image/svg+xml;utf8,<svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.68 75.68"><line x1="9.81" y1="49.94" x2="21.28" y2="39.77" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="29.88" y1="48.41" x2="19.98" y2="39.76" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="43.51" y1="36.73" x2="28.54" y2="48.52" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="54.92" y1="36.94" x2="42.88" y2="36.94" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/><line x1="66.39" y1="24.03" x2="54.19" y2="37.27" style="fill:none; stroke:white; stroke-miterlimit:10; stroke-width:3px;"/></svg>');
}
</style>

