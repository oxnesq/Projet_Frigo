<script setup>
import {reactive, onMounted, ref} from "vue";
import Product from "@/Product";
import FormView from "@/components/FormView.vue";
import ListProducts from "@/components/ListProducts.vue";

import SearchView from "@/components/SearchView.vue";
import Image from "@/components/Image.vue";
import AddPicProduct from "@/components/AddPicProduct.vue";

const listeProducts = reactive([]);

// -- l'url de l'API
let url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/24/produits";

function witchCalcul(product, calcul){
  if (calcul === "-") {
    product.setQty(-1);

  } else if (calcul==="+"){
    if(product.qty<5){
      product.setQty(+1);
    } else {
      alert("Le frigo est pleins");
    }
  }
  if (product.qty===0){
    deleteProduct(product.id)
  }

  changeProduct(product,calcul);
}


function isALink(chaine){
  //console.log(chaine.substr(0, 8))
  let bo=false;
  if (chaine.substr(0, 8)==="https://")
    bo=true;
  return bo
}

function changeLinkProduct(productName, link){
  console.log(listeProducts)

  for (let i=0;i<=listeProducts.length;i++){
    let prod=listeProducts[i];
    if (productName===prod.name){
      if (isALink(link)){
        prod.picture=link;
        changeProduct(prod)
      }
    }
  }
}



// -- modif a product in the list
function changeProduct(product) {

  // -- entête http pour la req AJAX
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: product.id, nom: product.name, qte: product.qty,photo : product.picture }),
  };
  console.log(product)
  // -- la req AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getProducts();
    })
    .catch((error) => console.log(error));

}

// -- delete a product
function deleteProduct(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id de la chose à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getProducts();
    })
    .catch((error) => console.log(error));
}

// -- add a product
function addProduct(nom, qty, pic) {
  console.log(nom, qty, pic);

  if(listeProducts.length<5){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // --  le libelle de la nouvelle chose est envoyé au serveur
    //  via le body de la req AJAX
    const fetchOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({nom: nom, qte: qty, photo: pic}),
    };
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        getProducts();
      })
      .catch((error) => console.log(error));
  } else{
    alert("Le frigo est pleins");
  }

}

let research = "";

function updateResearch(search){
  //console.log(search)
  research=search;
  getProducts()
}

function getProducts() {
  const fetchOptions = {method: "GET"};
  let searchUrl
  if (research!==""){
    searchUrl = url + "?search="+research;
  } else {
    searchUrl = url;
  }
  //console.log(url);

  fetch(searchUrl, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
/*
      console.log(dataJSON);
*/
      // -- vider la liste des produits
      listeProducts.splice(0, listeProducts.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Chose
      //  et l'ajouter dans la liste listeC
      dataJSON.forEach((v) => listeProducts.push(new Product(v.id, v.nom, v.qte, v.photo)));
/*
      console.log(listeProducts)
*/
    })
    .catch((error) => console.log(error));
}

// -- fonction du cycle de vie du composant
// exécutée 1 seule fois à la création
onMounted(() => {
  getProducts();
});

let numInList = 1;

function setNumInList() {
  numInList += 1;
}

const drawerLeft = ref(true) // booléen pour afficher/cacher la zone de gauche
const drawerRight = ref(true)

</script>

<template>
<!--  <v-layout class="rounded rounded-md">-->

    <v-app-bar color="teal-lighten-5" title="Frigo de Océane">
      <template v-slot:prepend>
        <!-- un clic sur l'icone cache/affiche la zone de menu de gauche -->
        <v-app-bar-nav-icon @click.stop="drawerLeft = !drawerLeft"><v-icon>mdi-food-outline</v-icon></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <!-- un clic sur l'icone cache/affiche la zone de menu de gauche -->
        <v-app-bar-nav-icon  @click.stop="drawerRight = !drawerRight"><v-icon>mdi-fridge-outline</v-icon></v-app-bar-nav-icon>
      </template>
    </v-app-bar>


    <v-navigation-drawer style="min-width: 400px;" app v-model="drawerLeft">

      <FormView class="formView" @addProduct="addProduct" @isALink="isALink"></FormView>
      <SearchView class="searchView" @getProduct="getProducts" @updateResearch="updateResearch"></SearchView>

    </v-navigation-drawer>

    <v-navigation-drawer location="right" style="min-width: 300px;" app v-model="drawerRight">

      <v-list >
        <v-list-item class="listProd"  >
          <h4>Votre frigo contient :</h4><br>
          <ListProducts v-for="product in listeProducts"
                        :product="product"

                        @deleteProduct="deleteProduct"
                        @changeProduct="witchCalcul" style="left: 60px"></ListProducts>



          <AddPicProduct @changeProduct="changeLinkProduct"></AddPicProduct>


        </v-list-item>
      </v-list>
  </v-navigation-drawer>

    <v-main class="frigo-main" >
        <v-col class="d-flex_child-flex"  >
          <v-row v-for="product in  listeProducts" :key="product.id"
                 cols="12"
                 sm="6"
                 md="3"
                 lg="2"
                 xl="2">
            <v-card class="card-style" v-for="n in product.qty">
              <Image
                     :product="product"></Image>
            </v-card>
        </v-row>
        </v-col>
    </v-main>
<!--
  </v-layout>
-->

</template>

<style scoped>

.frigo-main {
  background-image: url("../pics/fridge_open.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  text-align: center;
  min-height: 300px;
}

.d-flex_child-flex {
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-10%,-60%);
}

.card-style{
  margin-right: 5px;
  margin-bottom: 25px;
}

</style>
