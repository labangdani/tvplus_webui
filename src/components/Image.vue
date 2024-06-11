<template>
    <img :src="source"  class="object-contain rounded-xl "/>
  </template>
  
  <script>
  
  export default {
    props: {
      src: {
        type: String,
      },
    },
  
    setup(props) {
      const { src } = props;
  
      return {
        source: `${src}`,
      };
    },
  };
  </script>
  
  <style>
 
  </style>