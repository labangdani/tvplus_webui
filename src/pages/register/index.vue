<template>
  

        <div class="titletext">S'inscrire</div>
        <div class="text1 text-red-500" v-if="message_error != ''">
          <strong>{{ message_error }} </strong>
        </div>
        <!-- <div
          class="text1 text-red-500"
          v-if="status != '' && status != 'loading'"
        >
          <strong>{{ status }}</strong>
        </div> -->

        <div class="propsition text-white space-x-7">
          <div :class="{ layour: connect === 'Email' || connect === '' }">
            <button @click="setSignupType('Email')">
              <strong>Email</strong>
            </button>
          </div>
          <div :class="{ layour: connect === 'Phone' }">
            <button id="recaptcha-button" @click="setSignupType('Phone')">
              <strong>Téléphone</strong>
            </button>
          </div>
        </div>

        <div class="mx-7 text-black">
          <div class="namedetails">
            <div class="flex flex-col mb-2.5 outline-none">
              <input
                v-model="last_name"
                type="text"
                class="p-1 rounded-lg pl-5"
                @input="capitalizeFirstLetter"
                placeholder="Prénom"
              />
            </div>
            <div class="flex flex-col mb-2.5 outline-none">
              <input
                v-model="first_name"
                type="text"
                class="p-1 rounded-lg pl-5"
                @input="capitalizeFirstLetter"
                placeholder="Nom"
              />
            </div>
          </div>
          <div class="flex flex-col mb-2.5 outline-none">
            <input
              v-model="username"
              type="text"
              class="p-1 rounded-lg pl-5"
              @input="capitalizeFirstLetter"
              placeholder="Nom d'utilisateur"
            />
          </div>
          <!-- <div mode="out-in" name="fade"> -->
            <div
              class="flex flex-col mb-2.5 outline-none"
            >
              <input
              v-if="connect === 'Email' || connect === ''"
                v-model="email"
                type="email"
                class="p-1 rounded-lg pl-5"
                @input="capitalizeFirstLetter"
                placeholder="Email"
              />
              <vue-tel-input
              v-if="connect === 'Phone'"
                v-model="tel"
                type="text"
                mode="international"
                :default-country="'CM'"
                :input-options="{ placeholder: 'Numero de tel' }"
                class="p-1 rounded-lg"
              ></vue-tel-input>
            </div>
          <!-- </div> -->
          <div class="name-details">
            <div class="flex flex-col mb-2.5 outline-none">
              <input
                v-model="password"
                minlength="6"
                type="password"
                class="p-1 rounded-lg pl-5"
                placeholder="Mot de passe"
              />
            </div>
            <div class="flex flex-col mb-2.5 outline-none">
              <input
                v-model="password_verified"
                minlength="6"
                type="password"
                class="p-1 rounded-lg pl-5"
                placeholder="Confirmer"
              />
            </div>
          </div>
          <div class="flex my-5 space-x-2">
            <input type="checkbox" class="checkbox" v-model="isChecked" />
            <label class="link w-52 lg:w-96 text-sm text-white"
              >J'ai lu et j'accepte
              <nuxt-link to="/politique" class="condition cursor-not-allowed"
                >la politique de protection des données</nuxt-link
              >
              et
              <nuxt-link to="/condition" class="condition cursor-not-allowed"
                >Les conditions générales d'utilisation</nuxt-link
              >
              de 2PLAY</label
            >
          </div>
          <div class="flex flex-col my-2.5 outline-none text-white">
            <ButtonSpinner @click="createAcount()" :fetching="fetch"
              >S'inscrire</ButtonSpinner
            >

            <!-- <button class="p-1 rounded-lg text-white cursor-pointer text-center font-bold bg-[#07693A]" v-on:click="createAcount()" >S'inscrire</button> -->
          </div>
        </div>
        <!-- <p class=" flex text-black justify-center" v-if="createaccount">User created successfully!</p> -->
        <div class="link text-sm text-center">
          Vous avez déjà un compte ?
          <nuxt-link to="/login" class="condition ">Se Connecter</nuxt-link>
        </div>
      
</template>

<script>
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import Swal from "sweetalert2";
import { Api } from "../../helpers";
import Erreur from "../../services/error";

definePageMeta({
  layout: "authlayout",
});

export default {
  name: "register",

  data() {
    return {
      isChecked: false,
      user: {},
      message_error: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password_verified: "",
      tel: "",
      connect: "Email",
      createaccount: false,
      errorCode: "",
      errorMessage: "",
      status: "",
      fetch: false,
    };
  },

  mounted() {
    // this.$store.commit("logout");
    this.status = "";
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-button",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  },

  methods: {
    capitalizeFirstLetter() {
      this.last_name =
        this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1);
      this.first_name =
        this.first_name.charAt(0).toUpperCase() + this.first_name.slice(1);
    },

    //Méthode qui permet de choisir le type connexion
    setSignupType(type) {
      this.connect = type;
      // this.$store.commit("setStatus", "");
      this.message = "";
    },

    //Méthode qu permet de vérifier que les champs sont vides
    isEmptyField(...values) {
      return values.some((value) => value === "");
    },

    //Méthode qui permet de créer un utilisateur avec son Email
    async createAccountWithEmail() {
      if (
        this.isEmptyField(
          this.first_name,
          this.last_name,
          this.username,
          this.email,
          this.password,
          this.password_verified
        )
      ) {
        this.message_error = "Veuillez remplir tous les champs";
      } else if (this.password_verified !== this.password) {
        this.message_error = "Les mots de passe sont différents";
      } else if (this.password.length < 6) {
        this.message_error =
          "Votre mot de passe doit avoir au moins 6 caractères";
      } else if (!this.isChecked) {
        this.message_error =
          "Veuillez cocher la case avant de soumettre le formulaire.";
      } else {
        try {
          this.message_error = "";
          this.fetch = true;

          const response = await Api.postwithouttoken(
            "/authentication/api/auth/signup-email",
            {
              email: this.email,
              name: this.first_name,
              password: this.password,
              surname: this.last_name,
              username: this.username,
            }
          );

          Swal.fire({
            text: "Un lien de confirmation de la création de votre compte vous a été envoyé par mail.",
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          }).then((result) => {
            this.first_name = null;
            this.last_name = null;
            this.username = null;
            this.email = null;
            this.password = null;
            this.password_verified = null;
            location.reload();
          });
        } catch (error) {
          let errorMessage = "Une erreur s'est produite";
          if (error.response) {
            console.error("Réponse du serveur :", error.response.data.message);
            errorMessage = error.response.data.message;
          } else if (error.message) {
            console.error("Erreur de la requête :", error.message);
            errorMessage = error.message;
          }
          Swal.fire({
            text: errorMessage,
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          });
        } finally {
          this.fetch = false;
        }
      }
    },

    //Méthode qui permet de créer un utilisateur avec son numéro de téléphone
    async createAccountWithPhone() {
      if (
        this.isEmptyField(
          this.first_name,
          this.last_name,
          this.username,
          this.tel,
          this.password,
          this.password_verified
        )
      ) {
        this.message_error = "Veuillez remplir tous les champs";
      } else if (this.password_verified !== this.password) {
        this.message_error = "Les mots de passe sont différents";
      } else if (!this.isChecked) {
        this.message_error =
          "Veuillez cocher la case avant de soumettre le formulaire.";
      } else if (this.password.length < 6) {
        this.message_error =
          "Votre mot de passe doit avoir au moins 6 caractères";
      } else {
        try {
          this.message_error = "";
          this.fetch = true;

          const phone_split = this.tel.match(/(\+\d+) (.+)/);
          const country_code = phone_split[1];
          const phone_number = phone_split[2].replace(/\s+/g, "");

          const response = await Api.postwithouttoken(
            "/authentication/api/auth/signup-phone",
            {
              codepays: country_code,
              name: this.first_name,
              surname: this.last_name,
              username: this.username,
              telephone: phone_number,
              password: this.password,
            }
          );

          const appVerifier = window.recaptchaVerifier;
          const auth = getAuth();

          signInWithPhoneNumber(auth, country_code + phone_number, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              localStorage.removeItem("forgetpwd");
              this.$router.push("/formotp");
            })
            .catch((error) => {
              // Gérer l'erreur ici
              if (error.response) {
                console.error(
                  "Réponse du serveur :",
                  error.response.data.message
                );
                Swal.fire({
                  text: error.response.data.message,
                  confirmButtonText: "Ok",
                  confirmButtonColor: "#07693A",
                });
              } else {
                console.error("Erreur de la requête :", error.message);
                Erreur.gestionErreur(error.message);
              }
            });
        } catch (error) {
          if (error.response) {
            console.error("Réponse du serveur :", error.response.data.message);
            Swal.fire({
              text: error.response.data.message,
              confirmButtonText: "Ok",
              confirmButtonColor: "#07693A",
            });
          } else {
            console.error("Erreur de la requête :", error.message);
            Erreur.gestionErreur(error.message);
          }
        } finally {
          this.fetch = false;
        }
      }
    },

    //Méthode qui permet de créer un utilisateur
    createAcount() {
      if (this.connect == "Email") {
        this.createAccountWithEmail();
      } else {
        this.createAccountWithPhone();
      }
    },
  },
};
</script>

<style scoped>
.text1 {
  @apply text-white pt-1.5 mb-2.5 text-center;
}

.checkbox {
  @apply h-4 w-4 bg-black;
}
</style>
