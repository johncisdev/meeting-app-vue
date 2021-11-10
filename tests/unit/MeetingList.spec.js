import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";

import MeetingList from "@/components/MeetingList.vue";
import Store from "@/store/index";

describe("MeetingList.vue test suite", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store;

  beforeEach(() => {
    store = new Vuex.Store(Store);
  });

  it("should match with the snapshot", () => {
    const wrapper = mount(MeetingList, {
      store,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render the component", () => {
    const wrapper = shallowMount(MeetingList, {
      store,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("should have add button", () => {
    const wrapper = shallowMount(MeetingList, {
      store,
    });
    expect(wrapper.find("v-btn").exists()).toBe(true);
    expect(wrapper.find("v-btn").text()).toBe("Create Meeting");
  });

  it("should have a global search", () => {
    const wrapper = shallowMount(MeetingList, {
      store,
    });
    expect(wrapper.find("v-text-field").exists()).toBe(true);
  });

  it("should have a table", () => {
    const wrapper = shallowMount(MeetingList, {
      store,
    });
    expect(wrapper.find("v-data-table").exists()).toBe(true);
  });
});
