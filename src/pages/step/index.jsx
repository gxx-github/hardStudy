import GridLayout from 'react-grid-layout';
import './index.css';
import styles from './index.less';
import Three from '../../components/Three.js';
import ThreeBar from '../../components/ThreeBar.js';
import Threemap from '../../components/Threemap.js';
import Bar from '../../components/Bar.js';
import { Menu, Dropdown, Button } from 'antd';
export default function IndexPage(props) {
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            props.history.push('/examp/map');
          }}
        >
          geo3d地图
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.step}>
      <div className={styles.top}>
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <Button>组件类别</Button>
        </Dropdown>
      </div>
      <GridLayout className="layout" cols={12} rowHeight={50} width={1900}>
        <div key="a" data-grid={{ x: 4, y: 4, w: 4, h: 10 }}>
          <Three />
        </div>
        <div key="b" data-grid={{ x: 5, y: 0, w: 4, h: 9 }}>
          <Bar />
        </div>
        <div key="c" data-grid={{ x: 0, y: 4, w: 3, h: 9 }}>
          <ThreeBar />
        </div>
        <div key="d" data-grid={{ x: 0, y: 0, w: 8, h: 9 }}>
          <Threemap />
        </div>
      </GridLayout>
      <div></div>
    </div>
  );
}
