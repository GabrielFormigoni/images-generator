import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>

      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>

        {/* Botão que gera um prompt aleatório */}
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-md text-black"
          >
            Surprise me
          </button>
        )}

      </div>

      {/* Input com as informações passadas pelo prompt */}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className="bg-gray-50 text-gray-500 rounded-lg text-sm focus:ring-[#4649ff] focus:border-[#4649ff] border border-gray-300 block outline-none w-full p-3"
      />

    </div>
  );
};

export default FormField;
