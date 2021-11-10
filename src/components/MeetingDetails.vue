<template>
  <v-container class="grey darken-4" fluid style="height: calc(100vh - 50px)">
    <v-row>
      <v-col
        cols="12"
        sm="8"
        class="d-flex justify-center align-center"
        style="height: calc(100vh - 100px)"
      >
        <v-avatar
          class="white--text"
          color="primary"
          size="128"
          v-text="hostName"
          style="font-size: 3rem"
        ></v-avatar
      ></v-col>
      <v-col cols="12" sm="4" class="d-flex justify-center align-center"
        ><v-card elevation="2">
          <v-card-text>
            <div class="text-h6 mb-6">Meeting Details</div>
            <v-row justify="center">
              <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel key="0">
                  <v-expansion-panel-header hide-actions ripple
                    >Info</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" sm="5">
                        <v-card-subtitle class="pa-0 text--secondary">
                          Room Name
                        </v-card-subtitle>
                        <v-card-text class="text--primary pb-0">
                          <div id="roomName">{{ meeting.name }}</div>
                        </v-card-text>
                      </v-col>
                      <v-col cols="12" sm="7">
                        <v-card-subtitle class="pa-0 text--secondary">
                          Host
                        </v-card-subtitle>
                        <v-card-text class="text--primary pb-0">
                          <div id="hostName">{{ meeting.hostName }}</div>
                        </v-card-text>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="5">
                        <v-card-subtitle class="pa-0 text--secondary">
                          Date
                        </v-card-subtitle>
                        <v-card-text class="text--primary pb-0">
                          <div id="bookingDate">{{ meeting.bookingDate }}</div>
                        </v-card-text>
                      </v-col>
                      <v-col cols="12" sm="7">
                        <v-card-subtitle class="pa-0 text--secondary">
                          Time
                        </v-card-subtitle>
                        <v-card-text class="text--primary pb-0">
                          <div>
                            <span id="bookingStartTime">{{
                              meeting.bookingStartTime
                            }}</span>
                            -
                            <span id="bookingEndTime">
                              {{ meeting.bookingEndTime }}</span
                            >
                          </div>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel key="1">
                  <v-expansion-panel-header hide-actions ripple
                    >Participants</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-list subheader>
                      <v-subheader>In the meeting</v-subheader>

                      <v-list-item
                        v-for="participant in meeting.participants"
                        :key="participant"
                      >
                        <v-list-item-avatar>
                          <v-avatar
                            class="accent white--text mr-1"
                            size="32"
                            v-text="participant.slice(0, 1).toUpperCase()"
                          >
                          </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="participant"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn color="error" block @click="$router.push({ path: '/' })">
                  Leave meeting
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Meeting",
  data() {
    return {
      meeting: {},
      hostName: "",
      panel: [0, 1],
    };
  },
  async created() {
    await this.$store.dispatch("getMeeting", this.$route.params.meetingId);
    this.meeting = this.$store.state.data[0];
    const host = this.$store.state.data[0].hostName.split(" ");
    this.hostName =
      host.length &&
      `${host[0].slice(0, 1).toUpperCase()}${
        host[1] ? host[1].slice(0, 1).toUpperCase() : ""
      }`;
  },
};
</script>
