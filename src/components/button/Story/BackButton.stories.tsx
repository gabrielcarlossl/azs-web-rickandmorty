import type { Meta, StoryObj } from '@storybook/react-vite';
import BackButton from '../BackButton';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof BackButton> = {
  component: BackButton,
  title: 'BackButton',
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}
export default meta;

type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  render: () => <BackButton />,
};