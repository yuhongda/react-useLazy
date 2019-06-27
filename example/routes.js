import React, { lazy } from 'react';
import { withRouter, Redirect } from 'react-router'
import { Switch, Route } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import inject from './src/utils/mobx-react-inject';

const comps = {
  Sample: withRouter(lazy(() => import('./src/web/pages/sample/sample.js'))),
}

const Sample = () => (
  <PageWrap>
    <comps.Sample />
  </PageWrap>
)



const PageWrap = inject(
  ({ store, children }) =>{
      return <div style={{height:'100%'}}>
                <div id="page-wrap">
                  {children}
                </div>
              </div>
    }
)


const routes = () => {
  return (
    <Switch>
      <Route exact path='/sample' component={Sample}/>
      <Redirect from='*' to='/sample'/>
    </Switch>
  );
};

export default routes;
