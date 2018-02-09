import * as React from 'react';
import { reduxForm } from 'redux-form';

import test from 'ava';
import * as sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';

import CodeEditorInput from '../build/index.js';

configure({ adapter: new Adapter() });

test.beforeEach('CodeEditorInput component should exist', t => {
    const ExistCodeEditorInput = reduxForm({
        form: 'form-code-editor-input-exist',
        enableReinitialize: true
    })(CodeEditorInput);
    const wrapper = shallow(
        <ExistCodeEditorInput name='code-editor-input-exist' />
    );

    t.true(wrapper.exists());
});

test('CodeEditorInput props should be defined', t => {
    const ExampleCodeEditorInput = reduxForm({
        form: 'form-code-editor-input-example',
        enableReinitialize: true
    })(CodeEditorInput);
    const saveEditorContent = (session) => {
        // Handle save by shortcut keyboard
    };
    const saveSession = (session) => {
        // Handle save by update
    };
    const wrapper = shallow(
        <ExampleCodeEditorInput name='code-editor-input-example'
            label='CodeEditorInput example'
            readonly={false}
            help='CodeEditorInput help'
            containerClass=''
            inputClass=''
            mode='ace/mode/javascript'
            height={300}
            initSession={null}
            saveEditorContent={saveEditorContent}
            saveSession={saveSession}
            displaySettings={{}}
            resetTick={0}
            user={null}
        />
    );

    t.is(wrapper.props('name'), 'code-editor-input-example');
    t.is(wrapper.props('label'), 'CodeEditorInput example');
    t.is(wrapper.props('help'), 'CodeEditorInput help');
    t.is(wrapper.props('mode'), 'ace/mode/javascript');
    t.is(wrapper.props('height'), 300);
    t.is(wrapper.props('initSession'), null);
    t.deepEqual(wrapper.props('displaySettings'), {});
    t.is(wrapper.props('resetTick'), 0);
    t.is(wrapper.props('user'), null);
});