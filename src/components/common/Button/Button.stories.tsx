import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button'; // Button 컴포넌트 import

const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Storybook의 버튼 카테고리
  component: Button,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'primary-outline'], // ButtonVariant 타입에 따른 옵션
      description: '버튼의 스타일을 설정합니다.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'], // ButtonSize 타입에 따른 옵션
      description: '버튼의 크기를 설정합니다.',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md'], // ButtonRounded 타입에 따른 옵션
      description: '버튼의 모서리 둥근 정도를 설정합니다.',
    },
    disabled: {
      control: 'boolean',
      description: '버튼을 비활성화할지 여부를 설정합니다.',
    },
    children: {
      control: 'text',
      description: '버튼 내부의 내용을 설정합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    rounded: 'md',
    children: 'Default Button',
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary" size="md" rounded="md">
        Primary
      </Button>
      <Button variant="primary-outline" size="md" rounded="md">
        Primary Outline
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary" size="sm" rounded="md">
        Small Button
      </Button>
      <Button variant="primary" size="md" rounded="md">
        Medium Button
      </Button>
      <Button variant="primary" size="lg" rounded="md">
        Large Button
      </Button>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary" size="md" rounded="none">
        No Rounding
      </Button>
      <Button variant="primary" size="md" rounded="sm">
        Small Rounded
      </Button>
      <Button variant="primary" size="md" rounded="md">
        Medium Rounded
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Button variant="primary" size="md" rounded="md" disabled>
      Disabled Button
    </Button>
  ),
};
