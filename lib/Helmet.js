function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet as ReactHelmet } from 'react-helmet';

class Helmet extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      location,
      title,
      description,
      image,
      children
    } = this.props;
    const {
      pathname
    } = location;

    if (pathname !== nextProps.location.pathname || title !== nextProps.title || description !== nextProps.description || image !== nextProps.image || children !== nextProps.children) {
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
      siteName
    } = defaultConfig;
    let {
      title,
      description,
      image,
      children
    } = this.props;
    title = dcTitle || title;
    description = dcDescription || description;
    image = dcImage || image;
    children = dcChildren || children;
    return React.createElement(ReactHelmet, null, React.createElement("title", null, title), React.createElement("link", {
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
    }), children);
  }

}

_defineProperty(Helmet, "propTypes", {
  defaultConfig: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  twitterSite: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  children: PropTypes.any
});

function mapStateToProps({
  helmet
}) {
  return { ...helmet
  };
}

export default withRouter(connect(mapStateToProps)(Helmet));