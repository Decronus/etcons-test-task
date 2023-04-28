<template>
    <div class="multiline-text-wrap">
        <h3>Table with search</h3>

        <div class="card">
            <DataTable
                ref="dt"
                :value="products"
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

                <!-- <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column> -->
                <!-- <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
                <Column field="name" header="Name" sortable style="min-width: 16rem"></Column> -->
                <Column
                    v-for="(el, index) in !selectedColumns.length ? columns : selectedColumns"
                    :key="index"
                    :field="el.name"
                    :header="el.code"
                    sortable
                    style="min-width: 8rem"
                >
                </Column>
                <!-- <Column field="category" header="Category" sortable style="min-width: 10rem"></Column> -->
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
            columns: [],
            selectedColumns: [],
            filters: {},
            submitted: false,
            statuses: [
                { label: "INSTOCK", value: "instock" },
                { label: "LOWSTOCK", value: "lowstock" },
                { label: "OUTOFSTOCK", value: "outofstock" },
            ],
        };
    },

    methods: {
        formatCurrency(value) {
            if (value)
                return value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                });
            return;
        },
        openNew() {
            this.product = {};
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        saveProduct() {
            this.submitted = true;

            if (this.product.name.trim()) {
                if (this.product.id) {
                    this.product.inventoryStatus = this.product.inventoryStatus.value
                        ? this.product.inventoryStatus.value
                        : this.product.inventoryStatus;
                    this.products[this.findIndexById(this.product.id)] = this.product;
                    this.$toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Product Updated",
                        life: 3000,
                    });
                } else {
                    this.product.id = this.createId();
                    this.product.code = this.createId();
                    this.product.image = "product-placeholder.svg";
                    this.product.inventoryStatus = this.product.inventoryStatus
                        ? this.product.inventoryStatus.value
                        : "INSTOCK";
                    this.products.push(this.product);
                    this.$toast.add({
                        severity: "success",
                        summary: "Successful",
                        detail: "Product Created",
                        life: 3000,
                    });
                }

                this.productDialog = false;
                this.product = {};
            }
        },
        editProduct(product) {
            this.product = { ...product };
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.products = this.products.filter((val) => val.id !== this.product.id);
            this.deleteProductDialog = false;
            this.product = {};
            this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Product Deleted",
                life: 3000,
            });
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        createId() {
            let id = "";
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
            this.deleteProductsDialog = false;
            this.selectedProducts = null;
            this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Products Deleted",
                life: 3000,
            });
        },
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },
        getStatusLabel(status) {
            switch (status) {
                case "INSTOCK":
                    return "success";

                case "LOWSTOCK":
                    return "warning";

                case "OUTOFSTOCK":
                    return "danger";

                default:
                    return null;
            }
        },
    },

    watch: {
        selectedColumns() {
            console.log(this.selectedColumns);
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
