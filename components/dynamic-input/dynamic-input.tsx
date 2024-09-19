import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { TagButton } from './tagButton'
import React from 'react'
import Input from './input'
import {
  getTransformedInput,
  isTagButtonElement,
} from './dynamic-input.helpers'

export type InputItemType = string | ReactElement<HTMLDivElement>

const listOfTags: string[] = [
  'React',
  'Redux',
  'Next.js',
  'Tailwind',
  'JavaScript',
  'CSS',
  'Node.js',
  'Jest',
]

export const DynamicInput = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [listOfAvaliavleTags, setListOfAvaliavleTags] =
    useState<string[]>(listOfTags)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputItems, setInputItems] = useState<InputItemType[]>([])

  // add previous string to input value
  useEffect(() => {
    if (typeof inputItems[inputItems.length - 1] === 'string') {
      setInputValue((prev) => inputItems[inputItems.length - 1] + prev)
      setInputItems((prev) => prev.slice(0, -1))
    }
  }, [inputItems])

  const handleAddInputValue = (value: string) => {
    setInputValue(value)
  }

  const handleTagDelete = useCallback((tag: string) => {
    setListOfAvaliavleTags((prevTags) => [...prevTags, tag])

    setInputItems((prevItems) => {
      const filteredInput = prevItems.filter(
        (item) => !(React.isValidElement(item) && item.key === tag)
      )

      return getTransformedInput(filteredInput)
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
    if (inputValue.length === 0 && inputItems.length > 0) {
      const lastItem = inputItems[inputItems.length - 1]

      if (React.isValidElement(lastItem) && isTagButtonElement(lastItem)) {
        const tag = lastItem.props.tag

        handleTagDelete(tag)
      }
    }
  }, [handleTagDelete, inputItems, inputValue.length])

  const handleBackspaceSpan = (
    inputItem: string,
    e: React.KeyboardEvent<HTMLSpanElement>
  ) => {
    if (e.key === 'Backspace') {
      console.log(inputItem)
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
                <span
                  contentEditable
                  className="flex items-center my-2 w-fit h-12 py-1 px-2 focus-visible:border-none focus-visible:outline-none"
                  onKeyDown={(e) => handleBackspaceSpan(inputItem, e)}
                >
                  {inputItem}
                </span>
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
