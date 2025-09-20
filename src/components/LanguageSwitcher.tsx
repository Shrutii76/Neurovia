import React, { ChangeEvent } from 'react';
import i18n from 'i18next';

const LanguageSwitcher: React.FC = () => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="border border-orange-300 text-orange-700 rounded px-2 py-1"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
      <option value="mr">मराठी</option>
    </select>
  );
};

export default LanguageSwitcher;
