import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { observable, computed, toJS, runInAction } from 'mobx'
import { autobind } from 'core-decorators';
import { Button, Breadcrumb } from 'antd';
import styles from './sample.m.scss';
import { dateFormat } from '../../misc/util'
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import AnalysisGather from '../../../utils/analysis';
import { debounce } from '../../misc/util'
import inject from '../../../utils/mobx-react-inject'

import { useLazy } from '../../../../../src/index'

export default inject(
  props => {
    const { store: { sample } } = props;

    const [ lazyComponents ] = useLazy(
      [1,2,3,4,5,6,7,8,9,10].map((item, i) => <div style={{ fontSize: '100px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><b>{i}</b></div>), 
      5,
      {
        height: '500px',
        backgroundColor:'rgba(0,0,0,.2)',
        marginTop:'20px'
      }
    );
    return (
      <div className={styles.sample}>
        <div className={styles.pageCnt}>
            <div className={styles.pageTitle}>
                <Breadcrumb>
                    <Breadcrumb.Item>useLazy Demo</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={styles.testDiv}>
            </div>
            {lazyComponents}
        </div>
      </div>
    )
  }
);




