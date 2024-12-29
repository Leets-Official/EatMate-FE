import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '헤더 중앙에 표시할 텍스트입니다. (로고와 상호 배타적)',
    },
    showBackButton: {
      control: 'boolean',
      description: '뒤로가기 버튼 표시 여부를 설정합니다.',
    },
    subText: {
      control: 'text',
      description: '헤더 하단에 표시할 서브 텍스트를 설정합니다.',
    },
    onBackClick: {
      action: 'clicked',
      description: '뒤로가기 버튼 클릭 시 실행될 함수를 설정합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: undefined,
    showBackButton: false,
    subText: undefined,
  },
};

export const WithTitle: Story = {
  args: {
    title: '모임 만들기',
    showBackButton: true,
    subText: undefined,
  },
};

export const WithSubText: Story = {
  args: {
    title: undefined,
    showBackButton: false,
    subText: '배달팟 실시간 모집 중',
  },
};

export const OnlyLogo: Story = {
  args: {
    title: undefined,
    showBackButton: false,
    subText: undefined,
  },
};

export const OnlyLogoWithBackButton: Story = {
  args: {
    title: undefined,
    showBackButton: true,
    subText: undefined,
  },
};
