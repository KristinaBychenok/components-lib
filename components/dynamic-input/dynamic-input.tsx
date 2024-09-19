import {
  createRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TagButton } from './tagButton'
import React from 'react'
import Input from './input'
import {
  getTransformedInput,
  isTagButtonElement,
} from './dynamic-input.helpers'

export type InputItemType = string | ReactElement<HTMLDivElement>

export const DynamicInput = ({ listOfTags }: { listOfTags: string[] }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [listOfAvaliavleTags, setListOfAvaliavleTags] =
    useState<string[]>(listOfTags)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputItems, setInputItems] = useState<InputItemType[]>([])
  const existingInputRefs = useRef<
    (React.RefObject<HTMLInputElement> | null)[]
  >([])

  // If the last item is a string, add this string to the input value
  useEffect(() => {
    if (typeof inputItems[inputItems.length - 1] === 'string') {
      setInputValue((prev) => inputItems[inputItems.length - 1] + prev)
      setInputItems((prev) => prev.slice(0, -1))
    }
  }, [inputItems])

  const handleAddInputValue = (value: string) => {
    setInputValue(value)
  }

  const handleChangeExistingInput = (value: string, index: number) => {
    console.log('value', value)
    console.log('inputItems', inputItems)
    console.log('existingInputRefs', existingInputRefs)

    setInputItems((prev) => {
      if (value.length === 0 && index === 0) {
        return prev.slice(1)
      }
      const updatedItems = [...prev]
      updatedItems[index] = value

      return updatedItems
    })
  }

  const handleTagDelete = useCallback((tag: string) => {
    setListOfAvaliavleTags((prevTags) => [...prevTags, tag])

    setInputItems((prevItems) => {
      const filteredInput = prevItems.filter(
        (item) => !(React.isValidElement(item) && item.key === tag)
      )

      const transformedInput = getTransformedInput(filteredInput)
      existingInputRefs.current = transformedInput.map((item) =>
        typeof item === 'string' ? createRef<HTMLInputElement>() : null
      )

      return transformedInput
    })

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleTagClick = useCallback(
    (tag: string) => {
      setListOfAvaliavleTags((prev) => {
        const newList = prev.filter((item) => item !== tag)
        return newList
      })

      if (!!inputValue) {
        existingInputRefs.current.push(createRef<HTMLInputElement>())
      }
      existingInputRefs.current.push(null)

      const newInputItems = [
        ...inputItems,
        ...(!!inputValue ? [`${inputValue}`] : []),
        <TagButton
          key={tag}
          tag={tag}
          handleTagClick={handleTagClick}
          isDelete={true}
          handleTagDelete={handleTagDelete}
        />,
      ]

      setInputItems(newInputItems)
      setInputValue('')
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
    [handleTagDelete, inputItems, inputValue]
  )

  const handleBackspaceInput = useCallback(() => {
    if (
      (inputValue.length === 0 || inputRef.current?.selectionStart === 0) &&
      inputItems.length > 0
    ) {
      const lastItem = inputItems[inputItems.length - 1]

      if (React.isValidElement(lastItem) && isTagButtonElement(lastItem)) {
        const tag = lastItem.props.tag

        handleTagDelete(tag)
      }
    }
  }, [handleTagDelete, inputItems, inputValue.length])

  const handleBackspaceExistingInput = (value: string, index: number) => {
    const existingInputRef = existingInputRefs.current[index]

    if (
      existingInputRef?.current &&
      (value.length === 0 || existingInputRef.current.selectionStart === 0) &&
      index !== 0
    ) {
      const prevItem = inputItems[index - 1]

      if (React.isValidElement(prevItem) && isTagButtonElement(prevItem)) {
        const tag = prevItem.props.tag

        handleTagDelete(tag)
      }
    }
    if (
      existingInputRef?.current &&
      (value.length === 1 || existingInputRef.current.selectionStart === 0) &&
      index === 0
    ) {
      existingInputRefs.current = existingInputRefs.current.slice(1)
    }
  }

  return (
    <div className="flex flex-col w-full h-full justify-between border-2">
      <div className="flex flex-wrap gap-2  w-full h-fit min-h-14 border-b-2 items-center">
        {listOfAvaliavleTags.map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            handleTagClick={handleTagClick}
            isDelete={false}
          />
        ))}
      </div>
      <div className="flex flex-row w-full">
        <ul className="flex flex-row w-full h-fit flex-wrap items-center">
          {inputItems.map((inputItem, index) => (
            <li key={index} className="w-fit pl-1">
              {typeof inputItem === 'string' ? (
                <Input
                  value={inputItem}
                  addInputValue={(value) =>
                    handleChangeExistingInput(value, index)
                  }
                  onBackspace={() =>
                    handleBackspaceExistingInput(inputItem, index)
                  }
                  ref={
                    existingInputRefs.current[
                      index
                    ] as React.RefObject<HTMLInputElement>
                  }
                />
              ) : (
                inputItem
              )}
            </li>
          ))}
          <li key="input" className="w-fit pl-1">
            <Input
              addInputValue={handleAddInputValue}
              value={inputValue}
              ref={inputRef}
              placeholder={inputItems.length > 0 ? '' : 'Typed text here...'}
              onBackspace={handleBackspaceInput}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
