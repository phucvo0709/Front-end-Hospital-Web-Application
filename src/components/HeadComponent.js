import React from "react";
import * as config from "../constants/config";
import { Helmet } from "react-helmet";

function HeadComponent() {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
      />
      <title>{config.DEFAULT_TITLE}</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content={config.DEFAULT_DESCRIPTION} />
      <link rel="icon" sizes="192x192" href={config.DEFAULT_FAVICON} />
      <link rel="apple-touch-icon" href={config.DEFAULT_FAVICON} />
      <link rel="shortcut icon" href={config.DEFAULT_FAVICON} />
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.DEFAULT_SITEURL} />
      <meta property="og:site_name" content={config.DEFAULT_TITLE} />
      <meta property="og:title" content={config.DEFAULT_TITLE} />
      <meta
        property="og:image"
        content={config.DEFAULT_SITEURL + config.DEFAULT_IMAGE}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:description" content={config.DEFAULT_DESCRIPTION} />
      <meta name="twitter:site" content={config.DEFAULT_SITEURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={config.DEFAULT_SITEURL + config.DEFAULT_IMAGE}
      />
    </Helmet>
  );
}

export default HeadComponent;
