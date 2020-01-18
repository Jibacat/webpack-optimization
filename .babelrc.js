module.exports = {
    "plugins": [
        [
            "@babel/plugin-transform-runtime",  // 
            {
                "corejs": false, // 默认值，可以不写
                "helpers": true, // 默认，可以不写。babel 在每个需要的文件的顶部都会插入一些 helpers 代码，这可能会导致多个文件都会有重复的 helpers 代码。 @babel/plugin-transform-runtime 的 helpers 选项就可以把这些模块抽离出来，避免async函数被重复引入。
                "regenerator": false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
                "useESModules": true, // 使用 es modules helpers, 减少 commonJS 语法代码
            }
        ]
    ],
    presets: [
        [
            "@babel/preset-env", // polyfill成env版本的es
            {
                "modules": false, // 模块使用 es modules ，不使用 commonJS 规范 
                "useBuiltIns": 'usage', // 默认 false, 可选 entry , usage
                "targets": {
                    "esmodules": true // 低版本浏览器，使用usage方案按需 transform + polyfill 的代码，如果是较新浏览器，就不进行任何的语法转换和 polyfill 
                }
            }
        ], "@babel/preset-react"
    ]
}