import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet as ReactHelmet } from 'react-helmet';

class Helmet extends Component {
    static propTypes = {
        pathname: PropTypes.string.isRequired,
        defaultConfig: PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            twitterSite: PropTypes.string,
            siteName: PropTypes.string,
            fbAppId: PropTypes.string
        }).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        children: PropTypes.any
    }

    shouldComponentUpdate(nextProps) {
        const { pathname, title, description, image, children } = this.props;

        if (pathname !== nextProps.pathname ||
            title !== nextProps.title ||
            description !== nextProps.description ||
            image !== nextProps.image ||
            children !== nextProps.children) {
            return true;
        }

        return false;
    }

    render() {
        const href = window.location.href;
        const { defaultConfig } = this.props;
        const {
            title: dcTitle, description: dcDescription, image: dcImage, children: dcChildren,
            type, twitterSite, siteName, fbAppId
        } = defaultConfig;
        let { title, description, image, children } = this.props;

        title = dcTitle || title;
        description = dcDescription || description;
        image = dcImage || image;
        children = dcChildren || children;

        return (
            <ReactHelmet>
                <title>{title}</title>

                <link rel='canonical' href={href} />
                <meta name='description' content={description} />

                <meta itemprop='name' content={title} />
                <meta itemprop='description' content={description} />
                <meta itemprop='image' content={image} />

                <meta name='twitter:card' content='summary' />
                <meta name='twitter:title' content={title} />
                <meta name='twitter:description' content={description} />
                <meta name='twitter:image' content={image} />

                {twitterSite && (
                    <meta name='twitter:site' content={twitterSite} />
                )}

                <meta property='og:description' content={description} />
                <meta property='og:title' content={title} />
                <meta property='og:url' content={href} />
                <meta property='og:image' content={image} />
                <meta property='og:type' content={type} />

                {siteName && (
                    <meta property='og:site_name' content={siteName} />
                )}

                {fbAppId && (
                    <meta property='fb:app_id' content={fbAppId} />
                )}

                {children}
            </ReactHelmet>
        );
    }
}

function mapStateToProps({ helmet }) {
    return {
        ...helmet
    };
}

export default connect(mapStateToProps)(Helmet);
