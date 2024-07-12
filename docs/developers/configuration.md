# 配置jsPsych开发环境

## 环境搭建

JsPsych使用[TypeScript](https://www.typescriptlang.org/)编写，该语言是JavaScript的超集，引入了静态类型，在经过编译后会生成JavaScript代码。TypeScript编译器自身是由JavaScript编写的，可以使用[Node.js](https://nodejs.org/en/)（不适用浏览器运行JavaScript的运行时）。
Node.js自带一个名为NPM (Node Package Manager)的包管理器，可以安装JavaScript包，例如TypeScript和jsPsych的一些构建工具。如果要使用jsPsych或jspsych-contrib仓库中的代码，最后按照下面的步骤搭建开发环境。

### 安装Node.js

jsPsych开发环境需要安装v14以上的Node.js。我们推荐[安装 v16](https://nodejs.org/en/)，因为它使用v7的NPM （这对于jsPsych仓库使用的工作空间是必需的条件）。如果一定要使用v14版本，则需要手动安装v7版本的NPM  (通过 `npm install -g npm@7`)。

### 将仓库clone下来并安装依赖

在终端中运行下面的命令clone jsPsych或jspsych-contrib仓库。

```sh
git clone https://github.com/jspsych/jsPsych.git && cd jsPsych
```

或

```sh
git clone https://github.com/jspsych/jspsych-contrib.git && cd jspsych-contrib
```

然后运行`npm install`。此时，会自动创建一个`node_modules`文件夹，并将依赖安装到该文件夹中。

!!!attention "注意"
    请只在仓库的根目录下运行`npm install` (这是由NPM工作空间特性决定的)。如果不小心在别的地方运行了`npm install`，把那个路径下的`node_modules`文件夹和生成的`package-lock.json`文件删掉，然后再根目录重新运行`npm install`。

!!!info "补充"
    如果在jsPsych仓库中运行`npm install`，会为仓库中所有的包进行构建，可能会花上劫难中。如果想要在这段时间内找些事情做，不妨继续读下面的部分

## 仓库结构

Node.js包中包含了一个用来描述的`package.json`文件，该文件列出了包的依赖项。jsPsych和jspsych-contrib仓库用到了NPM *工作空间* 。这意味着在根目录下运行`npm install`会为`packages`路径下的包安装依赖。核心的jsPsych库和每一个插件、扩展都是一个单独的包，这些包被发布在了[NPM](https://www.npmjs.com/)，可以通过NPM下载或通过CDN (例如[unpkg](https://unpkg.com/))使用。

## 构建工具链

JsPsych用到了一套构建工具链 (见`@jspsych/config`)，可以通过`npm run build`运行。工具链会读取包的内容 (从`src/index.ts`文件开始)，并在报的`dist`目录下生成下列内容：

* **`index.js`**
  该文件包含来自 `index.ts` 的所有内容，但是编译成了JavaScript并打包到了单个文件中（即不对同一包中的内容使用`import`）。它被 [webpack](https://webpack.js.org/) 等打包程序使用。

* **`index.cjs`**
  类似于 `index.js`，但使用旧的 CommonJS 标准来支持向后兼容的工具，例如 [Jest](https://jestjs.io/) 测试框架。

* **`index.browser.js`**
  这个文件和 `index.js` 一样，将整个包打包为JavaScript，但封装在一个函数中，以便浏览器可以使用 `<script>` 标签直接包含它。对于插件或扩展，模块的默认导出内容（即 `index.ts` 文件中 `export default` 之后的任何语句）被赋值给一个全局变量。这个全局变量的名称在包的 `rollup.config.mjs` 文件中指定，也是 `makeRollupConfig()` 函数的参数。比如说，如果在`plugin-html-keyboard-response` 包中加入 `index.browser.js` 文件，则会将 `HtmlKeyboardResponsePlugin` 类赋值给全局变量`jsPsychHtmlKeyboardResponse`。`index.browser.js` 中的代码看起来与 `index.ts` 代码非常相似，且浏览器完全支持，因此`examples`目录中的所有示例都使用了`index.browser.js`文件，这样用户就可以直接修改源代码，无需重新运行构建链。

* **`index.browser.min.js`**
  JavaScript 语言规范有不同版本，并非所有浏览器和浏览器版本都支持所有的特性。因此，jsPsych构建链使用[Babel](https://babeljs.io/)将源文件转换为兼容大多数浏览器的代码。这一操作会生成`index.browser.min.js`，其功能类似于 `index.browser.js`，但对于旧浏览器不支持的特性，会对该部分的JavaScript代码进行替换。此外，`index.browser.min.js` 中的代码也通过[Terser](https://terser.org/)压缩，以提高加载速度。

* **`*.js.map`**
  在浏览器中调试代码时（尤其是 `index.browser.min.js`，因为使用了Terser和Babel导致其可读性很差），需要能看到源代码。对于构建后的文件，都对应了一个`.map`文件，将生成的代码映射到原始源代码。浏览器会自动读取这些 `.map` 文件并在其调试器中显示原始代码，而不是生成的代码。

* **`*.d.ts`**
  `.d.ts` 文件包含TypeScript的类型定义，否则这些定义会在编译为JavaScript期间丢失。当一个包被导入另一个TypeScript项目时，Typescript和编辑器会读取这些文件。


## 测试

jsPsych使用[Jest](https://jestjs.io/)进行自动化测试。

运行测试需要Node和npm。在 jsPsych 根目录中运行 `npm install`。然后运行`npm test`。我们也可以在想测试的包目录中运行`npm test`。例如，如果测试 `html-keyboard-response` 插件，则可以在 `/packages/plugin-html-keyboard-response` 中运行 `npm test`。

jsPsych库核心部分的测试位于`/packages/jspsych/tests`。

插件和扩展的测试位于相应包的 `/src` 文件夹中。插件和扩展的测试文件名为 `index.spec.ts`。

`/packages/jspsych/tests/utils.ts` 中有用于帮助测试的函数。我们推荐去看一些测试文件，以更多了解测试中的一些常见的习惯。
