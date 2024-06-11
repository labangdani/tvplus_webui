<template>
  <div class="items-center" v-for="article in listarticles" :key="article._id">
    <nuxt-link
      :to="
        '/detailarticle/' +
        article.id +
        '/' +
        replaceSpacesWithDash(article.titre)
      "
    >
      <div class="py-5">
        <div class="w-full rounded overflow-hidden shadow-lg">
          <img
            class="w-full object-contain transition-transform transform-gpu hover:scale-110"
            :src="article.imagesMap.imageportrait.url"
            alt="Mountain"
          />
          <div class="px-6 py-4 bg-white">
            <button
              class="bg-[#07693A] text-white px-2 uppercase font-bold text-lg mb-2"
            >
              {{ article.categorie.name }}
            </button>
            <div
              class="font-bold text-xl my-2 truncate first-letter:uppercase hover:underline hover:decoration-2"
              :title="article.titre"
            >
              {{ article.titre }}
            </div>
            <div class="flex space-x-4">
              <div class="flex items-center space-x-2 mt-1">
                <svg
                  class="h-5 w-5 text-green-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                  <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                </svg>
                <p>{{ article.nb_vue }}</p>
              </div>
              <div class="flex items-center space-x-2 mt-1">
                <svg
                  class="h-5 w-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <p>{{ article.like_users.length }}</p>
              </div>
            </div>

            <div
              class="text-gray-700 three-row-limit mt-2 first-letter:uppercase mr-5 text-base text-justify"
              v-html="article.content"
            ></div>
            <div class="flex items-center mt-4">
              <p class="text-md first-letter:uppercase mt-2 space-x-2">
                <span class="text-gray-900 leading-none first-letter:uppercase"
                  >By {{ article.autheur }} .</span
                >
                <span class="text-gray-600">{{ article.creationDate }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
      
<script>
// import ArticleSkeleton from "../../skeletons/ArticleSkeleton.vue";

export default {
    props: {
    listarticles: {
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
.three-row-limit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of rows to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
    
    
    
    