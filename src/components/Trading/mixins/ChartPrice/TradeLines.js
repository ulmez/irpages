import ApiService from './../../../../Services/ApiService';

export default {
    methods: {
        selectTradeLine(e) {
            if (this.single) {
                return false;
            }

            if (e[1] && e[1].includes("PositionTool_")) {
                this.focusedText = false;
                this.focusedNews = false;
                this.selectedTradeLine = e[2].split("_")[1];
                this.tradeInfo = this.chart.data.onchart.find((item) => item.settings.$uuid === e[2]);
            } else if (e[1] && e[1].includes("TextTool_")) {
                this.focusedTradeLine = false;
                this.selectedText = e[2].split("_")[1];
                this.textInfo = this.chart.data.onchart.find((item) => item.settings.$uuid === e[2]);
                this.focusedText = true;
                this.focusedNews = false;
            } else if (e[1] && e[1].includes("NewsTool_")) {
                this.focusedTradeLine = false;
                this.selectedText = e[2].split("_")[1];
                this.newsInfo = this.chart.data.onchart.find((item) => item.settings.$uuid === e[2]);
                this.focusedText = false;
                this.focusedNews = true;
            }
        },
        async removeTradeLine(e) {
            if (this.single) {
                return false;
            }

            if (e[1] != undefined && e[1].includes("PositionTool_")) {
                if (this.selectedTradeLine === "" || this.selectedTradeLine === undefined) {
                    return;
                }

                if(this.checkPreventDeleteTradePlan) {
                    this.$store.commit("removeUserTradePlans", this.selectedTradeLine);
                    await ApiService.deleteUserTradePlan({ trade_plan_id: this.selectedTradeLine });
                }

                this.checkPreventDeleteTradePlan = true;

                this.selectedTradeLine = "";
                this.focusedTradeLine = false;
                this.settingPop = false;
            } else if (e[1] != undefined && e[1].includes("TextTool_")) {
                if (this.selectedText === "") {
                    return false;
                }

                this.focusedText = false;
                this.textInfo = {};

                ApiService.deleteDiaryItem(this.selectedText);

                this.$store.commit("removeMapUserDiaryItem", Number(this.selectedText));
                this.selectedText = "";
            } else if (e[1] != undefined && e[1].includes("NewsTool_")) {
                this.focusedNews = false;
                this.newsInfo = {};
            }
        },
        async createTradeLine() {
            const p = this.chart.data.onchart[this.chart.data.onchart.length - 1].settings;

            if ((this.user.type === 'new' || this.user.type === 'freemium') && this.allTradeLine.length === 10) {
                return;
            }

            if (p.$uuid !== undefined && p.$uuid.includes("onchart.PositionTool")) {
                const data = {
                    user_id: this.user.user_id,
                    stock_id: this.stock_id,
                    target_price: p.p1[1],
                    exit_date: p.p1[0],
                    stoploss_price: p.p2[1],
                    entry_date: p.p2[0],
                    entry_price: p.p3[1],
                    long: true,
                    entry_alert_status: p.entry_alert_status,
                    stoploss_alert_status: p.stoploss_alert_status,
                    target_alert_status: p.target_alert_status,
                };

                const res = await ApiService.insertUserTradePlan(data);

                this.$set(p, "$selected", false);
                this.$set(p, "$state", `finished`);
                this.$set(p, "$uuid", `trade_${res.data.trade_plan_id}`);
                this.$set(p, "update", false);
                this.$set(p, "target_alert_status", `${res.data.target_alert_status}`);
                this.$set(p, "stoploss_alert_status", `${res.data.stoploss_alert_status}`);
                this.$set(p, "entry_alert_status", `${res.data.entry_alert_status}`);

                this.$store.commit("addUserTradePlans", res.data);

                if (this.single) {
                    this.chnInterval();
                }
            } else if ( p.$uuid !== undefined && p.$uuid.includes("onchart.TextTool")) {
                const date = new Date(p.p1[0]);
                const data = {
                    user_id: this.user.user_id,
                    stock_id: this.stock_id,
                    date_created: `${date.getFullYear()}-${ date.getMonth() + 1 }-${date.getDate()}`,
                    note: p.text || "text",
                    background: p.background || "#FFFFBA",
                    color: p.color || "#000000",
                    y: p.p1[1],
                };

                const res = await ApiService.insertDiaryItem(data);

                this.$set(p, "$selected", false);
                this.$set(p, "$state", `finished`);
                this.$set(p, "$uuid", `text_${res.data.diary_item_id}`);
                this.$set(p, "update", false);

                this.$store.commit("addMapUserDiaryItem", res.data);

                if (this.single) {
                    this.chnInterval();
                }
            }
        },
        async chnTradeLine(e) {
            if (this.single) {
                return false;
            }

            if (Array.isArray(e) && e[3] !== undefined && !e[3].includes("onchart")) {
                if (e[3].includes("trade_")) {
                    const id = Number(e[3].split("_")[1]);
                    const oldDatas = this.$store.getters["userTradePlans"];
                    const index = oldDatas.findIndex((item) => item.trade_plan_id === id);
                    const key = Object.keys(e[0])[0];
                    let data = "";

                    if (key === "p1") {
                        if (e[0].p1[1]) {
                            data = {
                                trade_plan_id: id,
                                target_price: Math.round(e[0].p1[1] * 100) / 100,
                                exit_date: e[0].p1[0],
                            };
                        }

                        oldDatas[index].target_price = e[0].p1[1];
                        oldDatas[index].exit_date = e[0].p1[0];
                    } else if (key === "p2") {
                        data = {
                            trade_plan_id: id,
                            stoploss_price: Math.round(e[0].p2[1] * 100) / 100,
                            entry_date: e[0].p2[0],
                        };

                        oldDatas[index].stoploss_price = e[0].p2[1];
                        oldDatas[index].entry_date = e[0].p2[0];
                    } else if (key === "p3") {
                        data = {
                            trade_plan_id: id,
                            entry_price: Math.round(e[0].p3[1] * 100) / 100,
                        };

                        oldDatas[index].entry_price = e[0].p3[1];
                    } else if (key === "entry_alert_status") {
                        data = {
                            trade_plan_id: id,
                            entry_alert_status: e[0].entry_alert_status,
                        };

                        oldDatas[index].entry_alert_status = e[0].entry_alert_status;
                    } else if (key === "stoploss_alert_status") {
                        data = {
                            trade_plan_id: id,
                            stoploss_alert_status: e[0].stoploss_alert_status,
                        };

                        oldDatas[index].stoploss_alert_status = e[0].stoploss_alert_status;
                    } else if (key === "target_alert_status") {
                        data = {
                            trade_plan_id: id,
                            target_alert_status: e[0].target_alert_status,
                        };

                        oldDatas[index].target_alert_status = e[0].target_alert_status;
                    }

                    if (data === "") {
                        return;
                    }

                    this.$store.commit("setUserTradePlans", oldDatas);
                    await ApiService.updateTradePlan(data);
                }

                if (e[3].includes("text_")) {
                    if (!e[0].p1) {
                        return;
                    }

                    const date = new Date(e[0].p1[0]);
                    const id = Number(e[3].split("_")[1]);
                    let data = {
                        diary_item_id: id,
                        date_created: date.toISOString().split("T")[0],
                        y: e[0].p1[1],
                    };

                    await ApiService.updateDiaryItem(data);
                    this.$store.commit("updateMapUserDiaryItem", Object.assign({}, data, { key: "y" }));
                    this.$store.commit("updateMapUserDiaryItem", Object.assign({}, data, { key: "date_created" }));
                }
            }
        }
    },
    computed: {
        getTradeLine() {
            return this.$store.getters["userTradePlans"].filter((item) => item.stock_id === this.stock_id && item.user_id === this.user.user_id);
        }
    }
};
