import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import MeetingDetails from "@/components/MeetingDetails.vue";
import Store from "@/store/index";

describe("MeetingDetails.vue test suite", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store;
  let propsData;
  const DATA = {
    name: "Room 101",
    hostName: "Chris",
    participants: ["Nang", "Let", "Sal", "Ming"],
    bookingDate: "11/11/2021",
    bookingStartTime: "10:00",
    bookingEndTime: "10:30",
    id: 4,
  };

  beforeEach(() => {
    store = new Vuex.Store(Store);
    propsData = {};
  });

  it("should match with the snapshot", () => {
    const wrapper = mount(MeetingDetails, {
      store,
      propsData,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render the component", () => {
    const wrapper = shallowMount(MeetingDetails, {
      store,
      propsData,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should render room and meeting info", async () => {
    const $store = {
      state: { data: DATA },
    };
    const wrapper = shallowMount(MeetingDetails, {
      propsData,
      mocks: {
        $store,
        $route: {
          params: { meetingId: 4 },
        },
      },
    });

    await wrapper.setData({
      meeting: DATA,
    });

    //check if rendered
    expect(wrapper.find("#roomName").text()).toBe(DATA.name);
    //check in store
    expect(wrapper.vm.$store.state.data.name).toBe(DATA.name);

    //check if rendered
    expect(wrapper.find("#hostName").text()).toBe(DATA.hostName);
    //check in store
    expect(wrapper.vm.$store.state.data.hostName).toBe(DATA.hostName);

    //check if rendered
    expect(wrapper.find("#bookingDate").text()).toBe(DATA.bookingDate);
    //check in store
    expect(wrapper.vm.$store.state.data.bookingDate).toBe(DATA.bookingDate);

    //check if rendered
    expect(wrapper.find("#bookingStartTime").text()).toBe(
      DATA.bookingStartTime
    );
    //check in store
    expect(wrapper.vm.$store.state.data.bookingStartTime).toBe(
      DATA.bookingStartTime
    );

    //check if rendered
    expect(wrapper.find("#bookingEndTime").text()).toBe(DATA.bookingEndTime);
    //check in store
    expect(wrapper.vm.$store.state.data.bookingEndTime).toBe(
      DATA.bookingEndTime
    );
  });
});
