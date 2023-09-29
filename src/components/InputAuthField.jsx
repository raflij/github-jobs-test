import React from 'react'
import { Icon } from '@iconify/react';

const InputAuthField = ({ type, label, name, placeholder, icon, errors, register, validationSchema }) => {
  const hasError = () => errors && errors[name];
  return (
    <label className="block">
      <span className='text-neutral-600 capitalize font-bold'>{label}</span>
      <div className="relative mt-1">
        <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400 icon'>
          <Icon icon={icon} width='16' height='16' />
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          errors={errors}
          className="w-full pl-8
          focus:outline-none focus:ring-1 focus:border-blue-400 focus:ring-blue-400 placeholder:font-medium placeholder:text-neutral-400 text-neutral-500 font-medium
          border-2 border-neutral-400/60 ring-2 ring-neutral-200"
          autoComplete="off"
          {...register(name, validationSchema, {})}
        />
      </div>
      {hasError() && (
        <div className="flex justify-end">
          <span className="text-xs text-red-400 absolute mt-1">{errors[name].message}</span>
        </div>
      )}
    </label>
  )
}

export default InputAuthField
