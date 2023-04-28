<template>
    <div class="datetime-picker-wrap">
        <h3>DateTime Picker</h3>

        <div class="datetime-picker-content">
            <Calendar v-model="date" showIcon timeOnly />
            <p>
                Значение v-model для времени:
                {{ formatDate(date) }}
            </p>
        </div>
    </div>
</template>

<script>
import Calendar from "primevue/calendar";

export default {
    name: "date-time-picker",
    components: { Calendar },

    data() {
        return {
            date: "",
        };
    },

    methods: {
        formatDate(unformattedDate) {
            if (!unformattedDate) {
                return "не определено";
            }

            const newDate = new Date(unformattedDate);
            const hours = newDate.getHours();
            let minutes = newDate.getMinutes();
            if (minutes <= 9) {
                minutes = "0" + minutes;
            }
            return `${hours}:${minutes}`;
        },
    },
};
</script>

<style></style>
