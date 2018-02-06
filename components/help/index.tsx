import * as React from 'react'


import * as classNames from 'classnames'

/**
 * This component is generally used next to input's label. See [RadioInput](http://localhost:6060/#radioinput)
 */
namespace Help {
    export interface Props extends React.Props<Help> {
        /** CSS class. */
        containerClass?: string;
        /** CSS properties. */
        style?: React.CSSProperties;
        /** Content of the help tooltip. */
        text: string

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<Help>;
    }
}


class Help extends React.Component<Help.Props, any> {

    private _helpPopup = HTMLSpanElement = null

    render() {
        return (
            <span className={
                classNames(
                    'fa fa-fw fa-question-circle default-color',
                    this.props.containerClass
                )
            }
                data-content={this.props.text}
                ref={ref => this._helpPopup = ref}
                style={this.props.style}
            >
            </span>
        )
    }

    componentDidMount() {
        $( this._helpPopup ).popover(
            {
                container: 'body',
                trigger: 'hover',
                html: true
            }
        )
    }

    componentWillUnmount() {
        $( this._helpPopup ).popover( 'destroy' )
    }
}

export default Help