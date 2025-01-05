import { useState } from 'react';
import { useRecoilState } from 'recoil';

type UseInputHandlerProps<T> = {
  atom: any; // recoil atom
  validate?: (key: keyof T, value: string) => string | null; //유효성 검사 함수
};

export const UseInputHandler = <T extends Record<string, any>>({
  atom,
  validate,
}: UseInputHandlerProps<T>) => {
  const [state, setState] = useRecoilState<T>(atom);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (key: keyof T, value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (validate) {
      const validationError = validate(key, value);
      setErrorMessage(validationError || '');
    }
  };

  const isFormValid = () => {
    if (!validate) return true;
    return Object.keys(state).every(
      (key) => validate(key as keyof T, state[key as keyof T]) === null
    );
  };

  return {
    state,
    errorMessage,
    handleInputChange,
    isFormValid,
    setErrorMessage,
  };
};
