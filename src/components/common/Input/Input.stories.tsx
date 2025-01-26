import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input', // Storybook의 Input 카테고리
  component: Input,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드의 라벨을 설정합니다.',
    },
    as: {
      control: 'select',
      options: ['input', 'textarea'],
      description: '입력 필드의 타입을 설정합니다.',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드의 플레이스홀더 텍스트를 설정합니다.',
    },
    maxLength: {
      control: 'number',
      description: '입력 가능한 최대 글자 수를 설정합니다.',
    },
    rows: {
      control: 'number',
      description: 'textarea 사용 시의 행 수를 설정합니다.',
    },
    type: {
      control: 'text',
      description: 'input의 타입을 설정합니다. (예: text, password)',
    },
    guideMessage: {
      control: 'text',
      description: '입력 필드 아래의 가이드 메시지를 설정합니다.',
    },
    hasError: {
      control: 'boolean',
      description: '입력 필드의 에러 상태를 설정합니다.',
    },
    errorMessage: {
      control: 'text',
      description: '입력 필드의 에러 메시지를 설정합니다.',
    },
    value: {
      control: 'text',
      description: '입력 필드의 기본 값을 설정합니다.',
    },
    onChange: {
      action: 'changed',
      description: '입력 값이 변경될 때 호출되는 함수입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이름',
    as: 'input',
    placeholder: '이름을 입력하세요',
    maxLength: 50,
    value: '',
    guideMessage: '실명을 입력해주세요.',
    hasError: false,
    errorMessage: '',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    as: 'input',
    placeholder: '이메일을 입력하세요',
    type: 'email',
    maxLength: 100,
    value: 'invalid email',
    hasError: true,
    errorMessage: '유효한 이메일을 입력해주세요.',
  },
};

export const TextArea: Story = {
  args: {
    label: '설명',
    as: 'textarea',
    placeholder: '설명을 입력하세요',
    maxLength: 200,
    rows: 4,
    value: '',
    guideMessage: '200자 이내로 작성해 주세요.',
  },
};

export const GuideMessage: Story = {
  args: {
    label: '비밀번호',
    as: 'input',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    guideMessage: '8자 이상 입력해주세요.',
  },
};

export const DifferentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input
        label="이메일"
        as="input"
        placeholder="이메일을 입력하세요"
        type="email"
      />
      <Input
        label="비밀번호"
        as="input"
        placeholder="비밀번호를 입력하세요"
        type="password"
      />
      <Input
        label="검색"
        as="input"
        placeholder="검색어를 입력하세요"
        type="search"
      />
    </div>
  ),
};
