# 贡献代码

我们欢迎你为jsPsych贡献代码！源代码通过GitHub仓库进行管理。

## 修改代码的步骤

#### 就修改进行讨论

如果你认为代码某处应该如何如何修改，例如添加新特性或者修复bug，请[在GitHub上开一个新的issue](https://github.com/jspsych/jsPsych/issues/new)，并描述这一修改是什么、它给现有的代码增加了什么功能、修复了什么问题。如果想要给jsPsych开发新的插件，我们推荐你发布该插件的具体使用用例并说明它的不同使用场景（更多内容参见下面的“开发新插件”部分）。

如果你想要对代码进行修改，但是具体如何实现还没有想好，可以先在[GitHub Discussions](https://github.com/jspsych/jsPsych/discussions)中进行讨论，这有助于分享代码和获得反馈。

#### Fork并修改代码

对源代码修改时，你应该先从GitHub上fork一份jsPsych的代码，然后在fork的代码上进行修改。在分支上对代码进行修改是一个很好的习惯，这样你可以把当前所做的修改和其他无关的修改区分开来。

#### 提交pull request

完成修改，你可以提交pull request，将你所做的修改合并到仓库的```master```分支。项目团队会对pull request进行审核。

## 开发新插件

我们欢迎你为jsPsych开发新插件。你可以独立发布插件，也可以按照上述步骤、通过提交pull request把你开发的插件添加到GitHub仓库中。如果你想要把自己开发的插件添加到jsPsych库当中，请遵循以下几点要求：

#### 插件应尽可能灵活

插件越灵活越好用，所以请避免把可以设置为变量的参数值写成固定值。如果你的插件会在屏幕上呈现文字，这一点显得格外重要，因为你需要考虑到不同语言背景的使用者。

#### 适时地使用jsPsych.pluginAPI模块

[pluginAPI模块](../core_library/jspsych-pluginAPI.md)包含了与插件开发相关的函数。在开发过程中，不要重复造轮子，对于已经在库中的函数不要再去进行重复，而是尽可能使用pluginAPI。如果你就改进pluginAPI中的方法有建议，那么请提交pull request对其作出修改。

#### 为插件制作说明文档

提交pull request的时候，不要忘了同时提交一份说明文档，这份说明文档要和其他的文档页样式相同。文档文件在```docs```文件夹下。

#### 添加使用样例

你需要编写一个简短的示例HTML文件，该文件会被放在```examples```文件夹下。样例文件应该尽可能清晰地说明当前插件的基本功能。

#### 添加测试文件

jsPsych通过[Jest](https://facebook.github.io/jest/)进行自动化的代码测试。进行测试需要安装Node和npm。在jsPsych根路径下运行```npm install```，然后运行```npm test```。插件应该配有一个测试文件，该文件可以用来验证插件的各参数是否有效。具体示例参见```/tests/plugins```文件夹。