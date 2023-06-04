<template lang="pug">
    //- div ChartPrice...

    div(
        @click="goToPressRelease()"
        @mousemove="setCursorOnHover(), checkIfNotPressed = false"
        @mousedown="checkIfNotPressed = true"
        @contextmenu.prevent="rightMouse"
        tabindex="0"
        @keydown.esc="closeSetting"
        :class="{ 'pt-0': toolbar }"
        style="outline:none; position:relative;"
    )
        trading-vue(
            :chart-config="{ DEFAULT_LEN: 500, USER_TYPE: 'new', USER_TRADE_PLAN_COUNT: 0 }"
            :title-txt="'STRAX'"
            v-on:chnInterval="chnInterval"
            :legend-buttons="['display', 'remove']"
            :data="chart"
            :page="page"
            :width="width"
            :height="height"
            :toolbar="toolbar"
            :leftToolbar="leftToolbar"
            :legendView="legendView"
            :color-back="colors.colorBack"
            :color-grid="colors.colorGrid"
            :color-text="colors.colorText"
            :showrightSideBarLine="showrightSideBarLine"
            ref="tradingVue"
        )
    //-     div(
    //-         class="setting-popup d-flex align-center"
    //-         v-if="settingPop"
    //-         :style="`top:${mousePosition.y}px; left:${mousePosition.x}px`"
    //-         @click="(settingPop = false), (focusedTradeLine = true)"
    //-     )
    //-         v-icon settings
    //-         span(class="ml-1") Setting

    //-     div(v-if="focusedText" id="tradeInfoContainer" class="tradeInfo" :style="{top: positionY, left: positionX, border: '1px solid'}")
    //-         div(class="setting-herader")
    //-             div(class="d-flex justify-space-between")
    //-                 h3(id="journalNoteHeadline" class="mb-0 pt-2" @mousedown="mouseDownCheck = true" @mouseup="mouseDownCheck = false, x = null" @mouseout="mouseDownCheck = false" @mousemove="moveTradeInfoContainer($event)" style="font-size: 21px;width: 305px;") Journal Note
    //-                 v-icon(class="cursor-pointer" style="height: 25px;" @click="focusedText = false") close
    //-         div(class="d-flex justify-space-between align-center mt-3 mr-4")
    //-             input(
    //-                 @keypress.enter="focusedText = false"
    //-                 v-model="text"
    //-                 type="text"
    //-                 class="p-1"
    //-                 :style="{border: '1px solid', width: '100%', backgroundColor: textBackground}"
    //-             )
    //-         div(class="d-flex align-center mt-4")
    //-             div(v-for="(backgroundColor, index) in backgroundColors" :key="index")
    //-                 div(
    //-                     @click="textBackground = backgroundColor"
    //-                     class="background-color-item mr-4"
    //-                     :class="{ active: backgroundColor == textBackground }"
    //-                     :style="{ border: backgroundColor != textBackground ? '1px solid #BDBDBD' : '', background: backgroundColor }"
    //-                 )

    //-     div(v-if="focusedNews" id="tradeInfoContainer" class="newsInfo" :style="{top: positionY, left: positionX, border: '1px solid #FFE5B1'}")
    //-         div(class="main-news-container p-2")
    //-             div
    //-                 div(class="title-design mb-1") {{ newsTitle }}
    //-                 div(class="news-text-design mb-2" v-html="newsText")

    //-     DropDownTradePlansChartPrice(v-if="focusedTradeLine" :stock="stock" ticker="company.ticker" class="dropdown-trade-plans" style="width:570px;" ref="dropdown-trade-plans" :page="page")
    //-     TradePlansWarning(class="trade-plans-warning" v-if="showWarning" @close-warning="changeShowWarning")





    //- div(
    //-     @mousemove="setCursorOnHover($event)"
    //-     @contextmenu.prevent="rightMouse"
    //-     tabindex="0"
    //-     @keydown.esc="closeSetting"
    //-     :class="{ 'pt-0': toolbar }"
    //-     style="outline:none; position: relative;"
    //- )
    //-     trading-vue(
    //-         :chart-config="{ DEFAULT_LEN: 500, USER_TYPE: user.type, USER_TRADE_PLAN_COUNT: allTradeLine.length }"
    //-         :title-txt="company.ticker"
    //-         v-on:chnInterval="chnInterval"
    //-         v-on:chnLineType="chnLineType"
    //-         :legend-buttons="['display', 'remove']"
    //-         v-on:legend-button-click="legend_button_click"
    //-         :data="chart"
    //-         :page="page"
    //-         :width="chartWidth"
    //-         :height="chartHeight"
    //-         :toolbar="toolbar"
    //-         :leftToolbar="leftToolbar"
    //-         :legendView="legendView"
    //-         :color-back="colors.colorBack"
    //-         :color-grid="colors.colorGrid"
    //-         :color-text="colors.colorText"
    //-         :showrightSideBarLine="showrightSideBarLine"
    //-         v-on:change-settings="chnTradeLine"
    //-         v-on:drawing-mode-off="createTradeLine"
    //-         v-on:remove-layer-meta="removeTradeLine"
    //-         v-on:object-selected="selectTradeLine"
    //-         v-on:grid-mousedown="blurTradeLine"
    //-         v-on:settings-click="tradePlanSettingsClick"
    //-         ref="tradingVue"
    //-     )
    //-     div(
    //-         class="setting-popup d-flex align-center"
    //-         v-if="settingPop"
    //-         :style="`top:${mousePosition.y}px; left:${mousePosition.x}px`"
    //-         @click="(settingPop = false), (focusedTradeLine = true)"
    //-     )
    //-         v-icon settings
    //-         span(class="ml-1") Setting

    //-     div(v-if="focusedText" id="tradeInfoContainer" class="tradeInfo" :style="{top: positionY, left: positionX, border: '1px solid'}")
    //-         div(class="setting-herader")
    //-             div(class="d-flex justify-space-between")
    //-                 h3(id="journalNoteHeadline" class="mb-0 pt-2" @mousedown="mouseDownCheck = true" @mouseup="mouseDownCheck = false, x = null" @mouseout="mouseDownCheck = false" @mousemove="moveTradeInfoContainer($event)" style="font-size: 21px;width: 305px;") Journal Note
    //-                 v-icon(class="cursor-pointer" style="height: 25px;" @click="focusedText = false") close
    //-         div(class="d-flex justify-space-between align-center mt-3 mr-4")
    //-             input(
    //-                 @keypress.enter="focusedText = false"
    //-                 v-model="text"
    //-                 type="text"
    //-                 class="p-1"
    //-                 :style="{border: '1px solid', width: '100%', backgroundColor: textBackground}"
    //-             )
    //-         div(class="d-flex align-center mt-4")
    //-             div(v-for="(backgroundColor, index) in backgroundColors" :key="index")
    //-                 div(
    //-                     @click="textBackground = backgroundColor"
    //-                     class="background-color-item mr-4"
    //-                     :class="{ active: backgroundColor == textBackground }"
    //-                     :style="{ border: backgroundColor != textBackground ? '1px solid #BDBDBD' : '', background: backgroundColor }"
    //-                 )

    //-     div(v-if="focusedNews" id="tradeInfoContainer" class="newsInfo" :style="{top: positionY, left: positionX, border: '1px solid #FFE5B1'}")
    //-         div(class="main-news-container p-2")
    //-             div
    //-                 div(class="title-design mb-1") {{ newsTitle }}
    //-                 div(class="news-text-design mb-2" v-html="newsText")

    //-     DropDownTradePlansChartPrice(v-if="focusedTradeLine" :stock="stock" ticker="company.ticker" class="dropdown-trade-plans" style="width:570px;" ref="dropdown-trade-plans" :page="page")
    //-     TradePlansWarning(class="trade-plans-warning" v-if="showWarning" @close-warning="changeShowWarning")
</template>

<script>
/* eslint-disable */
import TradingVue from "./Trading/TradingVue";
import DataCube from "./Trading/helpers/datacube.js";
// import apiService from "@/Services/ApiService";
// import DropDownTradePlansChartPrice from "@/components/DropDownTradePlansChartPrice.vue";
// import TradePlansWarning from "@/components/TradePlansWarning.vue";
// import { mapActions, mapGetters, mapMutations } from "vuex";

// import ChartLines from './Trading/mixins/ChartPrice/ChartLines';
// import TradeLines from './Trading/mixins/ChartPrice/TradeLines';
import ohlcv from './Trading/mixins/ChartPrice/ohlcv';
// import Legend from './Trading/mixins/ChartPrice/Legend';

import { mapGetters } from "vuex";

export default {
    name: "ChartPrice",
    mixins: [
        // ChartLines,
        // TradeLines,
        ohlcv,
        // Legend
    ],
    components: {
        TradingVue,
        // DropDownTradePlansChartPrice,
        // TradePlansWarning,
    },
    props: {
        prices: {
            type: Array,
            default() {
                return [];
            }
        },
        small: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: "chart",
        },
        company_id: Number,
        stock_id: Number,
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        toolbar: {
            type: Boolean,
            default: true,
        },
        leftToolbar: {
            type: Boolean,
            default: true
        },
        grids: {
            type: Boolean,
            default: true
        },
        showrightSideBarLine: {
            type: Boolean,
            default: true
        },
        legendView: {
            type: Boolean,
            default: true,
        },
        single: {
            type: Boolean,
            default: false,
        },
        page: {
            type: String,
            default: 'wl'
        },
        widthStockCard: {
            type: Number,
            default: 100
        }
    },
    data() {
        return {
            checkIfNotPressed: true,
    //         posX: 1,
    //         posY: 1,
    //         checkPreventDeleteTradePlan: true,
            pin: '',
    //         isChartPriceLinkVisible: false,
    //         x: null,
    //         positionX: '650px',
    //         positionY: '450px',
    //         mouseDownCheck: false,
            chartWidth: this.width,
            chartHeight: this.height,
    //         tagetPrice: 0,
    //         stopPrice: 0,
    //         entryPrice: 0,
    //         backgroundColors: ["#C2E0FC", "#C9FDCE", "#FFFFBA", "#FAE0BF", "#F4B6BB"],
            mousePosition: {
                x: 0,
                y: 0,
            },
    //         settingPop: false,
    //         errorSP: false,
    //         errorEP: false,
    //         errorTP: false,
    //         initial: true,
    //         tradeInfo: {},
    //         textInfo: {},
    //         newsInfo: {},
    //         focusedTradeLine: false,
            focusedText: false,
            focusedNews: false,
            selectedTradeLine: "",
    //         selectedText: "",
    //         selectedTradeHistory: "",
    //         entry_price: "",
    //         entry_date: "",
    //         exit_price: "",
    //         exit_date: "",
    //         tradeHistoryInfo: {},

    //         lineType: "Spline",
            interval: "",
            chart: new DataCube({}),
    //         lineData: [],
    //         count_onchart: 0,
    //         showPremiumBtn: this.$store.getters["getUserSubscribed"],
    //         showWarning: false,
        };
    },
    methods: {
//         ...mapActions([
//             "loadCompanyNews",
//             "saveChartOverlays"
//         ]),
        goToPressRelease() {
            if(this.checkIfNotPressed && this.pin !== '') {
                console.log('press...');

                const element = document.getElementById('pressReleasesElement');

                element.click();
            }
        },
//         ...mapMutations([
//             "setCompareDatasOnChart",
//             "setBlockWhileAddingOverlay",
//             "setAddCompare",
//             "setShowDisplayButton"
//         ]),
//         getNews(booleanValue) {
//             for(const c of this.chart.data.onchart) {
//                 if(c.id !== undefined && c.id.toString().indexOf('onchart.NewsTool') !== -1) {
//                     c.settings.display = booleanValue;
//                 }
//             }
//         },
//         getJournalNotes(booleanValue) {
//             for(const c of this.chart.data.onchart) {
//                 if(c.id !== undefined && c.id.toString().indexOf('onchart.TextTool') !== -1) {
//                     c.settings.display = booleanValue;
//                 }
//             }
//         },
        getPinFromChart(pin) {
            // console.log('pin', pin);
            this.pin = pin;
        },
        // setCursorOnHover(event) {
        setCursorOnHover() {
            // const pinLeftX = this.pin.x;
            // const pinRightX = this.pin.x + 20;
            // const textLength = this.pin.textLength;

            // const pinTopY = this.pin.side === -1 ? (this.pin.y + 45) - (75 + textLength) : (this.pin.y + 45) + (75 + textLength);
            // const pinBottomY = this.pin.side === -1 ? this.pin.y + 50 : this.pin.y + 50;

            const tvElement = this.$refs.tradingVue.$el;

            console.log(this.pin);

            if(this.pin !== '') {
                tvElement.style.cursor = 'pointer';
            } else {
                tvElement.style.cursor = '';
            }

            this.pin = '';

            // const rect = tvElement.getBoundingClientRect();

            // const left = rect.left;
            // const top = rect.top;
            // const leftX = event.clientX - (left + 45);
            // const topY = event.clientY - (top + 1);

            // console.log('----');
            // console.log('pinLeftX', pinLeftX);
            // console.log('pinRightX', pinRightX);
            // console.log('textLength', textLength);
            // console.log('pinTopY', pinTopY);
            // console.log('pinBottomY', pinBottomY);
            // console.log('left', left);
            // console.log('top', top);
            // console.log('leftX', leftX);
            // console.log('topY', topY);

            // if((leftX >= pinLeftX && leftX <= pinRightX && topY >= pinTopY && topY <= pinBottomY) && this.pin.side === -1) {
            //     console.log('step 1');
            //     tvElement.style.cursor = 'pointer';
            // } else if((leftX >= pinLeftX && leftX <= pinRightX && topY <= pinTopY && topY >= pinBottomY) && this.pin.side === 1) {
            //     console.log('step 2');
            //     tvElement.style.cursor = 'pointer';
            // } else {
            //     console.log('step 3');
            //     tvElement.style.cursor = '';
            // }
        },
        updateChart(tempTradePlan = '') {
            // this.blurTradeLine();
            this.chnInterval('', tempTradePlan);
        },
//         moveTradeInfoContainer(event) {
//             const tradeInfoContainer = document.getElementById('tradeInfoContainer');

//             if(this.mouseDownCheck) {
//                 const rect = event.target.getBoundingClientRect();

//                 if(this.x === null) {
//                     this.x = event.clientX - rect.left;
//                 }

//                 tradeInfoContainer.style.top = (event.clientY - 18) + 'px';
//                 tradeInfoContainer.style.left = (event.clientX - (this.x + 16)) + 'px';
//             } else {
//                 this.positionY = tradeInfoContainer.style.top;
//                 this.positionX = tradeInfoContainer.style.left;
//             }
//         },
        closeSetting() {
            if (this.focusedText) {
                this.focusedText = false;
            } else if (this.focusedNews) {
                this.focusedNews = false;
            }
        },
//         tradePlanSettingsClick() {
//             this.focusedTradeLine = true;
//             this.settingPop = false;
//         },
        rightMouse(e) {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;

            if (this.selectedTradeLine !== "") {
                this.settingPop = true;
            }
        },
//         blurTradeLine() {
//             this.selectedText = "";
//             this.focusedTradeLine = false;
//             this.focusedText = false;
//             this.focusedNews = false;
//             this.settingPop = false;
//             this.errorSP = false;
//             this.errorEP = false;
//             this.errorTP = false;
//             this.selectedTradeHistory = "";
//         },
        async chnInterval(interval, tempTradePlan = '') {
            console.log('chnInterval...');

//             if(this.page !== 'stockCards') {
//                 await this.fetchUserLines();
//             }

            /**
             * Insiders: By Transaction : dataIndex: 1
             * Portfolio Transactions   : dataIndex: 2
             * Insiders: Silent Period  : dataIndex: 3
             * Earning Date             : dataIndex: 4
             * MA 20                    : dataIndex: 6
             * MA 50                    : dataIndex: 7
             * MA 200                   : dataIndex: 8
             */

            // const watermark = {
            //     type: "Watermark",
            //     name: "Watermark",
            //     settings: {
            //         legend: false,
            //         data: {
            //             ticker: 'STRAX',//this.company.ticker,
            //             name: 'Strax',//this.company.name,
            //         },
            //     },
            //     data: [],
            // };

            // console.log(watermark);

            this.interval = interval;

            console.log('interval', this.interval);

//            const resStockSplit = await this.getStockSplit();
//            console.log('resStockSplit', resStockSplit.data);
//            const sps = resStockSplit.data;

            let response = null;

            // if(this.page !== 'stockCards') {
            //     response = await this.getOHLCV();
            // } else {
                response = {
                    data: {
                        ohlcv: this.getCompany.prices.ohlcv
                    }
                };
            // }

            console.log(response);

            let ohlcv = [];

            if (response.data.ohlcv) {
                ohlcv = response.data.ohlcv;
                ohlcv = ohlcv.sort((a, b) => a[0] - b[0]);
            }

            console.log(ohlcv);

            const temp_ohlcv = ohlcv;
            ohlcv = [];

            console.log(temp_ohlcv);

            for(const [index, item] of temp_ohlcv.entries()) {
                let data0, data1, data2, data3, data4, data5;

                // if(this.page !== 'stockCards') {
                //     if (item[0] === null) {
                //         if (index === 0) {
                //             data0 = 0;
                //         } else {
                //             data0 = ohlcv[index - 1][0];
                //         }
                //     } else {
                //         data0 = item[0]
                //     }

                //     if (item[1] === null) {
                //         if (index === 0) {
                //             data1 = 0;
                //         } else {
                //             data1 = ohlcv[index - 1][1];
                //         }
                //     } else {
                //         data1 = item[1]
                //     }

                //     if (item[2] === null) {
                //         if (index === 0) {
                //             data2 = 0;
                //         } else {
                //             data2 = ohlcv[index - 1][2];
                //         }
                //     } else {
                //         data2 = item[2];
                //     }

                //     if (item[3] === null) {
                //         if (index === 0) {
                //             data3 = 0;
                //         } else {
                //             data3 = ohlcv[index - 1][3];
                //         }
                //     } else {
                //         data3 = item[3];
                //     }

                //     if (item[4] === null) {
                //         if (index === 0) {
                //             data4 = 0;
                //         } else {
                //             data4 = ohlcv[index - 1][4];
                //         }
                //     } else {
                //         data4 = item[4];
                //     }

                //     if (item[5] === null) {
                //         if (index === 0) {
                //             data5 = 0;
                //         } else {
                //             data5 = ohlcv[index - 1][5];
                //         }
                //     } else {
                //         data5 = item[5];
                //     }
                // } else {
                    if (item[0] === null) {
                        if (index === 0) {
                            data0 = 0;
                        } else {
                            data0 = ohlcv[index - 1][0];
                        }
                    } else {
                        data0 = item[0]
                    }

                    if (item[1] === null) {
                        if (index === 0) {
                            data1 = 0;
                        } else {
                            data1 = ohlcv[index - 1][1];
                        }
                    } else {
                        data1 = item[1]
                    }

                    if (item[1] === null) {
                        if (index === 0) {
                            data2 = 0;
                        } else {
                            data2 = ohlcv[index - 1][1];
                        }
                    } else {
                        data2 = item[1];
                    }

                    if (item[1] === null) {
                        if (index === 0) {
                            data3 = 0;
                        } else {
                            data3 = ohlcv[index - 1][1];
                        }
                    } else {
                        data3 = item[1];
                    }

                    if (item[1] === null) {
                        if (index === 0) {
                            data4 = 0;
                        } else {
                            data4 = ohlcv[index - 1][1];
                        }
                    } else {
                        data4 = item[1];
                    }

                    if (item[1] === null) {
                        if (index === 0) {
                            data5 = 0;
                        } else {
                            data5 = ohlcv[index - 1][1];
                        }
                    } else {
                        data5 = item[1];
                    }
                // }

                ohlcv.push([new Date(data0).setUTCHours(0, 0, 0, 0), data1, data2, data3, data4, data5]);
            }

            console.log(ohlcv);

            const ohlcvFilter = this.filterOhlcv(ohlcv);

            console.log(ohlcvFilter);

            // const ohlcvFilter = this.makeStockSplit(ohlcv, {});
            const onchart = [];
//             const offchart = [];

//             if(this.page !== 'stockCards') {
//                 // console.log(JSON.parse(JSON.stringify(this.getShowOverlays)));

//                 if (!this.single) {
//                     // const objectMa20 = this.getShowOverlays.find((o) => o.name === 'ma20');
//                     // const objectMa50 = this.getShowOverlays.find((o) => o.name === 'ma50');
//                     // const objectMa200 = this.getShowOverlays.find((o) => o.name === 'ma200');
//                     // const objectEarningDate = this.getShowOverlays.find((o) => o.name === 'earningDate');
//                     // const objectInsidersSilentPeriod = this.getShowOverlays.find((o) => o.name === 'insidersSilentPeriod');
//                     // const objectInsidersByTransaction = this.getShowOverlays.find((o) => o.name === 'insidersByTransaction');
//                     // const objectPortfolioTransactions = this.getShowOverlays.find((o) => o.name === 'portfolioTransactions');
//                     // const objectJournalNotes = this.getShowOverlays.find((o) => o.name === 'journalNotes');
//                     // const objectNews = this.getShowOverlays.find((o) => o.name === 'news');
//                     // const objectTextTool = this.getShowOverlays.find((o) => o.name === 'textTool');
//                     // const objectNewsTool = this.getShowOverlays.find((o) => o.name === 'newsTool');

                    // const ma20 = {
                    //     name: "MA 20",
                    //     type: "Splines",
                    //     settings: {
                    //         display: true,//objectMa20.display,
                    //         show: false
                    //     },
                    //     data: this.makeMa(ohlcvFilter, 20),
                    // };

                    // const ma50 = {
                    //     name: "MA 50",
                    //     type: "Splines",
                    //     settings: {
                    //         display: true,//objectMa50.display,
                    //         show: false
                    //     },
                    //     data: this.makeMa(ohlcvFilter, 50),
                    // };

                    // const ma200 = {
                    //     name: "MA 200",
                    //     type: "Splines",
                    //     settings: {
                    //         display: true,//objectMa200.display,
                    //         show: false
                    //     },
                    //     data: this.makeMa(ohlcvFilter, 200),
                    // };

//                     const sections = {
//                         name: "Earning Date",
//                         type: "Earnings",
//                         data: [],
//                         settings: {
//                             legend: true,
//                             show: false,
//                             display: false,//objectEarningDate.display
//                         },
//                     };

//                     const sections1 = {
//                         name: "Insiders: Silent Period",
//                         type: "Earnings1",
//                         data: [],
//                         settings: {
//                             legend: true,
//                             display: false,//objectInsidersSilentPeriod.display,
//                             show: false
//                         },
//                     };

//                     const insiderDot = {
//                         name: "Insiders: By Transaction",
//                         type: "InsiderDot",
//                         settings: {
//                             display: false,//objectInsidersByTransaction.display,
//                             show: false,
//                             "z-index": 50
//                         },
//                         data: [],
//                     };

//                     // const portfolioTransactions = {
//                     //     name: "Portfolio Transactions",
//                     //     type: "PortfolioTransactions",
//                     //     settings: {
//                     //         display: false,//objectPortfolioTransactions.display,
//                     //         show: false,
//                     //         "z-index": 50
//                     //     },
//                     //     data: []
//                     // };

                    // const sections2 = {
                    //     name: 'Journal Notes',
                    //     type: 'TextTool',
                    //     data: [],
                    //     settings: {
                    //         legend: true,
                    //         display: true,//objectTextTool.display,
                    //         show: true
                    //     }
                    // };

//                     const sections3 = {
//                         name: 'News',
//                         type: 'NewsTool',
//                         data: [],
//                         settings: {
//                             legend: true,
//                             display: false,//objectNewsTool.display,
//                             show: false
//                         }
//                     };

                    // onchart.push(ma20);
                    // onchart.push(ma50);
                    // onchart.push(ma200);
//                     onchart.push(insiderDot);
//                     // onchart.push(portfolioTransactions);
                    // onchart.push(sections2);
//                     onchart.push(sections3);
//                     onchart.push(sections1);
//                     onchart.push(sections);
                    // onchart.push(watermark);

                    // console.log(onchart);

//                     // Compare block *********************************
//                     const compareDatas = this.$store.getters["compareDatas"];

//                     // const compareDatasOnChart = [];

//                     for(const compareData of compareDatas) {
//                         // console.log(compareData);

//                         let data = await this.getOnchart(compareData.stock_id);

//                         data = data.sort((a, b) => a[0] - b[0]);
//                         data = this.filterData(data);

//                         // console.log(data);

//                         // compareDatasOnChart.push(data);
//                         // console.log(data);

//                         onchart.push({
//                             name: compareData.name,
//                             type: "Compare",
//                             data: data,
//                             settings: {
//                                 display: true,
//                                 "z-index": 5,
//                                 show: true
//                             }
//                         });
//                     }

//                     // console.log(onchart);

//                     // this.setCompareDatasOnChart(compareDatasOnChart);
//                     // ***********************************************

                    // const journalDatas = this.$store.getters["getMapUserDiary"].filter((item) => item.stock_id === this.stock_id);
                    // const journalDatas = [
                    //     {
                    //         "diary_item_id": 1032,
                    //         "user_id": 723,
                    //         "stock_id": 5470599,//42953,
                    //         "date_created": "2022-11-11",
                    //         "note": "Give me my groovy here...",
                    //         "background": "#C2E0FC   ",
                    //         "color": null,
                    //         "y": null
                    //     },
                    //     {
                    //         "diary_item_id": 1418,
                    //         "user_id": 723,
                    //         "stock_id": 5470599,//42953,
                    //         "date_created": "2023-04-06",
                    //         "note": "My new input",
                    //         "background": "#C9FDCE   ",
                    //         "color": null,
                    //         "y": null
                    //     }
                    // ];

                    // if (journalDatas) {
                    //     journalDatas.map((item, index) => {
                    //         onchart.push({
                    //             data: [],
                    //             grid: {
                    //                 id: index,
                    //             },
                    //             id: `onchart.TextTool${index}`,
                    //             name: `TextTool ${index}`,
                    //             type: "TextTool",
                    //             settings: {
                    //                 update: false,
                    //                 $selected: false,
                    //                 $state: "finished",
                    //                 legend: false,
                    //                 display: true,
                    //                 // display: objectTextTool.display,
                    //                 $uuid: "text_" + item.diary_item_id,
                    //                 p1: [new Date(item.date_created).getTime(), item.y],
                    //                 background: item.background,
                    //                 text: item.note,
                    //                 color: item.color,
                    //                 single: this.single,
                    //             },
                    //         });
                    //     });
                    // }

//                     const newsDatas = await this.loadCompanyNews(this.company_id);

//                     if (newsDatas) {
//                         newsDatas.map((item, index) => {
//                             onchart.push({
//                                 data: [],
//                                 grid: {
//                                     id: index,
//                                 },
//                                 id: `onchart.NewsTool${index}`,
//                                 name: `NewsTool ${index}`,
//                                 type: "NewsTool",
//                                 settings: {
//                                     update: false,
//                                     $selected: false,
//                                     $state: "finished",
//                                     legend: false,
//                                     display: false,
//                                     // display: objectNewsTool.display,
//                                     $uuid: "news_" + item.news_id,
//                                     p1: [new Date(item.date).getTime(), item.y],
//                                     text: item.newstext,
//                                     title: item.title,
//                                     single: this.single,
//                                 },
//                             });
//                         });
//                     }
//                 }

//                 const tradeLines = tempTradePlan === '' ? this.getTradeLine : tempTradePlan;

//                 if (tradeLines) {
//                     tradeLines.map((item, index) => {
//                         onchart.push({
//                             data: [],
//                             grid: {
//                                 id: index,
//                             },
//                             id: `onchart.PositionTool${index}`,
//                             name: `PositionTool ${index}`,
//                             type: "PositionTool",
//                             settings: {
//                                 update: false,
//                                 $selected: false,
//                                 $state: "finished",
//                                 legend: false,
//                                 $uuid: "trade_" + item.trade_plan_id,
//                                 p1: [Number(item.exit_date), item.target_price],
//                                 p2: [Number(item.entry_date), item.stoploss_price],
//                                 p3: [
//                                     item.exit_date * 0.5 + item.entry_date * 0.5,
//                                     item.entry_price,
//                                 ],
//                                 target_alert_status: item.target_alert_status,
//                                 entry_alert_status: item.entry_alert_status,
//                                 stoploss_alert_status: item.stoploss_alert_status,
//                                 single: this.single,
//                             },
//                         });
//                     });
//                 }

//                 // for(const text of onchart) {
//                 //     if(text.type === 'InsiderDot') {
//                 //         text.settings.display = false;
//                 //     }
//                 // }

//                 // console.log(onchart);
//             }

            console.log(onchart);

            this.chart = new DataCube({
                ohlcv: ohlcvFilter,
                onchart: onchart,
                // offchart: offchart,
            });

            console.log(this.chart);

//             if(this.getAddCompare) {
//                 this.setAddCompare(false);

//                 // console.log('this.chart');
//                 // console.log(this.chart);
//                 // console.log(JSON.parse(JSON.stringify(this.getShowOverlays)));

//                 for(const o of this.getShowOverlays) {
//                     for(const item of this.chart.data.onchart) {
//                         if(o.overlay === item.name) {
//                             item.settings.display = o.display;
//                         }

//                         if(o.name.toLowerCase() === item.type.toLowerCase()) {
//                             // console.log(o.display);
//                             item.settings.display = o.display;
//                         }
//                     }

//                     // for(const item of this.chart.data.onchart) {
//                     //     if(o.name.toLowerCase() === item.type.toLowerCase()) {
//                     //         console.log(o.display);
//                     //         item.settings.display = o.display;
//                     //     }
//                     // }

//                     // if(o.name === 'TextTool') {
//                     //     item.settings.display = false;//o.display;
//                     // }

//                     // if(o.name === 'NewsTool') {
//                     //     item.settings.display = o.display;
//                     // }
//                 }

//                 // console.log(this.chart);
//             }

//             if(this.page !== 'stockCards' && this.page !== 'mainOverview') {
//                 if(tempTradePlan === "") {
//                     this.$refs.tradingVue.resetChart();
//                 }
//             }
        },
        onResize() {
            if (this.page == 'wl') {
                if (window.innerWidth > 950) {
                    this.chartWidth = (window.innerWidth - 400) / 3;
                } else {
                    this.chartWidth = (window.innerWidth - 400) / 2;
                }
            }

            if (this.page == 'main') {
                // this.chartWidth = 685;
                // this.chartHeight = 260;
            }

            if (this.page === 'mainOverview') {
                this.chartWidth = (window.innerWidth - 400) / 1.5;
                this.chartHeight = (window.innerWidth - 400) / 3.35;
            }

            if (this.page == 'overview') {
                if(window.innerWidth < 2090) {
                    this.chartWidth = (window.innerWidth - 400) / 4;
                    this.chartHeight = this.chartWidth - 22;
                }
            }

            if (this.page == 'stockCards') {
                this.chartWidth = this.widthStockCard;
                this.chartHeight = 168;
            }
        },
//         changeShowWarning() {
//             this.showWarning = false;
//         },
    },
    async mounted() {
        // console.log('stock_id', this.stock_id);
        // console.log('company_id', this.company_id);

        // console.log(await this.getOHLCV());
        // console.log(await this.getOnchart());

        window.addEventListener("resize", this.onResize);

        this.onResize();

        window.DataCube = this.chart; // Debug
    },
    // beforeDestroy() {
    //     this.setShowDisplayButton({
    //         ma20: false,
    //         ma50: false,
    //         ma200: false,
    //         earningDate: false,
    //         insidersSilentPeriod: false,
    //         insidersByTransaction: false,
    //         // portfolioTransactions: false,
    //         textTool: true,
    //         newsTool: false
    //     });

    //     this.selectedTradeLine = "";
    //     this.selectedTradeHistory = "";
    //     this.selectedText = "";
    //     this.focusedTradeLine = false;
    //     this.focusedText = false;
    //     this.focusedNews = false;
    //     this.settingPop = false;
    //     this.errorSP = false;
    //     this.errorEP = false;
    //     this.errorTP = false;
    //     window.removeEventListener("resize", this.onResize);
    // },
    // watch: {
    //     // getShowOverlaysString() {
    //     //     console.log(JSON.parse(JSON.stringify(this.getShowOverlays)));

    //     //     this.setBlockWhileAddingOverlay(false);

    //     //     setTimeout(() => {
    //     //         this.setBlockWhileAddingOverlay(true);
    //     //     }, 3000);

    //     //     this.chnInterval("");
    //     // },
    //     focusedTradeLine(newVal) {
    //         if (newVal) {
    //             this.tagetPrice = this.tradeInfoObject.target_price;
    //             this.stopPrice = this.tradeInfoObject.stoploss_price;
    //             this.entryPrice = this.tradeInfoObject.entry_price;

    //             setTimeout(() => {
    //                 this.$refs['dropdown-trade-plans'].fromChart = false;
    //                 this.$refs['dropdown-trade-plans'].showDropDown = newVal;
    //             }, 200);
    //         }
    //     },
    //     stock_id() {
    //         this.chnInterval("");
    //         this.selectedTradeLine = "";
    //     }
    // },
    created() {
        // console.log('created...');
        this.chnInterval("");
    },
    computed: {
        ...mapGetters(['getCompany']),
    //     ...mapGetters([
    //         'getShowOverlays',
    //         'getAddCompare'
    //     ]),
    //     // getShowOverlaysString() {
    //     //     return JSON.stringify(this.getShowOverlays);
    //     // },
    //     textBackground: {
    //         get() {
    //             return this.textInfo.settings.background || "#FFFFBA";
    //         },
    //         async set(val) {
    //             const d = this.chart.data.onchart.find((item) => item.settings.$uuid === `text_${this.selectedText}`).settings;

    //             this.$set(d, "background", val);

    //             const data = {
    //                 diary_item_id: Number(this.selectedText),
    //                 background: val,
    //             };

    //             await apiService.updateDiaryItem(data);

    //             this.$store.commit("updateMapUserDiaryItem", Object.assign({}, data, { key: "background" }));
    //         }
    //     },
    //     newsText() {
    //         return this.newsInfo.settings.text;
    //     },
    //     newsTitle() {
    //         return this.newsInfo.settings.title;
    //     },
    //     text: {
    //         get() {
    //             return this.textInfo.settings.text || "text";
    //         },
    //         async set(val) {
    //             const d = this.chart.data.onchart.find((item) => item.settings.$uuid === `text_${this.selectedText}`).settings;

    //             this.$set(d, "text", val);

    //             const data = {
    //                 diary_item_id: Number(this.selectedText),
    //                 note: val,
    //             };

    //             await apiService.updateDiaryItem(data);

    //             this.$store.commit("updateMapUserDiaryItem", Object.assign({}, data, { key: "note" }));
    //         },
    //     },
    //     tradeInfoObject() {
    //         if (this.tradeInfo.settings.p1 === undefined) {
    //             return {
    //                 target_price: 0,
    //                 stoploss_price: 0,
    //                 entry_price: 0,
    //                 ratio: 0,
    //                 targetPriceInfo: {
    //                     color: "primary",
    //                     icon: "notifications"
    //                 }
    //             };
    //         }

    //         const target_price = Math.round(Math.max(this.tradeInfo.settings.p1[1], this.tradeInfo.settings.p2[1]) * 10) / 10;
    //         const stoploss_price = Math.round(Math.min(this.tradeInfo.settings.p1[1], this.tradeInfo.settings.p2[1]) * 10) / 10;
    //         const entry_price = Math.round(this.tradeInfo.settings.p3[1] * 10) / 10;
    //         const ratio = Math.round(((target_price - entry_price) / (entry_price - stoploss_price)) * 100) / 100;

    //         return {
    //             target_price: target_price,
    //             stoploss_price: stoploss_price,
    //             entry_price: entry_price,
    //             ratio: ratio
    //         };
    //     },
        colors() {
            // if(this.$vuetify.theme.isDark) {
            //     return {};
            // }

            return {
                colorBack: "#ffffff",
                colorGrid: this.leftToolbar && this.grids ? "#dbe2d9" : "#fff",
                colorText: "#6d6d6d"
            };
        },
    //     company() {
    //         if (this.toolbar) {
    //             return this.$store.getters["getMapStocks"].find(s => s.stock_id === this.stock_id);
    //         } else {
    //             return { title: "" };
    //         }
    //     },
    //     stock() {
    //         return this.$store.getters["getMapStocks"].find(s => s.stock_id === this.stock_id);
    //     },
    //     user() {
    //         return JSON.parse(localStorage.getItem('user'));
    //     },
    //     allTradeLine() {
    //         return this.$store.getters["userTradePlans"].filter((item) => item.user_id === this.user.user_id);
    //     }
    }
};
</script>

<style scoped>
/* .dropdown-trade-plans{
    position: absolute;
    top: 30%;
    left: 50%;
}

.trade-plans-warning{
    position: absolute;
    top: 20%;
    left: 8%;
}

.tradeInfo {
    padding: 0 0 15px 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 350px;
    background-color: #ECEBEB;
    z-index: 1000;
    box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.35);
}

.newsInfo {
    padding: 0 0 15px 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 350px;
    max-width: 700px;
    background-color: #FFFDF2;
    z-index: 1000;
    box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.35);
}

.material-icons-outlined {
    font-family: "Material Icons Outlined";
}

.setting-popup {
    cursor: pointer;
    position: fixed;
    z-index: 100000;
    background: white;
    box-shadow: 0 2px 4px 0 rgba(107, 121, 136, 0.4);
    padding: 5px 10px;
}

.background-color-item {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.background-color-item.active {
    border: 1px solid;
}

.background-color-item:hover {
    border: 1px solid green;
}

.v-btn--round:hover {
    background-color: #e5f0f6 !important;
}

#journalNoteHeadline:hover {
    cursor: pointer;
}

.main-news-container {
    align-items: start !important;
    justify-content: left !important;
}

.main-news-container > div {
    text-align: left;
}

.title-design {
    font-size: 12px;
    font-weight: bold;
}

.news-text-design {
    font-size: 11px;
}

.links-design {
    font-size: 14px;
}

.news-tabs-design {
    font-size: 14px;
}

.news-tabs-date {
    font-size: 14px;
} */
</style>
