import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';

export let storeContext = null;

export const setStore = newStore => {
  storeContext = newStore;
};

const inject = baseComponent => {
  const component = ownProps => {
    if (storeContext === null){
      throw new Error('Please, use setStore before your ReactDOM.render call');
    }
    
    const store = useContext(storeContext);
    return useObserver(() =>
      baseComponent({ ...ownProps, store })
    );
  };
  component.displayName = baseComponent.name;
  return component;
};

export default inject;


export function withHooks(Comp) {
  return inject(props => {
    return <Comp {...props} />;
  })
}