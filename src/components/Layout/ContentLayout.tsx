import React from 'react'
import { Head } from '../Head/Head'


type ContentLayoutProps = {
    children: React.ReactNode;
    title: string;
};

export const ContentLayout = ({
        children,
        title,
    }: ContentLayoutProps) => {
  return (
    <>
        <Head title={title}/>
        <div className="py-6">
        <div className="max-w-none md:max-w-7xl mx-auto px-0  md:px-8">{children}</div>
      </div>
    </>
  )
}
