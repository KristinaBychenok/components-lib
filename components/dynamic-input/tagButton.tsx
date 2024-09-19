import { DeleteIcon } from './deleteIcon'

export type TagButtonType = {
  tag: string
  handleTagClick: (tag: string) => void
  isDelete: boolean
  handleTagDelete?: (tag: string) => void
}

export const TagButton = ({
  tag,
  handleTagClick,
  isDelete,
  handleTagDelete,
}: TagButtonType) => {
  const handleClick = () => {
    handleTagClick(tag)
  }
  const handleDelete = () => {
    if (handleTagDelete) {
      handleTagDelete(tag)
    }
  }

  return (
    <div
      className={`flex items-center justify-center w-fit h-12 cursor-pointer bg-slate-400 m-2 rounded-md py-1 px-2 ${
        isDelete ? '' : 'hover:bg-slate-500'
      }`}
    >
      <button key={tag} onClick={handleClick}>
        {tag}
      </button>
      {isDelete && (
        <div
          className="flex w-fit h-fit items-center justify-center p-1 mx-1 hover:bg-slate-500 rounded-md"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </div>
      )}
    </div>
  )
}
