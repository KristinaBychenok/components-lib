import { PropsWithChildren } from 'react'

export const ComponentsWrapper = ({
  children,
  name,
}: PropsWithChildren<{ name: string }>) => {
  return (
    <div className="flex flex-col h-fit m-6">
      <p className="text-3xl text-center py-3">{name}</p>
      {children}
    </div>
  )
}
