import React from "react";
import { string } from "prop-types";
import * as config from "./../constants/config";
import { Helmet } from "react-helmet";

const Head = props => {
  let theTitle = props.title
    ? props.title + config.DEFAULT_SEP + config.DEFAULT_TITLE
    : config.DEFAULT_TITLE;
  const theDescription = props.description
    ? props.description
    : config.DEFAULT_DESCRIPTION;
  const theImage = props.image
    ? `${props.image}`
    : config.DEFAULT_SITEURL + config.DEFAULT_IMAGE;
  const theUrl = props.url
    ? config.DEFAULT_SITEURL + props.url
    : config.DEFAULT_SITEURL;
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
      />
      <title>{theTitle}</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content={theDescription} />
      <link rel="icon" sizes="192x192" href={config.DEFAULT_FAVICON} />
      <link rel="apple-touch-icon" href={config.DEFAULT_FAVICON} />
      <link rel="shortcut icon" href={config.DEFAULT_FAVICON} />
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={theUrl} />
      <meta property="og:site_name" content={config.DEFAULT_TITLE} />
      <meta property="og:title" content={theTitle} />
      <meta property="og:image" content={theImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:description" content={theDescription} />
      <meta name="twitter:site" content={theUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={theImage} />
    </Helmet>
  );
};

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  image: string
};

export default Head;
