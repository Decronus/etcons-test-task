<template>
    <h1>Тестовое задание для ЭтКонс</h1>
    <link-field />
    <date-time-picker />
    <multi-select />
</template>

<script>
import LinkField from "./components/LinkField.vue";
import DateTimePicker from "./components/DateTimePicker.vue";
import MultiSelect from "./components/MultiSelect.vue";

export default {
    name: "App",
    components: { LinkField, DateTimePicker, MultiSelect },
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
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

p {
    margin-bottom: 0;
}

.pi {
    cursor: pointer;
}
</style>
