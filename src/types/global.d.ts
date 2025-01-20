declare module 'ios-style-picker' {
  import React from 'react';

  interface IosStylePickerProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    height?: number;
    itemHeight?: number;
    backgroundColor?: string;
    accentColor?: string;
  }

  const IosStylePicker: React.FC<IosStylePickerProps>;

  export default IosStylePicker;
}
