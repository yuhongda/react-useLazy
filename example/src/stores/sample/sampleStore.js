import { types } from "mobx-state-tree";
import queryParams from '../../utils/queryParams';
import moment from 'moment';
import {
  Category,
  Brand
} from "../commonStore";
import { toJS } from 'mobx';

const SampleStore = types.model("SampleStore", {
})
.volatile(self => ({
  test: 'title'

}))
.views(self => {
  return {

  };
})
.actions(self => {
  return {
    setTest(value){
      self.test = value
    },
    afterCreate(){
      
    },
  };
});

export default SampleStore;