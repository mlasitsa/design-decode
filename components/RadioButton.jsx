import React, { useState } from "react";

const RadioButton = ({ buttonName, tag, selected, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name="componentType"
        value={JSON.stringify(tag)} // Convert to string for easy backend handling
        checked={selected === JSON.stringify(tag)}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
          selected === JSON.stringify(tag) ? "border-blue-500" : "border-gray-400"
        }`}
      >
        {selected === JSON.stringify(tag) && (
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
        )}
      </div>
      <span className="text-gray-700">{buttonName}</span>
    </label>
  );
};

export default RadioButton;

