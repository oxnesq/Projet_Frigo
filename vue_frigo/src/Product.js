// une chose
import {id} from "vuetify/locale";
import {name} from "eslint-plugin-vue/lib/meta";

export default class Product {
  constructor(id, name, qty, picture) {
    this._id = id;
    this._name = name;
    this._qty = qty;
    this._picture = picture;
  }

havePic(){
    let bo=true;
    if (this._picture===""){
      bo=false;
    }
    return bo;
}


  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
  get qty() {
    return this._qty;
  }


  get picture() {
    return this._picture;
  }
  setQty(number){
    this._qty += number;
  }


}
