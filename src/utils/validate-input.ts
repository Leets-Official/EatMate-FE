/**
 * 생년월일 유효성 검사
 * @param year - 입력된 년도 값
 * @param month - 입력된 월 값
 * @param day - 입력된 일 값
 * @returns 에러 메세지 또는 true ( 유효한 경우 )
 */
export const validateBirthday = (
  year: number | null,
  month: number | null,
  day: number | null
): string | true => {
  const currentYear = new Date().getFullYear();

  if (year === null || month === null || day === null) {
    return '올바른 생년월일을 입력해주세요.';
  }

  if (year < 1900 || year > currentYear) {
    return '올바른 생년월일을 입력해주세요.';
  }

  if (month < 1 || month > 12) {
    return '올바른 생년월일을 입력해주세요.';
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return '올바른 생년월일을 입력해주세요.';
  }

  return true;
};

/**
 *  전화번호 유효성 검사
 * @param value - 입력된 전화번호 값
 * @returns 포맷팅된 전화번호 문자열
 */
export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D+/g, ''); // 숫자만 남김
  const match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/); // 전화번호 형태로 포맷팅
  if (match) {
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  }
  return value;
};

export const validatePhoneNumber = (value: string) => {
  const numericValue = value.replace(/-/g, '');
  return numericValue.length === 11;
};

/**
 * MBTI 단일 입력란
 * @param value - 입력된 MBTI 값
 * @param index - 입력된 위치 인덱스 (0~3)
 * @returns true or false
 */
export const validateMbtiInput = (value: string, index: number): boolean => {
  const constraints = [
    /^[EIei]$/, // 첫 번째 input: E, I
    /^[NSns]$/, // 두 번째 input: N, S
    /^[FTft]$/, // 세 번째 input: F, T
    /^[PJpj]$/, // 네 번째 input: P, J
  ];

  return constraints[index].test(value.toUpperCase());
};

/**
 * 전체 MBTI 유효성 검사
 * @param mbti - 입력된 MBTI 문자열
 * @returns true or false
 */
export const validateMbti = (mbti: string): boolean => {
  const mbtiRegex = /^[EIei][NSns][FTft][PJpj]$/;
  return mbtiRegex.test(mbti);
};

/**
 * 닉네임 유효성 검사
 * @param value - 입력된 닉네임 값
 * @returns 에러 메세지 또는 null
 */
export const validateNickname = (value: string): string | null => {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

  if (value.length < 2 || value.length > 12) {
    return '2-12자 이내로 입력해주세요.';
  }
  if (!nicknameRegex.test(value)) {
    return '띄어쓰기 없이 한글,영문,숫자만 가능해요.';
  }
  return null;
};

export const isNicknameValid = (value: string): boolean => {
  return validateNickname(value) === null;
};

/**
 * 학번 유효성 검사
 * @param value - 입력된 학번 값
 * @returns 에러 메세지 또는 null
 */
export const validateStudentId = (value: number | null): string | null => {
  if (value === null) {
    return '학번을 입력해주세요.';
  }
  const valueAsString = value.toString();

  if (!/^\d*$/.test(valueAsString)) {
    return '숫자만 입력 가능합니다.';
  }

  if (!/^20[12]\d{6}$/.test(valueAsString)) {
    return '올바른 학번을 입력해주세요.';
  }

  return null;
};

export const isStudentIdValid = (value: number | null): boolean => {
  return validateStudentId(value) === null;
};
