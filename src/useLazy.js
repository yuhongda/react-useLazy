import React, { useState, useEffect } from 'react';

function chunkArray(array, size) {
    const chunked_arr = [];
    let index = 0;
    while (index < array.length) {
        chunked_arr.push(array.slice(index, size + index));
        index += size;
    }
    return chunked_arr;
}

function useLazy(report) {
    const reportDataKeyList = chunkArray(report.reportData && report.reportData.map(item => item.key), 5);
    // const [ currentKeyList, setCurrentKeyList ] = useState([]);

    useEffect(
        () => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            }
        }
    )

    function getKeyInWindow() {
        const _itemInWindow = report.reportData.find(item => {
            const el = document.getElementById(item.key);
            if(!el) {
                return false
            }
            const scrollTop = window.pageYOffset;
            const pageHeight = el.offsetTop;
            if(scrollTop + window.innerHeight > pageHeight && scrollTop < pageHeight + window.innerHeight) {
                return true
            }else{
                return false
            }
        })
        return _itemInWindow && _itemInWindow.key
    }
    
    function handleScroll(e) {
        const _currentKeyList = reportDataKeyList.find(keyList => keyList.indexOf(getKeyInWindow()) != -1);
        report.setCurrentKeyList(_currentKeyList || [])

        // if(currentKeyList.indexOf(dataItem.key) != -1){
        //     setIsShowSlide(true)
        // } else {
        //     setIsShowSlide(false)
        // }
    }

    // return currentKeyList;
}

export {
    useLazy
}
