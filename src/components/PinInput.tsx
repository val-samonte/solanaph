import React, { useEffect, useRef, useState } from 'react'

interface PinInputProps {
  length: number
  onChange: (pin: string) => void
}

const PinInput: React.FC<PinInputProps> = ({ length, onChange }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    onChange(values.join(''))
  }, [values, onChange])

  const handleChange = (value: string, position: number) => {
    const current = values.join('').length
    const index = values[position] === '' ? current : position

    if (/^\d$/.test(value)) {
      const newValues = [...values]
      newValues[index] = value
      setValues(newValues)

      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus()
      }
    } else if (value === '') {
      const newValues = [...values]
      newValues[length] = ''
      setValues(newValues)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      if (index === length - 1 && e.currentTarget.value !== '') {
        setValues((val) => {
          return val.slice(0, index).concat([''])
        })
      } else if (index > 0) {
        setValues((val) => {
          return val
            .slice(0, index - 1)
            .concat(Array(length + 1 - index).fill(''))
        })
        inputsRef.current[index - 1]?.focus()
      } else {
        setValues(Array(length).fill(''))
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text')
    if (/^\d{6}$/.test(paste)) {
      const newValues = paste.slice(0, length).split('')
      setValues(newValues)

      // Update input fields with the pasted values
      newValues.forEach((value, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i]!.value = value
        }
      })

      // Focus on the first empty input field after pasting
      if (newValues.length < length) {
        inputsRef.current[newValues.length]?.focus()
      } else {
        inputsRef.current[length - 1]?.focus()
      }
    }
    e.preventDefault()
  }

  return (
    <div className='flex items-center gap-1'>
      {values.map((value, index) => (
        <input
          className='text-lg px-2 py-1 border border-gray-300 rounded-md caret-transparent'
          key={index}
          type='text'
          inputMode='numeric'
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          maxLength={1}
          style={{ width: '2rem', marginRight: '0.5rem', textAlign: 'center' }}
        />
      ))}
    </div>
  )
}

export default PinInput
