<template>
    <div class="multiline-text-wrap">
        <h3>Multiline Text</h3>

        <!-- <div class="multiple-text-content"> -->
        <!-- <div class="multiple-text-content-group"> -->
        <DataTable :value="users" tableStyle="min-width: 50rem">
            <Column field="id" header="Id"></Column>
            <Column field="actions" header="Actions" style="white-space: pre-line">
                <template #body="{ data }"> {{ arrayToMultilineText(data.actions) }} </template>
            </Column>
            <Column field="user" header="User"></Column>
            <Column field="email" header="Email"></Column>
        </DataTable>

        <!-- </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
    name: "multiline-text",
    components: { DataTable, Column },

    data() {
        return {
            users: [
                {
                    id: 1,
                    actions: [
                        "[13:36:53] Расчетное время: 9 мин",
                        "[13:36:58] Открыть клапан откачки К1",
                        "[13:36:58] Включить вакуумный насос",
                        "[13:36:58] Закрыть клапан К5",
                        "[13:36:58] Закрыть клапан дистилляции К2",
                        "[13:36:58] Ожидание: 8 с",
                        "[13:37:06] Заливка 2.2мл. в испаритель",
                        "[13:37:06] Заданно 26.50602409638554 шагов",
                        "[13:37:09] Заливка перекиси завершена",
                        "[13:37:09] Открыть клапан дистилляции К2",
                        "[13:42:09] Включить нагрев испарителя",
                        "[13:42:09] Закрыть клапан дистилляции К2",
                        "[13:42:09] конечное давление1.0960040758227925 торр",
                        "[13:42:09] Выпаривание через К2",
                        "[13:42:09] Выпаривание длилось 5 мин",
                        "[13:42:09] Откачка до 1 торр",
                        "[13:42:15] Закрыть клапан откачки К1",
                        "[13:43:09] Открыть клапан откачки К1",
                        "[13:43:14] Аппаратное смещение 0 денсит. = -0.313683180809021",
                        "[13:43:14] Закрыть клапан дистилляции К2",
                    ],
                    user: "John",
                    email: "john@example.com",
                },
                {
                    id: 2,
                    actions: [
                        "[13:36:53] Расчетное время: 9 мин",
                        "[13:36:58] Открыть клапан откачки К1",
                        "[13:36:58] Включить вакуумный насос",
                        "[13:36:58] Закрыть клапан К5",
                        "[13:36:58] Закрыть клапан дистилляции К2",
                    ],
                    user: "Jane",
                    email: "jane@example.com",
                },
            ],
        };
    },

    methods: {
        arrayToMultilineText(array) {
            const string = array.join("\n");
            return string;
        },
    },
};
</script>

<style></style>
