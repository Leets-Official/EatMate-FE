import { Meta, StoryFn } from '@storybook/react';
import SortingButton from '@/components/common/SortingButton/SortingButton';

const meta: Meta<typeof SortingButton> = {
  title: 'Components/SortingButton',
  component: SortingButton,
  argTypes: {
    isSelected: { control: 'boolean', description: '선택된 상태 여부' },
    text: { control: 'text', description: '버튼에 표시할 텍스트' },
    iconType: {
      control: 'select',
      options: ['upDown', 'downArrow'],
      description: '아이콘 타입',
    },
  },
};

export default meta;

const Template: StoryFn = (args) => <SortingButton text={''} iconType={'upDown'} {...args} />;

export const Default = Template.bind({});
Default.args = {
  isSelected: false,
  text: '기본순',
  iconType: 'upDown',
};

export const Selected = Template.bind({});
Selected.args = {
  isSelected: true,
  text: '기본순',
  iconType: 'downArrow',
};
