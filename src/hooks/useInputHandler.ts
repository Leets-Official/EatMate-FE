import { useState } from 'react';

interface FormState {
  [key: string]: any;
}

export const useInputHandler = (initialState: FormState) => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const validateForm = (requiredFields: string[]) => {
    const newErrors: { [key: string]: boolean } = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formData, errors, handleChange, validateForm };
};
