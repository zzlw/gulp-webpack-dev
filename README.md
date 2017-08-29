

为了支持类似fis的`__inline`和`__sprite`语法（base64和雪碧图），对依赖包`gulp-css-base64`和`gulp-css-spriter`都做了修改，所以暂时保留在node_modules中。你可以不必再下载这两个包。

安装依赖包：
`npm install`

开发：
`gulp dev`

发布：
`gulp`

**注意：**
该demo项目15年构建，当时还是采用1.0版本的webpack。现在webpack已经更新到2.0+，更多新功能和修改请参考[官网](https://webpack.js.org/)。

Update:
2017.2.24 -- devtool: 'source-map' 改为 '#source-map'， 兼容新版Chrome规则。
