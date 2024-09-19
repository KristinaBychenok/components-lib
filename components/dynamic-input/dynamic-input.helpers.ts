import { ReactElement } from 'react'
import { InputItemType } from './dynamic-input'
import { TagButtonType } from './tagButton'

export const getTransformedInput = (
  inputItems: InputItemType[]
): InputItemType[] => {
  let strings: string[] = []
  let result: InputItemType[] = []

  // Transform different strings into one
  inputItems.map((item) => {
    if (typeof item === 'string') {
      strings.push(item)
    } else {
      const joinedString = strings.length > 0 ? strings.join(' ') : ''
      result = [...result, ...(!!joinedString ? [joinedString] : []), item]

      strings = []
    }
  })
  result.push(strings.join(' '))

  return result
}

export const isTagButtonElement = (
  element: ReactElement
): element is ReactElement<TagButtonType> => {
  return (element as ReactElement<TagButtonType>).props.tag !== undefined
}
