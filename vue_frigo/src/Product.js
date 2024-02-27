// une chose
import {id} from "vuetify/locale";
import {name} from "eslint-plugin-vue/lib/meta";
import {Exception} from "sass";

export default class Product {
  constructor(id, name, qty, picture) {
    this._id = id;
    this._name = name;
    if (qty<=0)
      throw new Exception("la quantite doit etre positive ");
    this._qty = qty;
    /*if  (picture.substr(0, 8)!=="https://" && picture!=="")
      throw new Exception("Veuillez entrer un lien");*/
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


  set picture(value) {
    this._picture = value;
  }

  setQty(number){
    this._qty += number;
  }

}
