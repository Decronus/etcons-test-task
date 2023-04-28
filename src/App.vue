<template>
    <link-field />
</template>

<script>
import LinkField from "./components/LinkField.vue";

export default {
    name: "App",
    components: { LinkField },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 60px;
}

.pi {
    cursor: pointer;
}
</style>
