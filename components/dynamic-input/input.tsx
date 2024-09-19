import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

interface InputProps {
  value: string
  addInputValue: (value: string) => void
  placeholder?: string
  onBackspace?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, addInputValue, placeholder, onBackspace }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const mirrorRef = useRef<HTMLSpanElement>(null)

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      addInputValue(e.target.value)
    }

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    useEffect(() => {
      if (inputRef.current && mirrorRef.current) {
        mirrorRef.current.textContent =
          inputRef.current.value || inputRef.current.placeholder || ''
        inputRef.current.style.width = `${mirrorRef.current.offsetWidth + 20}px`
      }
    }, [value, placeholder])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (onBackspace) {
          onBackspace() // Trigger the effect when Backspace is pressed
        }
      }
    }

    return (
      <div className="inline-block">
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
          className="px-2 border-none focus-visible:border-none focus-visible:outline-none my-2 h-12 py-1 w-auto min-w-[100px] box-content"
        />
        <span
          ref={mirrorRef}
          style={{
            visibility: 'hidden',
            position: 'absolute',
            whiteSpace: 'pre',
            fontSize: 'inherit', // Match the font size of the input
            fontFamily: 'inherit', // Match the font family of the input
            padding: '0 2px', // Match input padding
          }}
        >
          {value || placeholder}
        </span>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
