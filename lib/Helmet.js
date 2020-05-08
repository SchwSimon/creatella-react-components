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
      extraTags
    } = this.props;

    if (pathname !== nextProps.pathname || title !== nextProps.title || description !== nextProps.description || image !== nextProps.image || language !== nextProps.language || extraTags !== nextProps.extraTags) {
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
      language,
      extraTags
    } = this.props;
    title = dcTitle || title;
    description = dcDescription || description;
    image = dcImage || image;
    language = language || dcLanguage;
    return /*#__PURE__*/React.createElement(ReactHelmet, null, /*#__PURE__*/React.createElement("html", {
      lang: language
    }), /*#__PURE__*/React.createElement("title", null, title), /*#__PURE__*/React.createElement("link", {
      rel: "canonical",
      href: href
    }), /*#__PURE__*/React.createElement("meta", {
      name: "description",
      content: description
    }), /*#__PURE__*/React.createElement("meta", {
      itemprop: "name",
      content: title
    }), /*#__PURE__*/React.createElement("meta", {
      itemprop: "description",
      content: description
    }), /*#__PURE__*/React.createElement("meta", {
      itemprop: "image",
      content: image
    }), /*#__PURE__*/React.createElement("meta", {
      name: "twitter:card",
      content: "summary"
    }), /*#__PURE__*/React.createElement("meta", {
      name: "twitter:title",
      content: title
    }), /*#__PURE__*/React.createElement("meta", {
      name: "twitter:description",
      content: description
    }), /*#__PURE__*/React.createElement("meta", {
      name: "twitter:image",
      content: image
    }), twitterSite && /*#__PURE__*/React.createElement("meta", {
      name: "twitter:site",
      content: twitterSite
    }), /*#__PURE__*/React.createElement("meta", {
      property: "og:description",
      content: description
    }), /*#__PURE__*/React.createElement("meta", {
      property: "og:title",
      content: title
    }), /*#__PURE__*/React.createElement("meta", {
      property: "og:url",
      content: href
    }), /*#__PURE__*/React.createElement("meta", {
      property: "og:image",
      content: image
    }), /*#__PURE__*/React.createElement("meta", {
      property: "og:type",
      content: type
    }), siteName && /*#__PURE__*/React.createElement("meta", {
      property: "og:site_name",
      content: siteName
    }), fbAppId && /*#__PURE__*/React.createElement("meta", {
      property: "fb:app_id",
      content: fbAppId
    }), extraTags);
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
  extraTags: PropTypes.array
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