
import { render } from '@testing-library/vue';
import App from '@/components/App.vue';

test('renders correctly', async () => {
  const { getByText } = render(App);
  expect(getByText('Imágenes del mundo')).toBeInTheDocument();
});
