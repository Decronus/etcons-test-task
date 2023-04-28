<template>
    <div class="multiselect-wrap">
        <h3>DateTime Picker</h3>

        <div class="multiselect-content">
            <div class="multiselect-content-group">
                <MultiSelect
                    v-model="selectedCities"
                    display="chip"
                    :options="cities"
                    optionLabel="name"
                    placeholder="Select Cities"
                    class="w-full md:w-20rem"
                />
                <i class="pi pi-times" @click="clearSelect" v-if="selectedCities.length"></i>
            </div>
        </div>
    </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";

export default {
    name: "multi-select",
    components: { MultiSelect },

    data() {
        return {
            cities: [
                { name: "New York", code: "NY" },
                { name: "Rome", code: "RM" },
                { name: "London", code: "LDN" },
                { name: "Istanbul", code: "IST" },
                { name: "Paris", code: "PRS" },
            ],
            selectedCities: [],
        };
    },

    methods: {
        clearSelect() {
            this.selectedCities = [];
        },
    },

    watch: {
        selectedCities() {
            console.log(this.selectedCities);
        },
    },
};
</script>

<style>
.multiselect-content-group {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
