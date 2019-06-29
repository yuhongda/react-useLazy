# react-useLazy

> a custom React hook for lazy load multiple components 


Install
-----

```javascript

npm i react-useLazy

```


Usage
-----

```javascript

import { useLazy } from 'react-uselazy'

const [ lazyComponents ] = useLazy(
  [1,2,3,4,5,6,7,8,9,10].map((item, i) => <div style={{ fontSize: '100px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><b>{i}</b></div>), 
  5,
  {
    minHeight: '500px',
    backgroundColor:'rgba(0,0,0,.2)',
    marginTop:'20px'
  }
);

```

Options
-----
```javascript
/**
 * useLazy Custom Hook
 * @param {component array} components 
 * @param {use to divide components into chunk} chunkNumber 
 * @param {wrap styles} styles 
 */
function useLazy(components, chunkNumber = 5, styles) {
}
```


Example
-----
```javascript
export default inject(
  props => {
    const { store: { sample } } = props;

    const [ lazyComponents ] = useLazy(
      [1,2,3,4,5,6,7,8,9,10].map((item, i) => <div style={{ fontSize: '100px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><b>{i}</b></div>), 
      5,
      {
        minHeight: '500px',
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
```