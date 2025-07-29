import type { Meta, StoryObj } from '@storybook/react-vite';
import AddFavoriteButton from '../AddFavoriteButton';
import type { Episode } from '../../../store/episodes/types';
import { Provider } from 'react-redux';
import { store } from '../../../store/configureStore';


const mockEpisode: Episode = {
  id: '1',
  episode: 'S01E01',
  name: 'Pilot',
  air_date: 'December 2, 2013',
  characters: [],
};

const meta: Meta<typeof AddFavoriteButton> = {
  component: AddFavoriteButton,
  title: 'AddFavoriteButton',
  args: {
    episodeData: mockEpisode,
    favorites: [],
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AddFavoriteButton>;

export const NotFavorited: Story = {
  args: {
    episodeData: mockEpisode,
    favorites: [],
  },
};

export const Favorited: Story = {
  args: {
    episodeData: mockEpisode,
    favorites: [mockEpisode],
  },
};