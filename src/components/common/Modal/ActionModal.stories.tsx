import type { Meta, StoryObj } from '@storybook/react';
import ActionModal from './ActionModal';

const meta: Meta<typeof ActionModal> = {
  title: 'Components/Modal/ActionModal',
  component: ActionModal,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 열림 상태를 설정합니다.',
    },
    actions: {
      control: 'object',
      description: '모달에 표시될 버튼의 배열을 설정합니다.',
    },
    onClose: {
      action: 'onClose',
      description: '모달 닫기 이벤트를 처리하는 함수입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    actions: [
      { label: '앨범에서 선택', onClick: () => alert('앨범에서 선택 클릭') },
      {
        label: '사진 삭제',
        onClick: () => alert('사진 삭제 클릭'),
        type: 'delete',
      },
      { label: '닫기', onClick: () => alert('닫기 클릭') },
    ],
  },
};

export const ActionTypes: Story = {
  render: () => (
    <ActionModal
      isOpen={true}
      actions={[
        { label: '기본 액션', onClick: () => alert('기본 액션 클릭') },
        {
          label: '삭제 액션',
          onClick: () => alert('삭제 액션 클릭'),
          type: 'delete',
        },
      ]}
      onClose={() => alert('모달 닫기')}
    />
  ),
};

export const WithCloseAction: Story = {
  render: () => (
    <ActionModal
      isOpen={true}
      actions={[
        { label: '앨범에서 선택', onClick: () => alert('앨범에서 선택 클릭') },
        { label: '닫기', onClick: () => alert('닫기 클릭') },
      ]}
      onClose={() => alert('모달 닫기')}
    />
  ),
};
