<template>
  <div class="w-full h-full md:pb-16">
    <Banner></Banner>
    <div>
      <SectionContainer />
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import SectionContainer from "../components/SectionContainer.vue";
import useDevice from "../hooks/useDevice";
import { useHead } from "@vueuse/head";

export default {
  components: {
    SectionContainer,
    Banner,
  },

  setup() {
    useHead({
      title: " 2PLAY: TV, Replay & Streaming",
    });
    if (process.client) {
      const { isDesktop } = useDevice();
      return { isDesktop };
    }
  },

  mounted() {},
};
</script>

<style>
</style>