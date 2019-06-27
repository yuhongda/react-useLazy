import 'whatwg-fetch';
import 'es6-weak-map/implement';
import arrayFrom from 'array-from';
if (!Array.from) Array.from = arrayFrom;
import 'console-polyfill';
import React, { Suspense, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { observer, Provider, inject } from 'mobx-react';
import routes from './routes';
import hotReloadRoutes from './hotReloadRoutes';
import './src/web/css/app.scss'
import RootStore from './src/stores/rootStore';
import { onSnapshot } from "mobx-state-tree";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { setStore } from './src/utils/mobx-react-inject';
import { useObserver } from 'mobx-react-lite';
import Loading from './src/web/components/spin'

const rootStore = RootStore.create({});
const StoreContext = React.createContext()
setStore(StoreContext)

const App = (props) => {

  const [state, setState] = useState(rootStore);
  const contextValue = useMemo(() => [state, setState], [state]);

  return <StoreContext.Provider value={rootStore}>
          <HashRouter>
            <Suspense fallback={Loading}>
              <div id="outer-container">
                  {props.appRoutes()}
              </div>
            </Suspense>
          </HashRouter>
        </StoreContext.Provider>
}

const renderApp = appRoutes => {
  ReactDOM.render(
    <App appRoutes={appRoutes}/>,
    document.getElementById('app')
  );
};
renderApp(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    // hotReloadRoutes(routes, nextRoutes);
    renderApp(newRoutes);
  });
}
