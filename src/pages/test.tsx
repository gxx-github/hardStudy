import React, { useEffect, useState } from 'react';
import { useInputBind, useCheckboxBind } from '@/components/hooks'
import { Input, Button, Checkbox, Col, Row } from 'antd';
import './test.less'
import useTextSelection from '@/components/hooks/bind/useTextSelection';
import useSize from '@/components/hooks/useSize';

const list: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
const login = () => {
  const inputProps = useInputBind('请输入--');
  const { selected, allSelected, isSelected, toggle, reverse, toggleAll, partiallySelected } = useCheckboxBind(list, [
    1
  ]);
  const { text, top, left, bottom, right, height, width } = useTextSelection();
  const [popVisible, setPopVisible] = useState(false);
  const dom= document.querySelector('body');
  const size = useSize(dom);
  useEffect(() => {
    if (text.trim() === '') {
      setPopVisible(false);
      return;
    }
    setPopVisible(true);
  }, [text, popVisible]);
  return (
    <div className='test'>
      <h1>自定义hook封装组件</h1>
      {/* input实现类似vue双向绑定v-model */}
      <p>input实现类似vue双向绑定v-model----useInputBind</p>
      <div>
        <p>Value: {inputProps.value}</p>
        <Input type='text' {...inputProps} />
      </div>
      {/* checkout选择的双向绑定 */}
      <p>checkout选择的双向绑定----useCheckboxBind</p>
      <div>
        <div>Selected: {selected.join(',')}</div>
        <div >
          <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
            check all
          </Checkbox>
          <Button type='primary' onClick={reverse}>
            reverse
          </Button>
        </div>
        <Row >
          {list.map((item: number) => (
            <Col span={12} key={item}>
              <Checkbox checked={isSelected(item)} onClick={() => toggle(item)}>
                {item}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </div>
      {/* 任意选择页面上的任何文字+确定文本区域中选中的部分或光标的视窗坐标 */}
      <p>任意选择页面上的任何文字----useTextSelection</p>确定文本区域中选中的部分或光标的视窗坐标
      <div>
        <p>
          选中的文字: {text} <br />
          width: {width} <br />
          height: {height} <br />
          top: {top} <br />
          right: {right} <br />
          bottom: {bottom} <br />
          left: {left} <br />
        </p>
      </div>
      {/* 监听窗口变化获取窗口视图大小 */}
      <p>监听窗口变化获取窗口视图大小----useSize</p>
      <div>
      Width: {size.width} px, Height: {size.height} px.
      </div>
    </div>
  );
}

export default login