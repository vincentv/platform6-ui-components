/**
 * Storybook addons
 */
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react'
import { withState } from '@dump247/storybook-state'

/**
 * External modules
 */
import React from 'react'
import * as base64 from 'base-64'
import * as classNames from 'classnames'

/**
 * Components
 */
import CodePreview from './typescript/CodePreview'
import PropsLine from './typescript/PropsLine'
import ActionButton from 'action-button'
import CodeEditor from 'code-editor'
import { Tree } from 'tree'
import { KeyValueEditor } from 'key-value-editor'
import { Helper } from 'helpers'

const data = require('./data.json')

/**
 * Readme files
 */
import codeEditorPlayground from './documentation/CodeEditor.md'

/**
 * Styles
 */
import '../public/sass/main'

/**
 * Decorators
 */

/**
 * Wrapping Story inside the decorator
 * @param { () => void } storyFn Method rendering children added to the storybook
 */
const centerDecorator = (storyFn) => (
    <div className='container'>
        {storyFn()}
    </div>
)

const EmptyPreview = ({ children }) => {
    return children
}

/**
 * Styles
 */

// React.CSSProperties
const headerTitle = {
    borderBottom: '1px solid #eee'
}

/**
 * Stories
 */
storiesOf('Components', module)
    .addDecorator(withKnobs)
    .addDecorator(centerDecorator)
    .add('CodeEditor', withState({ codePreview: false }, (store) => {
        const codeEditorData = data.codeEditor
        const mode = select('Mode', codeEditorData.modes, codeEditorData.defaultMode)
        const theme = select('Theme', codeEditorData.themes, codeEditorData.defaultTheme)
        const fontSize = select('Font size', codeEditorData.fontSizes, codeEditorData.defaultFontSize)
        const showInvisibles = boolean('Show invisible characters', false)
        const showGutter = boolean('Show gutter', true)
        const showIndent = boolean('Show indentations', true)
        const wrap = boolean('Wrap', false)
        const readonly = boolean('Readonly', false)

        return <div className='documentation'>
            <h1>CodeEditor</h1>

            <h2>Informations</h2>

            <p>This component is the same one as <span className='bold'>CodeEditorInput</span> except that it is not used in a form. It is mainly used to display readonly content or content that wont be submitted.</p>

            <h2>Usage</h2>

            <table className='full-width mgt-20 mbg-20 text-medium'>
                <tbody>
                    <tr>
                        <td>install</td><td><code>npm install --save code-editor</code></td>
                    </tr>
                    <tr>
                        <td>import</td><td><code>import CodeEditor from 'code-editor'</code></td>
                    </tr>
                </tbody>
            </table>

            <h2>Playground</h2>

            <p>You can change the props with the KNOBS panel.</p>
            <div className='tile code-preview'>
                <i className='fa fa-code mgb-10 text-large source-preview'
                    onClick={e => store.set({ codePreview: !store.state.codePreview })} />
                <div style={{ height: 200 }}>
                    {
                        !store.codePreview ? <CodeEditor value={codeEditorData.value}
                            mode={mode}
                            loadTime={-1}
                            docId='code-editor-playground'
                            readonly={readonly}
                            displaySettings={{
                                theme,
                                fontSize,
                                showInvisibles,
                                showGutter,
                                showIndent,
                                wrap
                            }}
                        /> : <CodePreview name='code-editor-source-preview'
                            mode='typescript'
                            value={`Test`}
                            />
                    }
                </div>
            </div>

            <h2>Props</h2>
            <PropsLine name='docId'
                type='string'
                defaultValue={true}
                required={true}
                description='Unique ID.'
            />
            <PropsLine name='value'
                type='string'
                description='Initial content of the CodeEditor component.'
            />
            <PropsLine name='mode'
                type='string'
                defaultValue='ace/mode/javascript'
                description='A valid Ace Editor mode (language).'
            />
            <PropsLine name='displaySettings'
                type='Settings'
                description={
                    <p>
                        <span>Configuration of your CodeEditor preferences.</span><br />
                        <span>e.g: changing the theme.</span>
                    </p>
                }
            />
            <PropsLine name='readonly'
                type='boolean'
                defaultValue='false'
                description='Whether or not the input is readonly.'
            />
            <PropsLine name='loadTime'
                type='number'
                required={true}
                description='Initial time of when the CodeEditor has loaded in milliseconds. Force the rendering of the component by using an higher value than the preview one.'
            />
            <PropsLine name='resetTick'
                type='number'
                deprecated={true}
                description={
                    <span>Force rendering by changing the value. Will be removed in the net release in favor of <code>loadTime</code> props.</span>
                }
            />
            <PropsLine name='aceSession'
                type='AceSession'
                description='Initial Ace session object of your component.'
            />
            <PropsLine name='saveSession'
                type='(session: AceSession) => void'
                description='Save your ace session after each updated or before unmounting.'
            />
            <PropsLine name='saveContent'
                type='(session: AceSession) => void'
                description={
                    <span>Save your ace session after hitting the shortcut <code>Ctrl + s</code>/<code>Cmd + s</code>.</span>
                }
            />

            <h2>Interfaces</h2>
            <CodePreview id='code-editor-interface'
                mode='typescript'
                value={codeEditorPlayground}
            />
        </div>
    }))
    // .add('Todo', withDocs({PreviewComponent: EmptyPreview })(todoReadme, () => <div></div>))
    // .add('ActionButton', withDocs(actionButtonReadme, () => {
    //     const btnType = select('button type', {
    //         'btn-info': 'info',
    //         'btn-primary': 'primary',
    //         'btn-warning': 'warning',
    //         'btn-danger': 'danger',
    //         'btn-font': 'font',
    //         'btn-default': 'default'
    //     }, 'btn-info')
    //     const colorClass = select('button color', {
    //         '': 'none',
    //         'info-color': 'info',
    //         'primary-color': 'primary',
    //         'warning-color': 'warning',
    //         'danger-color': 'danger',
    //         'font-color': 'font',
    //         'default-color': 'default'
    //     }, '')

    //     return <ActionButton btnClass={classNames(`btn ${btnType} mgt-10`, {
    //         'btn-trans': boolean('transparent button', true)
    //     })}
    //         iconClass={text('iconClass', 'fa-info')}
    //         colorClass={colorClass}
    //         tooltipText={text('tooltipText', 'Click on me')}
    //         disabled={boolean('disabled', false)}
    //         clickAction={action('transparent info button')}
    //     />
    // }))
    // .add('KeyValueEditor', withDocs(keyValueEditorReadme, () => {
    //     const values = {
    //         'first_key': { contentType: 'string', contentBytes: base64.encode('my first key') },
    //         'second_key': { contentType: 'string', contentBytes: base64.encode('my second key') }
    //     }

    //     return <KeyValueEditor id="treeComponentExemple"
    //         handleChange={keyValues => action('handleChange')}
    //         keyValues={values}
    //         locale='en-US'
    //     />
    // }))
    // .add('Tree', withDocs(treeReadme, () => {
    //     return (
    //         <div className='mgt-10'>
    //             <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>Tree</h2>

    //             <p><i className='fa fa-flag-checkered warning-color mgr-5' />Work in progress<i className='fa fa-flag-checkered warning-color mgl-5' /></p>
    //             <p>Tree component has some issues and don't allow others stories to load</p>
    //             {/* <Tree id="treeComponentExemple" data={data.treeData} locale='en-US' /> */}
    //         </div>
    //     )
    // }))
    // .add('KeyValueEditor', () => {
    //     const values = {
    //         'first_key': { contentType: 'string', contentBytes: base64.encode('my first key') },
    //         'second_key': { contentType: 'string', contentBytes: base64.encode('my second key') }
    //     }

    //     return (
    //         <div className='mgt-10'>
    //             <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>KeyValue Editor</h2>
    //             <div className='tile'>
    //                 <KeyValueEditor id="treeComponentExemple" handleChange={keyValues => action('handleChange')} keyValues={values} locale='en-US' />
    //             </div>
    //         </div>
    //     )
    // })
    // .add('Helpers', () => {

    //     return (
    //         <div className='mgt-10'>
    //             <h2 className='mgt-10 mgb-10 padb-10' style={headerTitle}>Helpers</h2>
    //             <p className='italic'><i className='fa fa-info-circle info-color mgr-5' />Helpers are method that are used in others compenents, read the README in order to get more informations.</p>

    //         </div>
    //     )
    // })
