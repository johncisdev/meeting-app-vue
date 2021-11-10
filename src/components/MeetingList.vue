<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="6"> <div class="text-h6 mb-3">Meetings</div></v-col>

          <v-col cols="6" class="text-right">
            <v-btn
              color="primary"
              elevation="2"
              raised
              small
              @click="openFormDialog"
              >Create Meeting</v-btn
            ></v-col
          >
        </v-row>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.hostName="{ item }">
            <v-avatar
              class="accent white--text mr-1"
              size="25"
              v-text="item.hostName.slice(0, 1).toUpperCase()"
            >
            </v-avatar>
            {{ item.hostName }}
          </template>
          <template v-slot:item.participants="{ item }">
            <v-avatar
              class="accent white--text"
              size="25"
              v-for="participant in item.participants"
              :key="participant"
              v-text="participant.charAt(0).toUpperCase()"
            ></v-avatar>
            {{ participant }}
          </template>
          <template v-slot:item.time="{ item }">
            {{ item.bookingStartTime }} - {{ item.bookingEndTime }}
          </template>
          <template v-slot:item.action="{ item }">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark color="primary" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title
                    @click="
                      $router.push({
                        path: `/meeting/${item.id}`,
                      })
                    "
                    >View Meeting</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title @click="editMeeting(item)"
                    >Edit</v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title @click="deleteMeeting(item)"
                    >Delete</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
        <v-snackbar v-model="snackbar">
          {{ message }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
    <meeting-form
      v-show="isOpenFormDialog"
      :is-open="isOpenFormDialog"
      :selected="selected"
      @openFormDialog="openFormDialog"
      @showSnackbar="showSnackbar"
    />
  </v-container>
</template>

<script>
import MeetingForm from "./MeetingForm";

export default {
  name: "MeetingList",
  components: {
    MeetingForm,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Room Name",
          value: "name",
        },
        { text: "Host", value: "hostName" },
        { text: "Participants", value: "participants" },
        { text: "Date", value: "bookingDate" },
        { text: "Time", value: "time" },
        { text: "", value: "action" },
      ],
      isOpenFormDialog: false,
      selected: {},
      message: "",
      snackbar: false,
    };
  },
  computed: {
    data() {
      return this.$store.state.dataList;
    },
  },
  async created() {
    await this.$store.dispatch("getMeetings");
  },
  methods: {
    openFormDialog() {
      this.isOpenFormDialog = !this.isOpenFormDialog;
    },
    showSnackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
    editMeeting(meeting) {
      this.selected = meeting;
      this.isOpenFormDialog = true;
    },
    deleteMeeting(meeting) {
      this.$store.dispatch("deleteMeeting", meeting.id);
      this.showSnackbar("Meeting was successfully deleted.");
    },
  },
};
</script>
