import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'getShowOverlays',
            'getBlockWhileAddingOverlay'
        ])
    },
    methods: {
        ...mapMutations([
            'setShowOverlays',
            'setBlockWhileAddingOverlay'
        ]),
        async legend_button_click(event1) {
            const event = event1[0];
            const showOverlays = this.getShowOverlays;

            console.log(event);
            console.log(this.chart.data.onchart);

            if (event.button === 'remove') {
                if(event.overlay === 'MA 20') {
                    console.log('MA 20');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'MA 20') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'MA 20') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'MA 50') {
                    console.log('MA 50');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'MA 50') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'MA 50') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'MA 200') {
                    console.log('MA 200');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'MA 200') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'MA 200') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'Earning Date') {
                    console.log('Earning Date');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Earning Date') {
                            console.log(item);
                            
                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'Earning Date') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'Insiders: By Transaction') {
                    console.log('Insiders: By Transaction');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Insiders: By Transaction') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'Insiders: By Transaction') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'Insiders: Silent Period') {
                    console.log('Insiders: Silent Period');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Insiders: Silent Period') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'Insiders: Silent Period') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                }/* else if(event.overlay === 'Portfolio Transactions') {
                    console.log('Portfolio Transactions');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Portfolio Transactions') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'Portfolio Transactions') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                }*/ else if(event.overlay === 'Journal Notes') {
                    console.log('Journal Notes');

                    for(const item of this.chart.data.onchart) {
                        if(item.type === 'TextTool') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'Journal Notes') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'News') {
                    console.log('News');

                    for(const item of this.chart.data.onchart) {
                        if(item.type === 'NewsTool') {
                            console.log(item);

                            if(!item.settings.display && item.settings.show) {
                                item.settings.display = false;
                                item.settings.show = item.settings.display;
                            } else {
                                item.settings.display = !item.settings.display;
                                item.settings.show = item.settings.display;
                            }

                            for(const i of showOverlays) {
                                if(i.overlay === 'News') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                }

                this.setShowOverlays(showOverlays);

                console.log(JSON.parse(JSON.stringify(this.getShowOverlays)));
            }/* else if (event.button === 'display') {
                if(event.overlay === 'Splines_0') {
                    console.log('MA 20');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'MA 20') {
                            console.log(item);

                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'MA 20') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'Splines_1') {
                    console.log('MA 50');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'MA 50') {
                            console.log(item);

                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'MA 50') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'Splines_2') {
                    console.log('MA 200');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'MA 200') {
                            console.log(item);

                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'MA 200') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'Earnings_0') {
                    console.log('Earning Date');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Earning Date') {
                            console.log(item);
                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'Earning Date') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'InsiderDot_0') {
                    console.log('Insiders: By Transaction');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Insiders: By Transaction') {
                            console.log(item);
                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'Insiders: By Transaction') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'Earnings1_0') {
                    console.log('Insiders: Silent Period');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Insiders: Silent Period') {
                            console.log(item);
                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'Insiders: Silent Period') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'PortfolioTransactions_0') {
                    console.log('Portfolio Transactions');

                    for(const item of this.chart.data.onchart) {
                        if(item.name === 'Portfolio Transactions') {
                            console.log(item);
                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'Portfolio Transactions') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'TextTool_0') {
                    console.log('Journal Notes');

                    for(const item of this.chart.data.onchart) {
                        if(item.type === 'TextTool') {
                            console.log(item);
                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'Journal Notes') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                } else if(event.overlay === 'NewsTool_0') {
                    console.log('News');

                    for(const item of this.chart.data.onchart) {
                        if(item.type === 'NewsTool') {
                            console.log(item);
                            item.settings.display = !item.settings.display;

                            for(const i of showOverlays) {
                                if(i.overlay === 'News') {
                                    console.log(i);
                                    i.display = item.settings.display;
                                }
                            }
                        }
                    }
                }
            }*/

            // Compare block *********************************
            // if(event.overlay.includes("Compare")) {
            //     const compareName = this.chart.data[event.type][event.dataIndex].name;

            //     this.$store.commit("removeCompareDatasByName", compareName);

            //     this.chart.data[event.type] = this.chart.data[event.type].filter((item, index) => index != event.dataIndex);
            // } else {
            //     if(d) {
            //         if(!("show" in d.settings)) {
            //             this.$set(d.settings, "show", false);
            //             this.$set(d.settings, "display", false);
            //         } else {
            //             this.$set(d.settings, "show", !d.settings.show);
            //             this.$set(d.settings, "display", d.settings.show);
            //         }
            //     }
            // }
            // ***********************************************
        }
    }
};
