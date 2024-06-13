<template>
  <div class="bl">
    <div class="wrapper1">
      <section class="my-10">
        <div class="imgclass">
          <img
            class="w-32 h-20 object-contain"
            src="../assets/images/whitelogo.png"
            alt=""
          />
        </div>
        <slot />
      </section>
    </div>
  </div>
</template>
<style scoped>
.bl {
  @apply flex items-center justify-center w-full bg-cover min-h-screen;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../assets/images/bg.jpeg") right top no-repeat;
  background-size: cover;
}
.wrapper1 {
  @apply flex bg-[#121212] rounded-2xl my-10 ;
}

.imgclass {
  @apply flex justify-center;
}

</style>
