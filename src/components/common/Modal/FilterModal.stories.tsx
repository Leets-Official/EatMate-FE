import type { Meta, StoryObj } from '@storybook/react';
import FilterModal from './FilterModal';
import RangeSlider from '../RangeSlider';

const meta: Meta<typeof FilterModal> = {
  title: 'Components/Modal/FilterModal',
  component: FilterModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 열림 상태를 설정합니다.',
    },
    options: {
      control: 'object',
      description: '모달에 표시될 옵션의 배열을 설정합니다.',
    },
    selectedOption: {
      control: 'text',
      description: '현재 선택된 옵션의 값입니다.',
    },
    onSelect: {
      action: 'onSelect',
      description: '옵션 선택 이벤트를 처리하는 함수입니다.',
    },
    onClose: {
      action: 'onClose',
      description: '모달 닫기 이벤트를 처리하는 함수입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// 정렬 모달
export const SortingModal: Story = {
  args: {
    isOpen: true,
    title: '정렬',
    options: [
      { label: '기본순', value: 'default' },
      { label: '최신 등록 순', value: 'latest' },
      { label: '모임시간 임박 순', value: 'urgent' },
    ],
    selectedOption: 'default',
    onSelect: (value) => alert(`선택된 옵션: ${value}`),
    onClose: () => alert('모달 닫기'),
  },
};

// 성별 선택 모달
export const GenderModal: Story = {
  args: {
    isOpen: true,
    title: '성별 선택',
    options: [
      { label: '모두 보기', value: 'all' },
      { label: '남자만', value: 'male' },
      { label: '여자만', value: 'female' },
    ],
    selectedOption: 'all',
    onSelect: (value) => alert(`선택된 성별: ${value}`),
    onClose: () => alert('모달 닫기'),
  },
};

// 인원수 선택 모달
export const ParticipantModal: Story = {
  render: () => {
    return (
      <FilterModal
        isOpen={true}
        title="인원수 선택"
        options={[]}
        selectedOption=""
        onSelect={() => {}}
        onClose={() => alert('모달 닫기')}
      >
        <RangeSlider isOpen />
      </FilterModal>
    );
  },
};
