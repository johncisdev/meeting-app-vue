<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :rules="rules"
        v-model="inputData"
        label="Meeting Date"
        persistent-hint
        v-bind="attrs"
        @blur="date = parseDate(inputData)"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="inputData"
      no-title
      @change="menu = false"
      @input="$emit('update:inputData', formatDate(inputData))"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: "Datepicker",
  props: ["inputData", "rules"],
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
    };
  },
  // created() {
  //   this.inputData = this.formatDate(this.inputData);
  // },
  computed: {
    computedInputDate() {
      return this.formatDate(this.inputData);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>
