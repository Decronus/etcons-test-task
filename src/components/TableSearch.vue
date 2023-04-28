<template>
    <div class="multiline-text-wrap">
        <h3>Table with search</h3>

        <div class="card">
            <DataTable
                ref="dt"
                :value="fetchedData"
                v-model:selection="selectedProducts"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #header>
                    <div class="flex gap-1 flex-row align-items-center justify-content-between">
                        <div class="search-content">
                            <div class="p-inputgroup flex-1" style="width: 80%">
                                <Button icon="pi pi-sliders-v" severity="success" />
                                <InputText v-model="filters['global'].value" placeholder="Поиск" />
                                <Button label="Search" />
                            </div>
                            <MultiSelect
                                v-model="selectedColumns"
                                :options="columns"
                                optionLabel="name"
                                placeholder="Поля таблицы"
                                :maxSelectedLabels="3"
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
                    sortable
                >
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Rating from "primevue/rating";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import MultiSelect from "primevue/multiselect";
import Dialog from "primevue/dialog";
import Tag from "primevue/tag";
import Column from "primevue/column";
import Button from "primevue/button";
import { FilterMatchMode } from "primevue/api";
import Queries from "../services/queries.service";

export default {
    name: "table-search",
    components: {
        DataTable,
        Column,
        Button,
        Toolbar,
        InputText,
        Textarea,
        Tag,
        FileUpload,
        Rating,
        Dropdown,
        InputNumber,
        RadioButton,
        Dialog,
        MultiSelect,
    },

    data() {
        return {
            fetchedData: [],
            columns: [],
            selectedColumns: [],
            filters: {},
        };
    },

    methods: {
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },
    },

    watch: {
        filters() {
            console.log(this.filters);
        },
    },

    created() {
        this.initFilters();
    },

    async mounted() {
        const comments = await Queries.getComments();
        const keys = Object.keys(comments.data[0]);
        for (let key of keys) {
            const column = { name: key, code: key.toLocaleUpperCase() };
            this.columns.push(column);
        }
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
</style>
