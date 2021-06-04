import Head from 'next/head'
import React, { ReactNode } from 'react'
import EditorHeader from '../Editor/EditorHeader'
import DashboardHeader from './DashboardHeader'

interface Props {
  pageTitle: string,
  children: ReactNode,
  className?: string,
}

function DashboardWrapper({ children, className, pageTitle }: Props) {
  return (
    <>
      <Head>
        <title>Dashboard - { pageTitle }</title>
      </Head>
      <div className="bg-[#FCFCFC]">
        <DashboardHeader />
        <main className={`${className} min-h-screen py-36 sm:px-8 lg:px-12 max-w-[1900px] mx-auto overflow-hidden`}>
          { children }
        </main>
      </div>
    </>
  )
}

export default DashboardWrapper
