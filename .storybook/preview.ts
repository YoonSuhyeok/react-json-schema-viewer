import type { Preview } from '@storybook/react-vite'
import '../src/index.css' // TailwindCSS 스타일 임포트

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;