import { Meta, StoryObj } from '@storybook/react';
import Tabs from '@/components/common/Tab/Tab';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tabs: {
      control: false,
      description: '탭 항목의 배열입니다. 각 항목은 id와 label을 포함합니다.',
    },
    onTabClick: {
      action: 'clicked',
      description: '탭 클릭 시 호출되는 콜백 함수입니다.',
    },
    selectedTabId: {
      control: 'text',
      description: '현재 선택된 탭의 ID입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const TwoTabs: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: '홈' },
      { id: 'tab2', label: '채팅' },
    ],
    selectedTabId: 'tab1',
    onTabClick: (id: string) => console.log(`Tab clicked: ${id}`),
  },
};

export const ThreeTabs: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: '밥약' },
      { id: 'tab2', label: '술약' },
      { id: 'tab3', label: '배달팟' },
    ],
    selectedTabId: 'tab1',
    onTabClick: (id: string) => console.log(`Tab clicked: ${id}`),
  },
};
