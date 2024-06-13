<template>
    <AppHeader />
    <div
      class="min-h-screen"
      :style="[isModalActive && `margin-top: -${scrollTop}px`]"
    >
      <router-view v-slot="{ Component, route }">
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
          mode="out-in"
        >
          <component
            :is="Component"
            :class="[isModalActive && 'fixed']"
            :key="route.fullPath"
          />
        </transition>
      </router-view>
    </div>
    <!-- <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <DetailsModal v-if="isModalActive" />
    </transition> -->
  
    <AppFooter />
  </template>
  
  
  <script>
  import { toRefs, watch } from "vue";
  import { useQueryProvider } from "vue-query";
  import "animate.css";
  import { state } from "../store/index.js";
  import Swal from "sweetalert2";
  import { Buffer } from "buffer";
  
  export default {
    // components: {
    //   AppHeader,
    //   AppFooter,
    // },
  
    mounted() {
      if (process.client && localStorage.getItem("jwtToken")) {
        const jwtPayload = this.parseJwt(localStorage.getItem("jwtToken"));
        if (jwtPayload.exp < Date.now() / 1000) {
          // token expired
          Swal.fire({
            text: "Votre session a expiré",
            confirmButtonText: "Ok",
            confirmButtonColor: "#07693A",
          }).then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("jwtToken");
            this.$router.push("/login");
          });
        }
      }
    },
  
    methods: {
      parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          Buffer.from(base64, "base64")
            .toString("ascii")
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
  
        return JSON.parse(jsonPayload);
      },
    },
  
    setup() {
      if (process.client) {
        useQueryProvider({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              refetchOnMount: false,
            },
          },
        });
  
        watch(
          () => state.isModalActive,
          () => {
            setTimeout(function () {
              window.scrollTo({
                left: 0,
                top: state.scrollTop,
              });
            }, 0);
          }
        );
  
        return {
          ...toRefs(state),
        };
      }
    },
  };
  </script>
  