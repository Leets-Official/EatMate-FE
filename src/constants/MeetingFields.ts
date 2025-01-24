export type InputType = 'input' | 'textarea';

export interface FormField {
  key: string;
  label: string;
  placeholder: string;
  maxLength?: number;
  as: InputType;
  rows?: number;
  guideMessage?: string;
  errorMessage?: string;
  hasError?: boolean;
}

export const offlineMeetingFormFields: FormField[] = [
  {
    key: 'meetingName',
    label: '모임 제목',
    placeholder: '30자 이내',
    maxLength: 30,
    as: 'textarea',
  },
  {
    key: 'meetingDescription',
    label: '모임 설명',
    placeholder: '무엇을 하는 어떤 모임인가요? 100자 이내',
    maxLength: 100,
    rows: 4,
    as: 'textarea',
  },
  {
    key: 'meetingPlace',
    label: '가게 이름',
    placeholder: '가게명 입력',
    guideMessage: '가게명과 지점명을 함께 입력해주세요',
    as: 'input',
    errorMessage: '다시 입력해주세요.',
  },
];
