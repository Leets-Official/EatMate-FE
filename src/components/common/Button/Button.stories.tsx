import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button'; // Button 컴포넌트 import
import GoogleIcon from '@/assets/images/GoogleIcon.svg';

const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Storybook의 버튼 카테고리
  component: Button,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'primary-outline', 'primary-outlineless'], // ButtonVariant 타입에 따른 옵션
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
    svgIcon: {
      control: 'boolean',
      description: '버튼 내부에 아이콘을 포함할지 여부를 설정합니다.',
    },
    // 버튼 내부에 svg 아이콘이 포함되는 경우가 있는데 ,
    // svg img와 버튼 컴포넌트를 다시 div 태그로 묶을 경우 아이콘과 텍스트가 차지하는 상하 공간 때문에
    // svg 아이콘이 없을 때와 동일한 padding 적용시 padding 값이 지나치게 커지게 되어
    // svgIcon 여부에 따라 동적으로 padding 값을 설정하기 위해 추가함.

    color: {
      control: 'select',
      options: ['white', 'black'],
      description: '버튼 내부 텍스트의 색상을 설정합니다.',
      // primary: white, primary-outline: #EB5916 으로 설정되어있긴 한데,
      // 구글 로그인 버튼 처럼 텍스트가 black인 경우가 있어서 추가.
      // 텍스트 색상을 black으로 바꿔야되는 것이 아니면 굳이 설정하지 않아도 됨.
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
    svgIcon: false,
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
      <Button variant="primary-outlineless" size="md" rounded="md">
        Primary Outlineless
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

export const CompareSvgIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button variant="primary" size="md" rounded="md" svgIcon={false}>
          참여하기
        </Button>
        <Button variant="primary-outline" size="md" rounded="md" svgIcon={true}>
          <img src={GoogleIcon} alt="google-icon" />
          초대하기
        </Button>
      </div>
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
