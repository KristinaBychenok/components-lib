import { PropsWithChildren } from 'react'
import localFont from 'next/font/local'
import Head from 'next/head'

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
    <>
      <Head>
        <title>Components Library</title>
        <meta name="description" content="Library with components" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className={`${geistSans.variable} ${geistMono.variable} h-screen mx-auto`}
      >
        {children}
      </div>
    </>
  )
}
