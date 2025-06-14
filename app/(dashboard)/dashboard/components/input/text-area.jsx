import { useState } from 'react';

function TextArea({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue || '');

  const updateTextAreaValue = (val) => {
    setValue(val);
    updateFormValue(updateType, val);
  };

  return (
    <div className={`form-control w-full ${containerStyle || ''}`}>
      <label className="label">
        <span className={'label-text text-xs text-base-content ' + (labelStyle || '')}>
          {labelTitle}
        </span>
      </label>
      <textarea
        value={value}
        placeholder={placeholder || ''}
        onChange={(e) => updateTextAreaValue(e.target.value)}
        className="w-full textarea textarea-bordered"
      />
    </div>
  );
}

export default TextArea;
