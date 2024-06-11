<template>
    <div class="bgc">
      <VideoLive></VideoLive>
    </div>
  </template>
  
  <script>
//   import VideoLiveVue from "../../components/VideoLive.vue";
  import { useHead } from "@vueuse/head";
  
  export default {
    name: "DirectLive",
    setup() {
       useHead({
        title: "Direct page",
      });
    },

  };
  </script>
  <style>
  .bgc {
    background-color: #121212;
  }
  </style>