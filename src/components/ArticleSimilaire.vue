<template>
  <div
    class="lg:px-3 hover:-translate-all hover:scale-105 duration-150 hover:text- focus:text-[#07693A]"
    v-for="article in articlesimilaires"
    :key="article.id"
  >
    <nuxt-link
      :to="
        '/detailarticle/' +
        article.id +
        '/' +
        replaceSpacesWithDash(article.titre)
      "
    >
      <img
        :src="article.imagesMap.imagepaysage.url"
        class="rounded-lg object-cover w-full h-[170px]"
      />
      <div class="mt-1">
        <button
          class="bg-[#07693A] mt-2 text-white px-2 uppercase font-bold text-xs py-1"
        >
          {{ article.categorie.name }}
        </button>
        &nbsp; &nbsp;
        <span class="text-sm text-gray-500 font-bold">
          {{ article.creationDate }}
        </span>
      </div>
      <div
        class="two-row-limit mb-5 text-lg font-bold"
        v-html="article.content"
      ></div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    articlesimilaires: {
      type: Array,
    },
  },

  data() {
    return {
      article: {
        like_users: {
          LikeUser: {
            id: "",
            username: "",
          },
        },
        categorie: {
          name: "",
        },
        creationDate: "",
        autheur: "",
        content: "",
        imagesMap: {
          imagepaysage: {
            url: "",
          },
          imageportrait: {
            url: "",
          },
        },
        titre: "",
        nb_vue: "",
        description: "",
      },
    };
  },

  methods: {
    replaceSpacesWithDash(phrase) {
      // Utilise la méthode replace avec une expression régulière pour remplacer les espaces par "-"
      var phraseAvecTirets = phrase.replace(/[\s,':;"]+/g, "-");
      return phraseAvecTirets;
    },
  },
};
</script>
 <style>
 
 </style>