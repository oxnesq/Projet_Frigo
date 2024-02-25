<script setup>
import {reactive, onMounted, ref} from "vue";
import Product from "@/Product";
import FormView from "@/components/FormView.vue";
import ListProducts from "@/components/ListProducts.vue";

import SearchView from "@/components/SearchView.vue";
import Image from "@/components/Image.vue";

const listeProducts = reactive([]);

// -- l'url de l'API
let url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/24/produits";

// -- modif a product in the list
function changeProduct(product, calcul) {
  console.log(product);

  if (calcul === "-") {
    product.setQty(-1);

  } else {
    product.setQty(+1);
  }
  if (product.qty===0){
    deleteProduct(product.id)
  }
  console.log(product.qty)


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
}

let research = "";

function updateResearch(search){
  console.log(search)
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
  console.log(url);

  fetch(searchUrl, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
/*
      console.log(dataJSON);
*/
      // -- vider la liste des choses
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

const drawerLeft = ref(false) // booléen pour afficher/cacher la zone de gauche
const drawerRight = ref(false)

</script>

<template>
<!--  <v-layout class="rounded rounded-md">-->

    <v-app-bar color="teal-lighten-5" title="Frigo de Océane">
      <template v-slot:prepend>
        <!-- un clic sur l'icone cache/affiche la zone de menu de gauche -->
        <v-app-bar-nav-icon @click.stop="drawerLeft = !drawerLeft"></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <!-- un clic sur l'icone cache/affiche la zone de menu de gauche -->
        <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
      </template>
    </v-app-bar>


    <v-navigation-drawer style="min-width: 400px;" app v-model="drawerLeft">

      <FormView class="formView" @addProduct="addProduct"></FormView>
      <SearchView class="searchView" @getProduct="getProducts" @updateResearch="updateResearch"></SearchView>

    </v-navigation-drawer>

    <v-navigation-drawer location="right" style="min-width: 300px;" app v-model="drawerRight">
      <v-list>
        <v-list-item class="listProd">
          <h4>Votre frigo contient :</h4><br>
          <ListProducts v-for="product in listeProducts"
                        :product="product"

                        @deleteProduct="deleteProduct"
                        @changeProduct="changeProduct"></ListProducts>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="frigo-main" >

        <v-row class="d-flex_child-flex" align="center" >
          <v-col v-for="product in  listeProducts"
                 :key="product.id"

                 cols="10"
                 sm="5"
                 >

<!--                 style="max-height: 150px;"-->

            <Image v-for="n in product.qty"
              :product="product"></Image>

          </v-col>
        </v-row>
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

.fridge {

  background: transparent;
  width: 300px;

}

.d-flex_child-flex {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%,-45%);
}

</style>
