// App.spec.js
import { shallowMount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.exists()).toBe(true);
  });

  it('changes tab when clicking a button', async () => {
    const wrapper = shallowMount(App);
    const button = wrapper.find('button'); // Update this selector based on your actual button structure
    await button.trigger('click');

    // Assuming that after the click, the currentTab data property should be updated to 1
    expect(wrapper.vm.currentTab).toBe(1);
  });

  // Add more tests as needed...
});
