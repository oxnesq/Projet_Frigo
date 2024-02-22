<script setup>
import {reactive, onMounted} from "vue";
import Product from "@/Product";
import FormView from "@/components/FormView.vue";
import ListProducts from "@/components/ListProducts.vue";

const listeProducts = reactive([]);

// -- l'url de l'API
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/24/produits";

// -- modif a product in the list
function changeProduct(product, calcul) {
  console.log(product);

  if (calcul === "-") {
    product.setQty(-1);

  } else {
    product.setQty(+1);
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
    body: JSON.stringify(product),
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

// -- req AJAX pour récupérer les produits
//    et les stocker dans le state listeC
function getProducts() {
  const fetchOptions = {method: "GET"};
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des choses
      listeProducts.splice(0, listeProducts.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Chose
      //  et l'ajouter dans la liste listeC
      dataJSON.forEach((v) => listeProducts.push(new Product(v.id, v.nom, v.qte, v.photo)));
      console.log(listeProducts)
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
  numInList+=1;
}


</script>

<template>

  <FormView class="formView" @addProduct="addProduct"></FormView>

  <v-sheet class="listProd">
    <ListProducts  v-for="product in listeProducts"
                  :product="product"

                  @deleteProduct="deleteProduct"
                  @changeProduct="changeProduct"></ListProducts>
  </v-sheet>

<!--
  <v-row>
    <v-col v-for="n in 2"
           :key="n"
           class="d-flex child-flex"
           cols="3">
      <Image :product></Image>
      {{setNumInList }}
    </v-col>
  </v-row>
  -->

</template>

<style scoped>

.listProd{
  position: fixed;
  left: 1000px;
  top: 100px;
}

</style>
