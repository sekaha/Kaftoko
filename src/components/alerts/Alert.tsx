import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { ReactNode } from 'react';

type Props = {
  isOpen: boolean
  message: string | ReactNode
  variant?: 'success' | 'warning' | 'info'
}

export const Alert = ({ isOpen, message, variant = 'warning' }: Props) => {
  const classes = classNames(
    'fixed font-bold top-20 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'bg-humba_500': variant === 'warning',
      'bg-jing_500 z-20': variant === 'success',
      'bg-pravda_400 z-40': variant === 'info',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-4">
          <p className="text-sm text-center font-medium text-gray-100">
            {message}
          </p>
        </div>
      </div>
    </Transition>
  )
}
