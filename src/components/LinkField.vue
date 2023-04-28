<template>
    <div class="link-field-wrap">
        <h3>Link Field</h3>

        <div class="link-field-inputs-wrap">
            <div class="p-inputgroup" v-if="isUrlInputVisible">
                <span class="p-inputgroup-addon">https://</span>
                <InputText
                    placeholder="www.example.com"
                    :class="{ 'p-invalid': !isValidUrl(url) && !initialRender }"
                    v-model="url"
                    @keyup.enter="urlValidation"
                    @blur="urlValidation"
                />
            </div>

            <div class="p-inputgroup" v-if="isUrlTitleInputVisible">
                <InputText
                    placeholder="Введите название страницы"
                    v-model="urlTitle"
                    @keyup.enter="urlTitleValidation"
                    @blur="urlTitleValidation"
                    autofocus
                />
            </div>

            <div class="link-field-link-wrap" v-if="isLinkVisible">
                <a :href="`https://${url}`" target="_blank">{{ urlTitle }}</a>
                <i class="pi pi-pencil" @click="editLink"></i>
            </div>
        </div>
    </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
    name: "link-field",
    components: {
        InputText,
        Button,
    },

    data() {
        return {
            url: "",
            isUrlInputVisible: true,
            urlTitle: "",
            isUrlTitleInputVisible: false,
            initialRender: true,
            isLinkVisible: false,
        };
    },

    methods: {
        isValidUrl(url) {
            const pattern = /^([a-zа-я0-9]+(-[a-zа-я0-9]+)*\.)+[a-zа-я]{2,}$/i;
            return pattern.test(url);
        },

        urlValidation() {
            this.initialRender = false;
            if (this.isValidUrl(this.url)) {
                this.isUrlInputVisible = false;
                this.isUrlTitleInputVisible = true;
            }
        },

        urlTitleValidation() {
            if (this.urlTitle) {
                this.isUrlTitleInputVisible = false;
                this.isLinkVisible = true;
            }
        },

        editLink() {
            this.isUrlInputVisible = true;
            this.isUrlTitleInputVisible = false;
            this.isLinkVisible = false;
        },
    },
};
</script>

<style>
.link-field-inputs-wrap {
    width: 500px;
}

.link-field-link-wrap {
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>
