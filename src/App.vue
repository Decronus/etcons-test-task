<template>
    <h1>Тестовое задание для ЭтКонс</h1>
    <link-field />
    <date-time-picker />
</template>

<script>
import LinkField from "./components/LinkField.vue";
import DateTimePicker from "./components/DateTimePicker.vue";

export default {
    name: "App",
    components: { LinkField, DateTimePicker },
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
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.pi {
    cursor: pointer;
}
</style>
