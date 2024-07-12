# 构建jsPsych文档

托管于[https://www.jspsych.org](https://www.jspsych.org)使用[mkdocs](https://www.mkdocs.org/)生成，并使用[mkdocs-material theme](https://squidfunk.github.io/mkdocs-material/)。文档相关文件位于[GitHub仓库的`/docs`文件夹下](https://github.com/jspsych/jsPsych/tree/main/docs)，使用markdown编写。

如果要在本地构建文档，则需要使用`poetry`安装`mkdocs`、`mkdocs-material`和`mike`。

## 安装poetry

[Poetry](https://python-poetry.org/)是python的一个包管理器，你可以参照`poetry`官网的安装教程把它运行起来。

## 安装开发依赖

在jsPsych根目录运行`poetry install`来安装`mkdocs`、`mkdocs-material`以及其他依赖项。

## 本地构建文档

如果要构建最新版本的文档，或者是覆盖已有的版本，请运行`poetry run mike deploy [version] -u`。例如，如果你想要构建文档的`7.2`版本，就可以运行`poetry run mike deploy 7.2 -u`。

你还可以使用jsPsych自带的npm命令：`npm run docs:deploy [version]`，例如`npm run docs:deploy 7.2`。

此时，生成的文档会被自动提交到`gh-pages`分支。

我们在构建阶段没有使用`mkdocs`命令，而是使用了[`mike`](https://github.com/jimporter/mike)，因为后者才支持文档的版本控制。不过实际上`mike`底层运行的还是`mkdocs`命令。

## 查看本地文档

如果要运行一个本地的服务器，可以运行`poetry run mike serve`命令或者是使用jsPsych自带的npm命令：`npm run docs:serve`。

此时，可以在`http://localhost:8000`查看文档。

## 更新公开文档站点

!!! warning "警告"
    仅限核心开发者

在完成文档的本地构建后（即，已经提交到了本地的`gh-pages`分支后），就可以将其推送到远程的`gh-pages`分支以更新文档所在的站点。
