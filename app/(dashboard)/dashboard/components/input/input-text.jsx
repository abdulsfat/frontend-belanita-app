import { useState } from 'react';

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue || '');

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue(updateType, val); // Pass both updateType and value
  };

  return (
    <div className={`form-control w-full ${containerStyle || ''}`}>
      <label className="label">
        <span className={'label-text text-xs text-base-content ' + (labelStyle || '')}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder || ''}
        onChange={(e) => updateInputValue(e.target.value)}
        className="w-full input input-bordered"
      />
    </div>
  );
}

export default InputText;
