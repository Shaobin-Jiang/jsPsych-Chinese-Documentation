# 贡献代码

我们欢迎你为jsPsych贡献代码，包括对核心部分进行修改、开发新插件和扩展、以及改进文档等。

项目通过[GitHub](https://github.com/jspsych/jsPsych)管理，我们可以：

* 使用[discussions](https://github.com/jspsych/jsPsych/discussions)去提出想法，比如说新插件，并寻求他人的反馈
* 使用[issues](https://github.com/jspsych/jsPsych/issues)提出一些具有操作性的建议，例如修改文档，代码中有bug，明确的新特性，等等.
* 提交[pull request](https://github.com/jspsych/jsPsych/pulls)来对代码进行修改。pr会由团队进行review。

## 贡献代码指南

### 代码

我们欢迎任何类型的代码贡献。在我们将修改的内容merge到代码当中前，还有几点要求。需要说明的是，你也可以不做这些事情，但这样做可以让我们更快地去处理你贡献的代码。

* **代码需要经过我们的自动化测试系统测试。**我们使用[Jest](https://jestjs.io/)进行测试。如果你是在修复bug，可以考虑加入一个测试用例，以显示bug已被修复。如果你是在添加新特性，比如说新插件，可以附上测试套件。关于配置测试工具和编写测试，详见[jsPsych的测试](configuration.md#_4)。

* **更新相关文档。**对`/docs`中需要更新的文档进行更新。如果需要新的文档页，则创建新文档。例如，如果你编写了一个新插件，则需要为插件编写文档，并更新[插件列表](https://github.com/jspsych/jsPsych/blob/main/docs/plugins/list-of-plugins.md)和[mkdocs配置文件](https://github.com/jspsych/jsPsych/blob/main/mkdocs.yml)。

* **如果可行的话，附上使用用例。**如果你是在添加新特性、编写新插件或新扩展，或对框架的某些行为造成了巨大的改变，请在`/examples`文件夹内加入使用用例。

* **在pr中加入changeset**。我们使用[changesets](https://github.com/atlassian/changesets/blob/main/docs/adding-a-changeset.md)生成新的release。[这篇关于changeset的介绍](https://github.com/atlassian/changesets/blob/main/docs/adding-a-changeset.md)说明了如何在pr中加入changeset。如果需要帮助，请随意提问。

* **更新contributors.md文件**。如果你是第一次给jsPsych贡献代码，请将你的名字添加到我们的[contributors文件](https://github.com/jspsych/jsPsych/blob/main/contributors.md)。以及，十分感谢！


### 文档

我们非常欢迎对文档的各种贡献，从修复语言上的错误到添加一个新的教程。此网站上出现的所有文档都包含在仓库的[`/docs` 文件夹](https://github.com/jspsych/jsPsych/tree/main/docs)中。该文档使用 [MkDocs](https://www.mkdocs.org/)创建，并使用[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)添加主题。你可以编辑其中的markdown文件并提交pr来修改文档。

如果你想在本地测试对文档所做的更改，需要安装[MkDocs](https://www.mkdocs.org/user-guide/installation/)和[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/getting-started/#installation)。然后，你可以在仓库的根目录中运行`mike serve`，这样就可以通过本地服务器查看文档。

## 贡献代码： `jspsych` vs. `jspsych-contrib`

如果你正在开发新的插件或扩展，可以为两个不同的仓库贡献代码：[`jspsych`](https://github.com/jspsych/jsPsych)或[`jspsych-contrib`](https://github.com/jspsych/jspsych-contrib)。

`jspsych`仓库用于可能被广泛使用的新插件和扩展。这个仓库中的代码需要有完备的文档以及经过充分的测试，且必须使用TypeScript。对该仓库贡献代码是受限的，因为一旦在其中加入了新插件或扩展，在后续版本中就需要对其进行更新。因而，每个新插件和扩展都可能增加我们未来的工作量，所以我们难免对这个仓库中加入的内容有所挑剔。如果你有想法想要讨论，可以开一个[discussion](https://github.com/jspsych/jsPsych/discussions/new)，我们很乐意就这些想法展开讨论！

`jspsych-contrib`仓库则欢迎你贡献任何完整且能正常工作的代码，不过仍然需要提供一些基本的文档。贡献者可以选择是使用我们提供的 [TypeScript 模板](https://github.com/jspsych/jspsych-contrib/tree/main/packages/plugin-template-ts)或[JavaScript 模板](https://github.com/jspsych/jspsych-contrib/tree/main/packages/plugin-template) 来开发插件或扩展。我们不会对`jspsych-contrib`中的代码像`jspsych`中一样评估其价值。每隔一段时间，我们还会根据其受欢迎程度和完整性（文档和测试）考虑是否将代码从`jspsych-contrib`移入`jspsych`仓库。