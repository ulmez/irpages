/* eslint-disable */
// import ApiService from './../../../../Services/ApiService';

const ohlcvJSON = require('./ohlcv.json');

export default {
    methods: {
        filterOhlcv(data) {
            if (this.interval === "") {
                return data;
            }

            let init = 0;
            let temp = [];
            let low = Infinity;
            let high = 0;
            const ohlcv = [];

            for(const [index, item] of data.entries()) {
                if (index === 0) {
                    init = item[0] + this.interval * 60 * 60 * 1000 * 24;
                    temp[0] = item[0];
                    temp[1] = item[1];
                    temp[2] = item[2];
                    temp[3] = item[3];
                    temp[4] = item[4];
                    temp[5] = item[5];

                    if (temp[0] === null) {
                        return;
                    }

                    low = item[3];
                    high = item[2];
                } else {
                    if (init <= item[0]) {
                        ohlcv.push(temp);

                        temp = [];
                        temp[0] = item[0];
                        temp[1] = item[1];
                        temp[2] = item[2];
                        temp[3] = item[3];
                        temp[4] = item[4];
                        temp[5] = item[5];
                        init = item[0] + this.interval * 60 * 60 * 1000 * 24;
                        low = Infinity;
                        high = 0;
                    } else {
                        if (low > Math.min(item[3], item[2])) {
                            low = Math.min(item[3], item[2]);
                        }

                        if (high < Math.max(item[3], item[2])){
                            high = Math.max(item[3], item[2]);
                        }

                        temp[2] = high;
                        temp[3] = low;
                        temp[4] = item[4];
                        temp[5] += item[5];
                    }
                }
            }

            return ohlcv;
        },
        filterData(data) {
            let data0 = '';

            if(this.interval === "") {
                data0 = data;
            } else {
                let init = 0;

                data0 = data.filter((item, i) => {
                    if(i === 0) {
                        init = item[0] + this.interval * 60 * 60 * 1000 * 24;

                        return true;
                    } else {
                        if(init <= item[0]) {
                            init = item[0] + this.interval * 60 * 60 * 1000 * 24;

                            return true;
                        } else {
                            return false;
                        }
                    }
                });
            }

            return data0;
        },
        async getOHLCV() {
            try {
                // const response = await ApiService.getPrices(this.stock_id);

                const response = ohlcvJSON;

                return response;
            } catch (error) {
                console.log(error.message);
            }
        },
        async getStockSplit() {
            try {
                return [];//await ApiService.getStockSplit(this.stock_id);
            } catch (error) {
                console.log(error.message);
            }
        },
        async getOnchart(stock_id) {
            try {
                // const response = (await ApiService.getPrices(stock_id)).data;

                // return response.ohlcv;

                return ohlcvJSON.data.ohlcv;
            } catch (error) {
                console.log(error.message);
            }
        },
        makeMa(ohlcv, n) {
            const ma = [];
            const sum = [];

            for(const item of ohlcv) {
                sum.push(item[4]);

                if (sum.length > n) {
                    sum.shift();
                }

                const val = Math.round((eval(sum.join("+")) * 100) / sum.length) / 100;

                ma.push([item[0], val]);
            }

            return ma;
        },
        makeStockSplit(ohlcv, split) {
            const s = [];

            for(const item of ohlcv) {
                if (item[0] < split.split_date ) {
                    const o = item[1] / split.split_x;
                    const h = item[2] / split.split_x;
                    const l = item[3] / split.split_x;
                    const c = item[4] / split.split_x;
                    ss.push([item[0], o, h, l, c]);
                } else {
                    ss.push([item[0], item[1], item[2], item[3], item[4]]);
                }
            }

            return ss;
        }
    }
};
