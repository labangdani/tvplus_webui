<template>
  <h1 class="titletext">Nouveau mot de passe</h1>

  <!-- <div
    class="text-sm text-red-600 text-center"
    v-if="status != '' && status != 'loading'"
  >
    <strong>{{ status }}</strong>
  </div> -->

  <div class="text-center text-red-600 mb-2" v-if="message != ''">
    <strong>{{ message }}</strong>
  </div>

  <div>
    <p class="text-sm text-yellow-500 mb-4 px-5">
      Veuillez entrer un mot de passe d’au moins 6 caractères.
    </p>
  </div>

  <form v-on:submit.prevent="ChangePassword()" class="text-black mx-7">
    <div class="flex flex-col mb-5 outline-none">
      <input
        v-model="newPassword"
        type="password"
        class="p-1.5 rounded-lg pl-5"
        placeholder="Mot de passe"
      />
    </div>

    <div class="flex flex-col mb-5 outline-none">
      <input
        v-model="password_verified"
        type="password"
        class="p-1 rounded-lg pl-5"
        placeholder="Confirmer votre mot de passe"
      />
    </div>

    <div class="flex mt-4 flex-col text-white my-3 outline-none">
      <ButtonSpinner type="submit" :fetching="fetch">enregistrer</ButtonSpinner>
    </div>
  </form>
</template>
    
  <script>
import { Api } from "../../helpers";
import Erreur from "../../services/error";

definePageMeta({
  layout: "authlayout",
});

export default {
  name: "newpassword",

  data() {
    return {
      message: "",
      message_error: "",
      newPassword: "",
      password_verified: "",
      fetch: false,
      userid: "",
      status: "",
    };
  },

  mounted() {
    this.usertoken = this.$route.query.id;
    // if(this.usertoken == '' || this.usertoken == null){
    //   this.$router.push('/login');
    // }
  },

  methods: {
    //Mettre à jour le mot de passe d'un utilisateur
    ChangePassword() {
      this.fetch = true;
      if (this.password === "" || this.password_verified === "") {
        this.message_error = "Veuillez remplir tous les champs";
      } else if (this.password_verified !== this.newPassword) {
        this.message_error = "Les mots de passe sont différents";
      } else {
        Api.putwithouttoken(
          "/authentication/api/auth/new-password/" + this.usertoken,
          { newPassword: this.newPassword }
        )
          .then((response) => {
            // mettre à jour le nombre de vues dans l'interface utilisateur
            this.successpwd = true;
            this.$router.push("/login");
          })
          .catch(function (error) {
            Erreur.gestionErreur(error.message);
          })
          .then(() => (this.fetch = false));
      }
    },
  },
};
</script>
    
<style>
.titletext {
  @apply text-white text-2xl font-bold pt-2.5 mb-2.5 text-center;
}

.propsition {
  @apply flex justify-between items-center px-10 text-white;
}

.propsition div {
  @apply text-center w-full h-10 mb-5;
}

.propsition button {
  @apply w-full bg-transparent text-white mb-5;
  transition: all 0.3s ease;
}

.input {
  @apply outline-none;
}

.form form .button input {
  margin-right: 13px;
  background-color: #07693a;
  border: none;
  width: 100%;
  height: 40px;
  color: #c0bdbd;
  font-weight: 650;
  border-radius: 17px;
  cursor: pointer;
}

</style>