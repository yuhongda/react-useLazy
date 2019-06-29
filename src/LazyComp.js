import React from 'react';

const LazyComp = props => {
  const { id, isShowContent, styles, loadingComponent } = props;

  return (
    <div id={id} style={styles}>
      { isShowContent ? props.children : loadingComponent }
    </div>
  )
};

export default LazyComp;
