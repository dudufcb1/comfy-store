import React from 'react';

const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <label className="form-control">
      {/* SE QUITO CODIGO POR QUE LO HACIA GRANDE Y EL PADRE YA TENDRÁ EL TAMAÑO */}
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder="Type here"
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`} //${size} Clase dinámica
      />
    </label>
  );
};

export default FormInput;
