import * as React from 'react'
import * as ReactDOM from 'react-dom'

//modules
import * as uuid from 'uuid'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

//components
import Help from '@amalto/help'

//utils
import * as classNames from 'classnames'

namespace TextInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /** Input's placeholder. */
        placeholder?: string;
        /** Disable input. */
        disabled?: boolean;
        /** Tooltip text displayed when hovering "?" icon. */
        help?: string;
        /** CheckboxInput group CSS class. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /** Input's type. */
        type?: string;
        /** Focus the input after being loaded. */
        autofocus?: boolean;
        /** Randomize input value as a uuid.v1() string. */
        randomGenerator?: boolean;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         */
        collapseErrorSpace?: boolean;

        /** Hide props from documentation */

        /** @ignore */
        children?: React.ReactNode;
        /** @ignore */
        key?: React.ReactText;
        /** @ignore */
        ref?: React.Ref<TextInput>;
    }

    export interface State {

    }
}

class TextInput extends React.Component<TextInput.Props, TextInput.State> {

    constructor( props: TextInput.Props ) {
        super( props )
        this.state = {

        }
    }

    private renderText = ( field: WrappedFieldProps<any> ) => {

        const { label, disabled, autofocus, help, containerClass, inputClass, type, randomGenerator, placeholder, collapseErrorSpace } = this.props

        const { input, meta } = field

        return (
            <div className={classNames( 'form-group', containerClass, {
                'invalid': meta.touched && !!meta.error
            } )}>

                {label ? <label>{label}{help && <Help text={help} />}</label> : null}

                <input
                    {...input as any}
                    type={type || 'text'}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoFocus={autofocus}
                    className={classNames( 'form-control input-block', inputClass, {
                        'btn-prefix': randomGenerator
                    } )} />

                {
                    randomGenerator ? (
                        <button type="button" className="btn btn-info input-suffix" onClick={e => this.generateClientSecret( field )}>
                            <span className="fa fa-random"></span>
                        </button>
                    ) : null
                }

                {( meta.touched && !!meta.error ) ? <p className="validation-error-message">{meta.error}</p> : ( collapseErrorSpace ? null : <p className="validation-error-message">&nbsp;</p> )}

            </div>
        )
    }

    render() {

        const { name, label, format, normalize, parse, validate, warn } = this.props

        let baseFieldProps: BaseFieldProps = {
            name,
            format,
            normalize,
            parse,
            validate,
            warn
        }

        return <Field {...baseFieldProps} component={this.renderText} />

    }

    private generateClientSecret = ( field: WrappedFieldProps<any> ) => {
        field.input.onChange( uuid.v1(), undefined, undefined )
    }

}


export default TextInput