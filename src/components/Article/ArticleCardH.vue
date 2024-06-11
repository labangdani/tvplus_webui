<template>
  <div v-for="article in listarticles" :key="article._id">
    <nuxt-link
      :to="
        '/detailarticle/' +
        article.id +
        '/' +
        replaceSpacesWithDash(article.titre)
      "
    >
      <div class="p-5">
        <div class="w-full grid grid-cols-3 flex shadow-xl block">
          <div
            class="md:col-span-1 h-[234px] flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          >
            <img
              :src="article.imagesMap.imageportrait.url"
              class="w-full h-full transition-transform transform-gpu hover:scale-110 object-cover"
            />
          </div>
          <div
            class="md:col-span-2 border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
          >
            <div class="mb-2">
              <button
                class="bg-[#07693A] text-white px-2 uppercase font-bold text-xs py-1"
              >
                {{ article.categorie.name }}
              </button>
              <div
                class="truncate text-gray-900 first-letter:uppercase font-bold text-xl mb-2 hover:underline hover:decoration-2"
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
              <p
                class="three-row-limit text-gray-700 first-letter:uppercase mr-5 text-base text-justify"
                v-html="article.content"
              ></p>
            </div>
            <div class="flex items-center">
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

    <!-- <hr /> -->
  </div>
</template>
    
<script>
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
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}

.custom-close-button-class {
  /* Style CSS pour réduire la taille du bouton de fermeture */
  width: 20px;
  height: 20px;
  font-size: 20px; /* Taille de police personnalisée */
  border: none;
  margin: 2px;
}

.scrollable-container {
  position: relative;
  overflow: hidden;
}

.scrollable-content {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.scroll-btn-left,
.scroll-btn-right {
  @apply bg-gray-400 w-7 h-7 text-white text-sm hover:bg-[#07693A] focus:bg-[#07693A];
}

.block-chaine::-webkit-scrollbar {
  width: 0;
}

.three-row-limit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Number of rows to display */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
  
  
  
  