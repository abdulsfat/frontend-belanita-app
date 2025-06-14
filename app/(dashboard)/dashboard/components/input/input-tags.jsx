"use client";
import { useEffect, useState } from 'react';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';

function InputTags({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateKey,
}) {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState(defaultValue || []);

  const updateInputValue = (val) => {
    setValue(val);
  };

  useEffect(() => {
    if (value.includes(',')) {
      const newTags = value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      setTags(prev => [...prev, ...newTags]);
      setValue('');
    }
  }, [value]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() !== "") {
        setTags(prev => [...prev, value.trim()]);
        setValue('');
      }
    }
  };

  useEffect(() => {
    updateFormValue(updateKey, tags);
  }, [tags]);

  const handleTagRemove = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <div className={`form-control w-full ${containerStyle || ''}`}>
      <label className="label">
        <span className={'label-text text-xs text-base-content ' + (labelStyle || '')}>
          {labelTitle}
        </span>
      </label>
      <p className="flex flex-wrap gap-2 mt-2 mb-2">
        {tags.map((t, k) => (
          <div
            key={k}
            className="flex items-center px-2 py-1 cursor-pointer badge badge-ghost hover:badge-neutral"
            onClick={() => handleTagRemove(k)}
          >
            {t}
            <XCircleIcon className="w-4 h-4 ml-1" />
          </div>
        ))}
      </p>
      <input
        type="text"
        value={value}
        placeholder={placeholder || ''}
        onChange={(e) => updateInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full input input-bordered"
      />
    </div>
  );
}

export default InputTags;
