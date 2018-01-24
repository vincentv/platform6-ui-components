const path = require('path');
const changeCase = require('change-case');

module.exports = {

    title: 'b2-common-components',

    assetsDir: 'public/',

    require: [
        path.resolve(__dirname, 'public/sass/main.scss')
    ],

    resolver: require('react-docgen').resolver.findExportedComponentDefinition,

    getComponentPathLine(componentPath) {
        const type = componentPath.split('/')[0]
        const componentName = componentPath.split('/')[1]
        const name = changeCase.pascalCase(componentName)
        const dir = componentName

        return type === 'components' ? `import ${name} from '${dir}';` : null
    },

    template: path.resolve(__dirname, './public/index.html'),
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
    webpackConfig: require('./webpack.config.js'),

    // Will be remove when editorConfig.theme property is fixed for all theme except default one 
    highlightTheme: 'tomorrow-night-eighties',

    // editorConfig: {
    //     theme: 'base16-light' // should be tomorrow-night-eighties, but not working for now
    // },

    theme: {
        color: {
            sidebarBackground: '#F0F3F3'
        },
        sidebarWidth: 300
    },

    showUsage: true,
    showCode: true,

    ignore: ['**/node_modules/**/*.*'],

    skipComponentsWithoutExample: true,

    sections: [
        {
            name: 'Introduction',
            content: 'readme/Introduction.md'
        },
        {
            name: 'Components',
            description: 'All the components provided by platform-6',
            components: 'components/**/*.tsx'
        },
        {
            name: 'Interfaces',
            description: 'Interfaces used by b2-common-components',
            sections: [
                {
                    name: 'AceSession',
                    content: 'readme/AceSession.md'
                },
                {
                    name: 'FileWrapper',
                    content: 'readme/FileWrapper.md'
                },
                {
                    name: 'KeyValDef',
                    content: 'readme/KeyValDef.md'
                },
                {
                    name: 'TreeNodeDataModel',
                    content: 'readme/TreeNodeDataModel.md'
                },
                {
                    name: 'TreeNodeModel',
                    content: 'readme/TreeNodeModel.md'
                },
                {
                    name: 'Test ActionButton',
                    components: 'examples/ActionButton/index.tsx'
                }
            ]
        },
        {
            name: 'Utils',
            description: 'Utils used by b2-common-components',
            showCode: false,
            sections: [
                {
                    name: 'Helpers',
                    content: 'readme/Helpers.md',
                }
            ]
        },
        {
            name: 'Todo',
            description: 'Todo list of what\'s left to be done',
            content: 'readme/Todo.md'
        }
    ]
}