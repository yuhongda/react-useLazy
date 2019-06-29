import React, { useState, useEffect, useRef } from 'react';
import uuidv1 from 'uuid/v1'
import uuidv5 from 'uuid/v5'
import hash from 'object-hash'
import LazyComp from './LazyComp';
import { getIdInWindow, chunkArray } from './utils'

/**
 * useLazy Custom Hook
 * @param {component array} components 
 * @param {use to divide components into chunk} chunkNumber 
 * @param {wrap styles} styles 
 */
function useLazy(components, chunkNumber = 5, styles) {

  // id list of LazyComp list
  const [ ids, setIds ] = useState([]);

  // render result
  const [ lazyComponents, setLazyComponents ] = useState([]);

  // split 'ids' by 'chunkNumber'
  const [ chunkIdList, setChunkIdList ] = useState([]);

  // current chunk that show in window
  const [ currentIdList, setCurrentIdList ] = useState([]);

  const lastIds = useRef(ids);
  const lastChunkIdList = useRef(chunkIdList);
  const lastCurrentIdList = useRef(currentIdList);

  let _timeId = null;

  // update last value
  useEffect(
    () => {
      lastIds.current = ids;
      lastChunkIdList.current = chunkIdList;
      lastCurrentIdList.current = currentIdList;
    },
    [hash(ids), hash(chunkIdList), hash(currentIdList)]
  )

  // generate ids
  useEffect(
    () => {
      const _ids = [];
      components && components.map((comp, i) => {
        const id = `lazy_comp_${uuidv5(`lazy_comp${i}`, uuidv1())}`;
        _ids.push(id);
      });
      setIds(_ids);
    },
    [components.length, chunkNumber]
  )

  // wrap components with 'LazyComp'
  useEffect(
    () => {
      setLazyComponents(components && components.map((comp, i) => {
        return (
          <LazyComp key={i} id={lastIds.current[i]} isShowContent={lastCurrentIdList.current.indexOf(lastIds.current[i]) != -1} styles={styles}>
            { comp }
          </LazyComp>
        )
      }));
      const _chunkIdList = chunkArray(lastIds.current, chunkNumber);
      setChunkIdList(_chunkIdList);
    },
    [components.length, chunkNumber, hash(ids), hash(currentIdList)]
  )

  // for the FIRST render
  useEffect(
    () => {
      setCurrentIdList(chunkArray(lastIds.current, chunkNumber)[0] || []);
    },
    [hash(ids)]
  )
    
  // scroll event
  useEffect(
    () => {
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      }
    },
    [components.length, chunkNumber]
  )
    
  function handleScroll(e) {
    if(_timeId){
      window.clearTimeout(_timeId);
    }

    _timeId = window.setTimeout(() => {
      const _currentIdList = lastChunkIdList.current.find(idList => idList.indexOf(getIdInWindow(lastIds.current)) != -1);
      setCurrentIdList(_currentIdList);
    }, 500);
  }

  return [ lazyComponents ];
}

export {
  useLazy
}
