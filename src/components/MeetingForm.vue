<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ id ? "Updated" : "Create" }} Meeting</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Room Name"
                  :rules="rules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="hostName"
                  :items="items"
                  :search-input.sync="search"
                  :rules="rules"
                  hide-selected
                  label="Host Name"
                  persistent-hint
                  small-chips
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                      @click:close="data.parent.selectItem(data.item)"
                    >
                      <v-avatar
                        class="accent white--text"
                        left
                        v-text="data.item.slice(0, 1).toUpperCase()"
                      ></v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                  <template v-slot:no-data>
                    <v-list-item v-if="search">
                      <v-list-item-content>
                        <v-list-item-title>
                          Press <kbd>enter</kbd> to add
                          <strong> {{ search }}</strong>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  v-model="participants"
                  :items="items"
                  :search-input.sync="search"
                  :rules="rules"
                  hide-selected
                  label="Participants"
                  multiple
                  persistent-hint
                  small-chips
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                      @click:close="data.parent.selectItem(data.item)"
                    >
                      <v-avatar
                        class="accent white--text"
                        left
                        v-text="data.item.slice(0, 1).toUpperCase()"
                      ></v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                  <template v-slot:no-data>
                    <v-list-item v-if="search">
                      <v-list-item-content>
                        <v-list-item-title>
                          Press <kbd>enter</kbd> to add
                          <strong> {{ search }}</strong>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" sm="4">
                <datepicker :inputData.sync="bookingDate" :rules="rules" />
              </v-col>
              <v-col cols="12" sm="4">
                <timepicker
                  :inputData.sync="bookingStartTime"
                  :rules="rules"
                  label="Start Time"
                  min="8:00"
                  max="17:00"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <timepicker
                  :inputData.sync="bookingEndTime"
                  :rules="rules"
                  label="End Time"
                  :min="bookingStartTime"
                  max="17:00"
                />
              </v-col>
              <v-col cols="12" v-show="error">
                <v-snackbar
                  :timeout="-1"
                  :value="true"
                  absolute
                  bottom
                  color="error"
                  left
                  text
                >
                  {{ error }}
                </v-snackbar>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="openFormDialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Datepicker from "./Fields/Datepicker";
import Timepicker from "./Fields/Timepicker.vue";

export default {
  name: "MeetingForm",
  components: { Datepicker, Timepicker },
  props: {
    "is-open": Boolean,
    "open-form-modal": Function,
    selected: Object,
  },
  data() {
    return {
      rules: [
        (value) => {
          const error = "This Field is required.";
          if (value instanceof Array && value.length == 0) {
            return error;
          }
          return !!value || error;
        },
      ],
      error: "",
    };
  },
  computed: {
    id() {
      return this.selected.id;
    },
    name() {
      return this.selected.name;
    },
    hostName() {
      return this.selected.hostName;
    },
    participants() {
      return this.selected.participants;
    },
    bookingDate() {
      return this.selected.bookingDate;
    },
    bookingStartTime() {
      return this.selected.bookingStartTime;
    },
    bookingEndTime() {
      return this.selected.bookingEndTime;
    },
  },
  //   updated() {
  //     if (Object.keys(this.selected).length) {
  //       Object.keys(this.selected).forEach((key) => {
  //         this[key] = this.selected[key];
  //       });
  //     }
  //   },
  methods: {
    openFormDialog() {
      this.resetForm();
      this.$emit("openFormDialog");
    },
    resetForm() {
      this.name = "";
      this.hostName = "";
      this.participants = [];
      this.bookingDate = "";
      this.bookingStartTime = "";
      this.bookingEndTime = "";
      this.error = "";
    },
    submitForm() {
      const {
        id,
        name,
        hostName,
        participants,
        bookingDate,
        bookingStartTime,
        bookingEndTime,
      } = this;
      const hasSched = this.$store.state.dataList.filter(
        (data) =>
          data.id !== id &&
          data.name === name &&
          data.bookingDate === bookingDate &&
          data.bookingStartTime === bookingStartTime
      );
      if (hasSched.length) {
        this.error = "Unable to save, chosen date and time is not available.";
      } else {
        this.$store.dispatch("saveMeeting", {
          id,
          name,
          hostName,
          participants,
          bookingDate,
          bookingStartTime,
          bookingEndTime,
        });

        this.resetForm();
        this.$emit("openFormDialog");
        this.$emit(
          "showSnackbar",
          `Meeting was successfully ${id ? "updated" : "created"}.`
        );
      }
    },
  },
  watch: {
    bookingStartTime(val) {
      const time = val.split(":");
      const date = new Date(`${this.bookingDate} ${val}`);
      date.setMinutes(date.getMinutes() + 30);
      this.bookingEndTime = `${date.getHours()}:${date.getMinutes()}`;
      return time.join(":");
    },
  },
};
</script>
