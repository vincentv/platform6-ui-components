// Modules
import * as React from 'react'
import { WrappedFieldProps, Field, BaseFieldProps } from 'redux-form'

// Components
import Textarea from './components/Textarea'

/**
 * Textarea input used on a [redux-form](#reduxform).
 */
namespace TextareaInput {
    export interface Props extends BaseFieldProps {
        /** Input's name used when submitting form. */
        name: string;
        /** Input's label. */
        label?: string | JSX.Element;
        /**
         * Input rows numbers.
         * @default 2
         */
        rows?: number;
        /**
         * Whether or not the input is disabled.
         * @default false
         */
        disabled?: boolean;
        /** Tooltip text displayed when hovering <span className='quote'>?</span> icon. */
        help?: string;
        /** CSS class wrapping the component. */
        containerClass?: string;
        /** CSS class applied to every input from the list. */
        inputClass?: string;
        /**
         * Remove the bottom margin which is the default height of the error message
         * displayed when input is invalid.
         * @default false
         */
        collapseErrorSpace?: boolean;

        /** Hide props from documentation */

        /** redux-form props */

        /** @ignore */
        component?: any,
        /** @ignore */
        format?: any,
        /** @ignore */
        normalize?: any,
        /** @ignore */
        props?: any,
        /** @ignore */
        parse?: any,
        /** @ignore */
        validate?: any,
        /** @ignore */
        warn?: any,
        /** @ignore */
        withRef?: any
    }

    export interface State {

    }
}

function TextareaInput( props: TextareaInput.Props ) {

    const {
        name,
        label,
        disabled,
        help,
        containerClass,
        inputClass,
        collapseErrorSpace,
        rows,
        format,
        normalize,
        parse,
        validate,
        warn
    } = props

    const renderTextarea = ( field: WrappedFieldProps ) => {
        return <Textarea name={name}
            label={label}
            rows={rows}
            disabled={disabled}
            help={help}
            containerClass={containerClass}
            inputClass={inputClass}
            collapseErrorSpace={collapseErrorSpace}
            field={field}
        />
    }

    const baseFieldProps: BaseFieldProps = {
        name,
        format,
        normalize,
        parse,
        validate,
        warn
    }

    return <Field {...baseFieldProps} component={renderTextarea} />

}

export default TextareaInput