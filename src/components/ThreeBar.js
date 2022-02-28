import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const ThreeBar = (props) => {
  useEffect(() => {
    echartsTest();
  }, []);
  const offsetX = 20;
  const offsetY = 10;
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint;
      // console.log(shape);
      const c0 = [shape.x, shape.y];
      const c1 = [shape.x - offsetX, shape.y - offsetY];
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
      const c3 = [xAxisPoint[0], xAxisPoint[1]];
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    },
  });
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y];
      const c2 = [xAxisPoint[0], xAxisPoint[1]];
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
      const c4 = [shape.x + offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y];
      const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
      const c3 = [shape.x, shape.y - offsetX];
      const c4 = [shape.x - offsetX, shape.y - offsetY];
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    },
  });
  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft);
  echarts.graphic.registerShape('CubeRight', CubeRight);
  echarts.graphic.registerShape('CubeTop', CubeTop);

  function echartsTest() {
    var myChart = echarts.init(document.getElementById('threeBar'));
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
          type: 'custom',
          renderItem: (params, api) => {
            const location = api.coord([api.value(0), api.value(1)]);
            return {
              type: 'group',
              children: [
                {
                  type: 'CubeLeft',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0]),
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#3F98DF',
                      },
                      {
                        offset: 1,
                        color: '#8BFBFF',
                      },
                    ]),
                  },
                },
                {
                  type: 'CubeRight',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0]),
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#3F98DF',
                      },
                      {
                        offset: 1,
                        color: '#8BFBFF',
                      },
                    ]),
                  },
                },
                {
                  type: 'CubeTop',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0]),
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#2FD2FF ',
                      },
                      {
                        offset: 1,
                        color: '#2FD2FF',
                      },
                    ]),
                  },
                },
              ],
            };
          },
          data: seriesData,
        },
        {
          type: 'bar', //基本
          label: {
            normal: {
              show: false,
              position: 'top',
              formatter: (e) => {
                return e.value + '次';
              },
              fontSize: 16,
              color: '#43C4F1',
              offset: [0, -25],
            },
          },
          itemStyle: {
            color: 'transparent',
          },
          tooltip: {},
          data: seriesData,
        },
        {
          type: 'custom', //阴影柱子
          renderItem: (params, api) => {
            const location = api.coord([api.value(0), api.value(1)]);
            return {
              type: 'group',
              children: [
                {
                  type: 'CubeLeft',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0]),
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(0, 59, 88, .3)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(0, 59, 88, .3)',
                      },
                    ]),
                  },
                },
                {
                  type: 'CubeRight',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0]),
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(0, 59, 88, .3)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(0, 59, 88, .3)',
                      },
                    ]),
                  },
                },
                {
                  type: 'CubeTop',
                  shape: {
                    api,
                    xValue: api.value(0),
                    yValue: api.value(1),
                    x: location[0],
                    y: location[1],
                    xAxisPoint: api.coord([api.value(0), 0]),
                  },
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(0, 59, 88, .3)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(0, 59, 88, .3)',
                      },
                    ]),
                  },
                },
              ],
            };
          },
          data: topData,
        },
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
  return <div id="threeBar" style={{ width: '70%', height: '100%' }}></div>;
};
export default ThreeBar;
