import Highcharts from 'highcharts/highstock';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);
import { useEffect, useState } from 'react';
const Three = () => {
  // const [stand, setstand] = useState('香蕉')
  const stand = '香蕉';
  useEffect(() => {
    var chart = Highcharts.chart(
      'container',
      {
        chart: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
          },
        },
        title: {
          text: '练习3d圆环',
          fontSize: '10',
          floating: true,
          style: { color: '#00FFFF', fontSize: '12px' },
          verticalAlign: 'top',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: 150,
            depth: 45,
            center: ['50%', '50%'],
            showInLegend: true,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color:
                  (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  'black',
              },
            },
            point: {
              events: {
                mouseOver: function (e) {
                  // 鼠标滑过时动态更新标题
                  chart.setTitle({
                    text: e.target.name + '\t' + e.target.y + ' %',
                  });
                },
              },
            },
          },
        },
        colors: [
          'rgba(255, 176, 70, .65)',
          'rgba(85, 255, 255, .65)',
          'rgba(255, 123, 90, .65)',
          'rgba(255, 144, 241, .65)',
          'rgba(64, 220, 255, .65)',
        ],

        series: [
          {
            name: '货物金额',
            innerSize: '80%',
            size: '80%',
            data: [
              ['香蕉', 8],
              ['猕猴桃', 3],
              ['桃子', 1],
              ['橘子', 6],
              ['苹果', 8],
              ['梨', 4],
              ['柑橘', 4],
              ['橙子', 1],
              ['葡萄 (串)', 1],
            ],
          },
        ],
      },
      function (c) {
        // 图表初始化完毕后的会掉函数
        // 环形图圆心
        var centerY = c.series[0].center[1],
          titleHeight = parseInt(c.title.styles.fontSize);
        // 动态设置标题位置
        c.setTitle({
          y: centerY + 4 * titleHeight,
        });
      },
    );
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
  }, []);

  return (
    <div>
      <h1>highcharts圆环</h1>
      <div id="container" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};
export default Three;
