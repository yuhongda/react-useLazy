import React from 'react'
import { Icon } from 'antd';

const spinWrap = {
  textAlign: 'center',
  background: 'rgba(0,0,0,0.05)',
  borderRadius: '4px',
  marginBottom: '20px',
  padding: '100px 50px',
  margin: '20px 0'
}
const Loading = (
  <div style={spinWrap}>
    <Icon type="loading" />
  </div>
);

export default Loading;
