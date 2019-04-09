import * as React from 'react'
import * as classNames from 'classnames'

import Brand from './components/Brand'
import Burger from './components/Burger'

/**
 * Customisable HeaderBar.
 */
module HeaderBar {

    export interface Props extends React.Props<HeaderBar> {

        /** HeaderBar css */
        mainCss?: string;

        /** HeaderBar style */
        mainStyle?: React.CSSProperties;

        /** Background color */
        backgroundColor: string;

        /** Dimension */
        height?: number | string;

        /** Brand logo source */
        imgSrc: string;

        /** Redirect url */
        url: string;

        /** Burger click action */
        burgerAction: () => void;

        /** Header content */
        children?: JSX.Element;

        /** Hide props from documentation */

        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<HeaderBar>;
    }
}

class HeaderBar extends React.Component<HeaderBar.Props, any> {
    constructor( props: HeaderBar.Props ) {
        super( props )
    }

    render() {
        const { mainCss, mainStyle, backgroundColor, height, imgSrc, url, burgerAction } = this.props

        return (
            <header className={mainCss} style={{
                height,
                backgroundColor,
                position: 'fixed',
                zIndex: 200,
                ...mainStyle,
            }}>
                <Brand backgroundColor={backgroundColor} imgSrc={imgSrc} url={url} />
                <Burger burgerAction={burgerAction} />
                {this.props.children}
            </header>
        )
    }
}


export default HeaderBar
