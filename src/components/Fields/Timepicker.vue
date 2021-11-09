<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="inputData"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="inputData"
        :label="label"
        readonly
        v-bind="attrs"
        v-on="on"
        :rules="rules"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="inputData"
      :min="min"
      :max="max"
      :allowed-minutes="allowedMinutes"
      full-width
      @click:minute="$refs.menu.save(inputData)"
      @input="$emit('update:inputData', inputData)"
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  name: "Timepicker",
  props: {
    label: String,
    min: String,
    max: String,
    inputData: String,
    rules: Array,
  },
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    allowedMinutes: (v) => v % 30 === 0,
  },
};
</script>
