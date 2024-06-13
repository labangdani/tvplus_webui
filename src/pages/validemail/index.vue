<template>
  <form class="text-black mt-2 mx-7">
    <div class="link text-2xl text-center">
      <p>Votre compte a été activé avec succès.</p>
      <p>
        Veuillez-vous
        <nuxt-link to="/login" class="condition"> Connecter</nuxt-link>
      </p>
    </div>
  </form>
</template>
    
<script>
definePageMeta({
  layout: "authlayout",
});

export default {
  name: "validemail",
};
</script>
    
<style>
.link .condition {
  color: #34a662;
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>