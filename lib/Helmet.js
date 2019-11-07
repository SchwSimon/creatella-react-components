function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet as ReactHelmet } from 'react-helmet';

class Helmet extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      pathname,
      title,
      description,
      image,
      language,
      children
    } = this.props;

    if (pathname !== nextProps.pathname || title !== nextProps.title || description !== nextProps.description || image !== nextProps.image || language !== nextProps.language || children !== nextProps.children) {
      return true;
    }

    return false;
  }

  render() {
    const href = window.location.href;
    const {
      defaultConfig
    } = this.props;
    const {
      title: dcTitle,
      description: dcDescription,
      image: dcImage,
      children: dcChildren,
      type,
      twitterSite,
      siteName,
      fbAppId,
      language: dcLanguage
    } = defaultConfig;
    let {
      title,
      description,
      image,
      children,
      language
    } = this.props;
    title = dcTitle || title;
    description = dcDescription || description;
    image = dcImage || image;
    children = dcChildren || children;
    language = language || dcLanguage;
    return React.createElement(ReactHelmet, null, React.createElement("html", {
      lang: language
    }), React.createElement("title", null, title), React.createElement("link", {
      rel: "canonical",
      href: href
    }), React.createElement("meta", {
      name: "description",
      content: description
    }), React.createElement("meta", {
      itemprop: "name",
      content: title
    }), React.createElement("meta", {
      itemprop: "description",
      content: description
    }), React.createElement("meta", {
      itemprop: "image",
      content: image
    }), React.createElement("meta", {
      name: "twitter:card",
      content: "summary"
    }), React.createElement("meta", {
      name: "twitter:title",
      content: title
    }), React.createElement("meta", {
      name: "twitter:description",
      content: description
    }), React.createElement("meta", {
      name: "twitter:image",
      content: image
    }), twitterSite && React.createElement("meta", {
      name: "twitter:site",
      content: twitterSite
    }), React.createElement("meta", {
      property: "og:description",
      content: description
    }), React.createElement("meta", {
      property: "og:title",
      content: title
    }), React.createElement("meta", {
      property: "og:url",
      content: href
    }), React.createElement("meta", {
      property: "og:image",
      content: image
    }), React.createElement("meta", {
      property: "og:type",
      content: type
    }), siteName && React.createElement("meta", {
      property: "og:site_name",
      content: siteName
    }), fbAppId && React.createElement("meta", {
      property: "fb:app_id",
      content: fbAppId
    }), children);
  }

}

_defineProperty(Helmet, "propTypes", {
  pathname: PropTypes.string.isRequired,
  defaultConfig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    twitterSite: PropTypes.string,
    siteName: PropTypes.string,
    fbAppId: PropTypes.string
  }).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  children: PropTypes.any
});

function mapStateToProps({
  helmet,
  i18n
}) {
  return { ...helmet,
    language: i18n ? i18n.language : ''
  };
}

export default connect(mapStateToProps)(Helmet);