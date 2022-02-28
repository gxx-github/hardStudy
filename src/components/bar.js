import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const Bar = (props) => {
  useEffect(() => {
    echartsTest();
  }, []);
  function echartsTest() {
    var myChart = echarts.init(document.getElementById('active'));
    // let xAxisData = Object.keys(props.activeData).reverse();
    // const newxAxisData = xAxisData.map((item,index)=>{
    //   return item.split('-').slice(1).join('-')
    // })
    // let seriesData = Object.values(props.activeData).reverse();
    let newxAxisData = [
      '02-12',
      '02-13',
      '02-14',
      '02-15',
      '02-16',
      '02-17',
      '02-18',
      '02-19',
      '02-20',
      '02-21',
      '02-22',
      '02-23',
    ];
    let seriesData = [45, 40, 0, 42, 2, 54, 81, 42, 2, 28, 4, 48];
    let botData = [];
    let topData = [];
    let sum = 0;
    seriesData.map((item) => {
      botData.push(1); // 底数小三角
      if (item > sum) {
        sum = item;
      }
    });
    seriesData.map((it) => {
      topData.push(sum * 1 + 10); //背景柱子数据
    });
    var option = {
      title: {
        text: '单位：人',
        top: '3%',
        textStyle: {
          fontSize: 12,
          color: '#fff',
        },
      },
      tooltip: {
        // 提示
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params, ticket, callback) {
          const item = params[2];
          return item.name + ' : ' + item.value;
        },
        transitionDuration: 0,
      },
      grid: {
        // 图形大小，位置
        containLabel: true,
        top: '17%',
        left: '2%',
        right: '2%',
        bottom: '1%',
      },
      xAxis: {
        // x轴相关
        axisLabel: {
          color: '#9DCFCF',
          fontSize: 12,
          interval: 0,
          margin: 20,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(76, 228, 230, 0.1)',
            width: 1,
            type: 'dashed',
          },
          show: true,
        },
        data: newxAxisData,
        type: 'category',
      },
      dataZoom: [
        //滑动条
        {
          show: false, //是否显示滑动条
          type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          startValue: 0, // 从头开始。
          endValue: 4, // 一次性展示5个。
        },
      ],
      yAxis: {
        // y轴相关
        axisLabel: {
          color: '#9DCFCF',
          fontSize: 14,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(76, 228, 230, 0.2)', //虚线颜色
            type: 'dashed',
          },
        },
        axisLine: {
          show: false,
        },
        name: '',
      },
      series: [
        {
          data: seriesData,
          type: 'bar',
          barMaxWidth: 'auto',
          barWidth: 30,

          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(36, 136, 216, 1)' },
                { offset: 1, color: 'rgba(47, 210, 255, 1)' },
              ]),
            },
          },
          label: {
            show: true,
            position: 'top',
            distance: 10,
            color: '#fff',
          },
        },
        {
          data: botData, //底部三角
          type: 'pictorialBar',
          barMaxWidth: '20',
          color: '#3CBEE7',
          symbol: 'diamond',
          symbolOffset: [0, '50%'],
          symbolSize: [30, 13],
        },
        {
          data: seriesData, //数据上部分
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [30, 13],
          zlevel: 2,
          //   color:'rgba(76, 228, 230, 1)'
          color: '#3CBEE7',
        },
        {
          data: topData, //背景阴影
          type: 'bar',
          barMaxWidth: 'auto',
          barWidth: 30,
          barGap: '-100%',
          zlevel: -1,
          color: 'rgba(0, 59, 88, .6)',
        },
        {
          data: topData, //顶部三角
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [30, 13],
          color: 'rgba(0, 59, 88, 1)',
          zlevel: -1,
        },
        // {
        //   name: '累计task数',
        //   type: 'line',
        //   symbolSize:8,
        //   symbol: 'circle',
        //   itemStyle: {
        //     normal: {
        //       color: '#D684F9',
        //       barBorderRadius: '100%',
        //     },
        //     borderColor: '#D684F9',
        //     color: '#D684F9',
        //   },
        //   zlevel: 2,
        //   smooth: true,
        //   lineStyle: {
        //     normal: {
        //       width: 2,
        //       color: {
        //         type: 'linear',
        //         x: 0,
        //         y: 0,
        //         x2: 0,
        //         y2: 1,
        //         colorStops: [
        //           {
        //             offset: 0,
        //             color: '#F07B60 ', // 0% 处的颜色
        //           },
        //           {
        //             offset: 1,
        //             color: '#F07B60 ', // 100% 处的颜色
        //           },
        //         ],
        //         global: false, // 缺省为 false
        //       },
        //     },
        //   },
        //   data: seriesData,
        // },
      ],
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
      myChart.resize();
    });
    // 使用刚指定的配置项和数据显示图表。
    setInterval(function () {
      // 每次向后滚动一个，最后一个从头开始。
      if (option.dataZoom[0].endValue == seriesData.length) {
        option.dataZoom[0].endValue = 4;
        option.dataZoom[0].startValue = 0;
      } else {
        option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
        option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
      }
      myChart.setOption(option);
    }, 2000);
  }
  return <div id="active" style={{ width: '70%', height: '100%' }}></div>;
};
export default Bar;
