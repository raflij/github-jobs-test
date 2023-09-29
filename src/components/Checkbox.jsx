import React from 'react';

const Checkbox = ({ label, name, checked, onChange }) => {
    return (
        <label className="inline-flex items-center">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="form-checkbox h-5 w-5 text-blue-400 border-blue-400 rounded-md focus:ring-2 focus:ring-offset-0 focus:ring-blue-200"
            />
            <span className="ml-2 text-neutral-600 capitalize font-bold">{label}</span>
        </label>
    );
}

export default Checkbox;
