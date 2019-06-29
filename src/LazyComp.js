import React from 'react';

const LazyComp = props => {
  const { id, isShowContent, styles } = props;

  return (
    <div id={id} style={styles}>
      { isShowContent ? props.children : '' }
    </div>
  )
};

export default LazyComp;
