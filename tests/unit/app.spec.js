import { mount } from '@vue/test-utils';
import App from '../../src/App.vue';

describe('App.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(App);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('changes the tab on button click', async () => {
    const wrapper = mount(App);
    
    
    await wrapper.find('.activeTab').trigger('click');

  
    expect(wrapper.vm.currentTab).toBe(2);
  });

 
});

