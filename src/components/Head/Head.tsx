// @ts-nocheck

import { Helmet } from "react-helmet-async";

type HeadProps = {
  title: string
};

export const Head = ({ title = ""}: HeadProps) => {
  return (
    <Helmet title={title ? `${title} | Invoicify` : undefined} defaultTitle="Invoicify">      
        <meta name="description" content="Invoice app for web developers" />
    </Helmet>
  );
};
