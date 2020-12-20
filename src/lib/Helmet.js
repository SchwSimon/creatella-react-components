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
            language: PropTypes.string.isRequired,
            twitterCard: PropTypes.string.isRequired,
            twitterSite: PropTypes.string,
            siteName: PropTypes.string,
            fbAppId: PropTypes.string
        }).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        extraTags: PropTypes.array
    }

    shouldComponentUpdate(nextProps) {
        const { pathname, title, description, image, language, extraTags } = this.props;

        if (pathname !== nextProps.pathname ||
            title !== nextProps.title ||
            description !== nextProps.description ||
            image !== nextProps.image ||
            language !== nextProps.language ||
            extraTags !== nextProps.extraTags) {
            return true;
        }

        return false;
    }

    render() {
        const href = window.location.href;
        const { defaultConfig } = this.props;
        const {
            title: dcTitle, description: dcDescription, image: dcImage,
            type, twitterSite, twitterCard, siteName, fbAppId, language: dcLanguage
        } = defaultConfig;

        let { title, description, image, language, extraTags } = this.props;

        title = title || dcTitle;
        description = description || dcDescription;
        image = image || dcImage;
        language = language || dcLanguage;

        return (
            <ReactHelmet>
                <html lang={language} />

                <title>
                    {title}
                </title>

                <link rel='canonical' href={href} />
                <meta name='description' content={description} />

                <meta itemProp='name' content={title} />
                <meta itemProp='description' content={description} />
                <meta itemProp='image' content={image} />

                <meta name='twitter:card' content={twitterCard} />
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

                {extraTags}
            </ReactHelmet>
        );
    }
}

function mapStateToProps({ helmet, i18n }) {
    return {
        ...helmet,
        language: i18n ? i18n.language : ''
    };
}

export default connect(mapStateToProps)(Helmet);
