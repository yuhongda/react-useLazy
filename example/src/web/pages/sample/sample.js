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
    
    return (
      <div className={styles.sample}>
        <div className={styles.pageCnt}>
            <div className={styles.pageTitle}>
                <Breadcrumb>
                    <Breadcrumb.Item>useLazy Demo</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={styles.testDiv}>
            test
            </div>
        </div>
      </div>
    )
  }
);




