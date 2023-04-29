<template>
    <div class="multiline-text-wrap">
        <h3>Table with search</h3>

        <div class="card">
            <DataTable
                ref="dt"
                :value="fetchedData"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                :globalFilterFields="globalFilterFields"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #empty> Ничего не найдено, попробуйте изменить поисковые фильтры.</template>
                <template #header>
                    <div class="flex gap-1 flex-row align-items-center justify-content-between">
                        <div class="search-content">
                            <div class="p-inputgroup flex-1" style="width: 80%; position: relative">
                                <Button icon="pi pi-sliders-v" severity="success" @click="$refs.select.show()" />

                                <MultiSelect
                                    v-model="selectedSearchFilter"
                                    :options="columns"
                                    optionLabel="name"
                                    :showToggleAll="false"
                                    style="width: 20%; position: absolute"
                                    id="hidden-trigger"
                                    ref="select"
                                />

                                <InputText
                                    @input="(event) => (searchValue = event.target.value)"
                                    :value="searchValue"
                                    placeholder="Поиск"
                                    @keyup.enter="onSearchClick"
                                    class="search-input"
                                />

                                <i
                                    class="pi pi-times clear-search-icon"
                                    v-if="searchValue"
                                    @click="searchValue = ''"
                                ></i>

                                <Button label="Search" @click="onSearchClick" />
                            </div>

                            <MultiSelect
                                v-model="selectedColumns"
                                :options="columns"
                                optionLabel="name"
                                placeholder="Поля таблицы"
                                style="width: 20%"
                            />
                        </div>
                    </div>
                </template>

                <Column
                    v-for="(el, index) in !selectedColumns.length ? columns : selectedColumns"
                    :key="index"
                    :field="el.name"
                    :header="el.code"
                >
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Column from "primevue/column";
import Button from "primevue/button";
import Queries from "../services/queries.service";

export default {
    name: "table-search",
    components: {
        DataTable,
        Column,
        Button,
        InputText,
        MultiSelect,
    },

    data() {
        return {
            fetchedData: [],
            columns: [],
            selectedColumns: [],
            selectedSearchFilter: [],
            filters: {},
            searchValue: "",
            showDropdown: false,
        };
    },

    methods: {
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },

        onSearchClick() {
            this.filters.global.value = this.searchValue;
        },

        objectToArray(object) {
            const fields = [];
            for (let el of object) {
                fields.push(el.name);
            }
            return fields;
        },

        generateColumnsProps(array) {
            const keys = Object.keys(array.data[0]);
            for (let key of keys) {
                const column = { name: key, code: key.toLocaleUpperCase() };
                this.columns.push(column);
            }
        },
    },

    computed: {
        globalFilterFields() {
            if (this.selectedSearchFilter.length) {
                let set = new Set([
                    ...this.objectToArray(this.selectedSearchFilter),
                    ...this.objectToArray(this.selectedColumns),
                ]);
                let mergedArray = Array.from(set);
                return mergedArray;
            }

            if (this.selectedColumns.length) {
                return this.objectToArray(this.selectedColumns);
            }
        },
    },

    created() {
        this.initFilters();
    },

    async mounted() {
        const comments = await Queries.getComments();
        this.generateColumnsProps(comments);
        this.fetchedData = comments.data;
    },
};
</script>

<style>
.search-content {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.clear-search-icon {
    position: absolute;
    right: 106px;
    top: 14px;
    opacity: 0.5;
    z-index: 10;
}

.p-multiselect#hidden-trigger {
    visibility: hidden;
}
</style>
