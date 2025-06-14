import { useState, useEffect } from 'react';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';

function SelectColor({
  labelTitle,
  labelDescription,
  defaultValue = '',
  containerStyle = '',
  placeholder,
  labelStyle = '',
  SelectColorStyle = '',
  options,
  updateKey,
  updateFormValue,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateValue = (newValue) => {
    updateFormValue(updateKey, newValue);
    setValue(newValue);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`inline-block ${containerStyle}`}>
      <label className={`label ${labelStyle}`}>
        <div className="label-text">
          {labelTitle}
          {labelDescription && (
            <div className="tooltip tooltip-right" data-tip={labelDescription}>
              <InformationCircleIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      </label>
      <div className="p-4 mx-auto bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-5 gap-4">
          {options.map((o, k) => (
            <div
              key={k}
              className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer"
              style={{ backgroundColor: o.value }}
              onClick={() => updateValue(o.value)}
            >
              {value === o.value && <CheckCircleIcon className="w-6 h-6 text-slate-600" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectColor;
