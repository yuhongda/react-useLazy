import * as React from 'react';

const LazyComp = (props: any) => {
  const { id, isShowContent, styles, loadingComponent } = props;

  return (
    <div id={id} style={styles}>
      { isShowContent ? props.children : loadingComponent }
    </div>
  )
};

export default LazyComp;
