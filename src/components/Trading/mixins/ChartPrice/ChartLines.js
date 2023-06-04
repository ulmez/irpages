import ApiService from './../../../../Services/ApiService';

export default {
    methods: {
        async fetchUserLines() {
            try {
                const response = await ApiService.fetchUserLinesData({
                    user_id: this.user.user_id,
                    stock_id: this.stock_id,
                });

                console.log("fetched UserLines");

                const line_data = JSON.parse(response.data.content);
                this.lineData = line_data;
            } catch (error) {
                console.log(error.message);
            }
        },
        chnLineType(type) {
            this.lineType = type;
            const d = this.chart.data;
            this.$set(d.chart, "type", type);
        }
    },
    watch: {
        "chart.data.onchart": {
            deep: true,
            immediate: true,
            handler() {
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    if (this.chart.data.onchart.length > 7) {
                        const dummy = [];

                        for (let i = 7; i < this.chart.data.onchart.length; i++) {
                            const p = this.chart.data.onchart[i];

                            if (!p.id.includes("onchart.PositionTool")) {
                            dummy.push(this.chart.data.onchart[i]);
                            }
                        }

                        try {
                            await ApiService.save_UserLines({
                                user_id: this.user.user_id,
                                stock_id: this.stock_id,
                                content: JSON.stringify(dummy)
                            });

                            console.log('saved User Lines');
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                }, 1000);
            }
        },
        "chart.data.tool": {
            deep: true,
            immediate: true,
            handler(newValue, oldValue) {
                if(newValue && newValue.includes('PositionTool') && newValue !== oldValue) {
                    this.showWarning = this.page === 'main' && (this.user.type === 'new' || this.user.type === 'freemium') && this.allTradeLine.length === 10;
                }
            }
        }
    }
};
