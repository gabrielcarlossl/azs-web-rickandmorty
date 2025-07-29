import type { Meta, StoryObj } from '@storybook/react-vite';
import ButtonStyled from '../style/ButtonStyled'

const meta: Meta<typeof ButtonStyled> = {
  component: ButtonStyled,
  title: 'ButtonStyled',
};
export default meta;

type Story = StoryObj<typeof ButtonStyled>;

export const Default: Story = {
  render: () => <ButtonStyled>Botão Padrão</ButtonStyled>,
};