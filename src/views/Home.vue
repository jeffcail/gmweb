<template>

    <div>
        
        <div id="main" style="width: 100%; height: 400px"></div>

        <div style="margin-top: 20px;">

            <el-row>
            <el-col :span="12">
                <div id="main2" style="width: 500px; height: 500px;"></div>
            </el-col>

            <el-col :span="12">
                <div id="main3" style="width: 500px; height: 500px;"></div>
            </el-col>
            </el-row>

        </div>

    </div>

</template>

<script>
import * as echarts from 'echarts'

export default {
    name:"Home",
    data() {
        return {

        }
    },

    mounted() {

        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        // Generate data
        let category = [];
        let dottedBase = +new Date();
        let lineData = [];
        let barData = [];
        for (let i = 0; i < 20; i++) {
        let date = new Date((dottedBase += 3600 * 24 * 1000));
        category.push(
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
        );
        let b = Math.random() * 200;
        let d = Math.random() * 200;
        barData.push(b);
        lineData.push(d + b);
        }
        // option
        option = {
        backgroundColor: '#0f375f',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            data: ['line', 'bar'],
            textStyle: {
            color: '#ccc'
            }
        },
        xAxis: {
            data: category,
            axisLine: {
            lineStyle: {
                color: '#ccc'
            }
            }
        },
        yAxis: {
            splitLine: { show: false },
            axisLine: {
            lineStyle: {
                color: '#ccc'
            }
            }
        },
        series: [
            {
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData
            },
            {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                borderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' }
                ])
            },
            data: barData
            },
            {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20,200,212,0.5)' },
                { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                { offset: 1, color: 'rgba(20,200,212,0)' }
                ])
            },
            z: -12,
            data: lineData
            },
            {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
                color: '#0f375f'
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
            }
        ]
        };

        myChart.setOption(option);


        var chartDom = document.getElementById('main2');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
            }
        ]
        };

        option && myChart.setOption(option);





        var chartDom = document.getElementById('main3');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
        };
      myChart.setOption(option);
    
    }
}




</script>

<style scoped>

</style>
