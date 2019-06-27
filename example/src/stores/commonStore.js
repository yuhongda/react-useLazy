import { types } from "mobx-state-tree"
import Notification from '../utils/notification';
import { toJS } from 'mobx'

export const CommonStore = types.model("CommonStore", {
})
.volatile(self => ({
  userInfo: null,
  currentMenuKey: null,
}))
.views(self => {
  return {

  };
})
.actions(self => {
  return {
    

    setCurrentMenuKey(key){
      self.currentMenuKey = key;
    },

    setUserInfo(value){
      self.userInfo = value;
    },
    
    afterCreate(){
      self.userInfo = {
        nickname: '管理员'
      }
      self.currentMenuKey = 'order'
    },
  };
});
