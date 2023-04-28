<template>
    <h1>Тестовое задание для ЭтКонс</h1>
    <link-field />
    <date-time-picker />
    <multi-select />
    <multiline-text />
    <table-search />
</template>

<script>
import LinkField from "./components/LinkField.vue";
import DateTimePicker from "./components/DateTimePicker.vue";
import MultiSelect from "./components/MultiSelect.vue";
import MultilineText from "./components/MultilineText.vue";
import TableSearch from "./components/TableSearch.vue";

export default {
    name: "App",
    components: { LinkField, DateTimePicker, MultiSelect, MultilineText, TableSearch },
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
