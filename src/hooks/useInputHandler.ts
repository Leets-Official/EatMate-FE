import { useState } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

type UseInputHandlerProps<T> = {
  atom: RecoilState<T>; // recoil atom
  validate?: (key: keyof T, value: string, state: T) => string | null; //유효성 검사 함수
};

export const UseInputHandler = <T extends Record<string, any>>({
  atom,
  validate,
}: UseInputHandlerProps<T>) => {
  const [state, setState] = useRecoilState<T>(atom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (key: keyof T, value: string) => {
    setState((prev: T) => ({
      ...prev,
      [key]: value,
    }));

    if (validate) {
      const validationError = validate(key, value, state);
      setErrorMessage(validationError || '');
    }
  };

  const isFormValid = () => {
    if (!validate) return true;

    return Object.keys(state).every((key) => {
      const fieldKey = key as keyof T;
      return validate(fieldKey, state[fieldKey], state) === null;
    });
  };

  return {
    state,
    errorMessage,
    handleInputChange,
    isFormValid,
    setErrorMessage,
    setState,
  };
};
