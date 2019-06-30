function getIdInWindow(ids: Array<string> = []): string {
  const _idInWindow = ids.find(id => {
      const el = document.getElementById(id);
      if(!el) {
          return false
      }
      const scrollTop = window.pageYOffset;
      const pageHeight = el.offsetTop;
      if(scrollTop + window.innerHeight > pageHeight && scrollTop < pageHeight) {
          return true
      }else{
          return false
      }
  })
  return _idInWindow
}

function chunkArray(array: Array<string>, size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
  }
  return chunked_arr;
}

export {
  getIdInWindow,
  chunkArray
};
