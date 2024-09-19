import { PropsWithChildren } from 'react'
import localFont from 'next/font/local'

const geistSans = localFont({
  src: '../../pages/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../../pages/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} h-screen mx-auto`}
    >
      {children}
    </div>
  )
}
