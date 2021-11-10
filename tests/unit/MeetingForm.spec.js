import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import MeetingForm from "@/components/MeetingForm.vue";
import Datepicker from "@/components/Fields/Datepicker.vue";
import Timepicker from "@/components/Fields/Timepicker.vue";
import Store from "@/store/index";

describe("MeetingForm.vue test suite", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store;
  let propsData;

  beforeEach(() => {
    store = new Vuex.Store(Store);
    propsData = {
      selected: {},
      isOpen: true,
    };
  });

  it("should match with the snapshot", () => {
    const wrapper = mount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render the component", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should be open", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.props().isOpen).toBe(true);
  });

  it("should render Room Field", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.find("v-text-field[label='Room Name']").exists()).toBe(true);
  });

  it("should render Host Field", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.find("v-combobox[label='Host Name']").exists()).toBe(true);
  });

  it("should render Participants Field", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.find("v-combobox[label='Participants']").exists()).toBe(
      true
    );
  });

  it("should render Meeting Booking Date Field", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.find(Datepicker).exists()).toBe(true);
  });

  it("should render Meeting Booking Start time Field", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.find("[label='Start Time']").exists()).toBe(true);
  });

  it("should render Meeting Booking End time Field", () => {
    const wrapper = shallowMount(MeetingForm, {
      store,
      propsData,
    });
    expect(wrapper.find("[label='End Time']").exists()).toBe(true);
  });
});
