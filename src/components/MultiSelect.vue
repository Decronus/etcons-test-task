<template>
    <div class="multiselect-wrap">
        <h3>Multiselect</h3>

        <div class="multiselect-content">
            <div class="multiselect-content-group">
                <MultiSelect
                    v-model="selectedCities"
                    display="chip"
                    :options="cities"
                    optionLabel="name"
                    placeholder="Select Cities"
                    style="width: 100%"
                />
                <i class="pi pi-times close-icon" @click="clearSelect" v-if="selectedCities.length"></i>
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
};
</script>

<style>
.multiselect-content-group {
    width: 600px;
    position: relative;
}

.close-icon {
    position: absolute;
    top: 14px;
    right: 50px;
    opacity: 0.5;
}
</style>
