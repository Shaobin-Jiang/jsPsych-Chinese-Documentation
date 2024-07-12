# 接入Mechanical Turk

我们可以用jsPsych创建在线实验并通过[Mechanical Turk](http://www.mturk.com/)招被试。只要实验可以通过服务器运行，且可以[在服务器上记录数据](data.html)，接下来将实验接入Mechanical Turk就很简单了。jsPsych有一些内置的与此相关的功能。

## jsPsych.turk模块

[jsPsych.turk](../core_library/jspsych-turk.html)模块包含了在Mechanical Turk上运行实验的一些函数。

## 创建广告页

被试在Mechanical Turk上浏览你的实验时，在他们接受HIT（开始实验）前会看到一个页面，该页面一般用于实验的宣传广告，就和我们在走廊中贴宣传单一样。需要记住的是，被试即使没有接受HIT也要可以和页面交互。因此，可以根据是否接受了HIT改变页面内容，例如：

```html
<div id="experiment_link">You must accept the HIT to begin the experiment</div>.

<script>
// jsPsych has a method turkInfo() which can determine whether or not the
// HIT has been accepted.
var turkInfo = jsPsych.turkInfo();

// turkInfo.previewMode is true in two cases: when the HIT has not been
// accepted yet OR when the page is viewed outside of mechanical turk.
// The second property, outsideTurk, is true when the page is viewed
// outside of mechanical turk, so together, the statement will be true
// only when in Turk and when the HIT is not accepted yet.
if(!turkInfo.previewMode && !turkInfo.outsideTurk) {
  document.querySelector('#experiment_link').innerHMTL = '<a href="link_to_experiment.html" target="_blank">Click Here to Start Experiment</a>';
}
</script>
```

广告页的一个问题在于它必须使用https协议，因此托管该页面的服务器需要有SSL证书。具体该怎么做取决于你使用的服务器种类，所以最好还是上谷歌查一下如何获取并安装SSL证书。

## 获取ID

Mechanical Turk上的每一个账号都有自己的ID。记录ID有助于我们了解是谁在做这个实验。特别地，虽然Turk内置了防止同一个人反复做一个实验的功能，但有些时候我们也不希望同一个人做多个相关的实验。所以，如果我们把每个做实验的人的ID记录在数据库中，就可以对被试进行剔除。jsPsych可以使用`turkInfo`方法获取workerID, assignmentID, 和hitID。

```javascript
var turkInfo = jsPsych.turk.turkInfo();

// workerID
turkInfo.workerId

// hitID
turkInfo.hitId

// assignmentID
turkInfo.assignmentId
```

在实验开始时记录workerId有助于我们记录中途退出的情况。

## 向Mechanical Turk提交结果

如果我们使用外部题目模板在Mechanical Turk上运行任务，则需要让被试告诉程序完成了任务（如果是在使用其他模板，那么该模板会提供这部分的代码）。jsPsych中很容易实现这个功能，通常地，执行外部的任务时，我们会在Mechanical Turk网站上呈现一个HTML页面并链接到我们的任务。被试点击链接会在新的窗口中打开实验页面，这样呈现给被试的实验内容就可以在整个浏览器窗口呈现，而不是在Mechanical Turk网站提供的iframe元素内呈现。

在这个页面上，我们需要加进去一个提交键，被试在结束实验后需要点击。页面大概是这个样子：

```html
<p>Enter the code you were given:</p>
<input type="text" id="code"></input>
<button onclick="sendData();">Submit HIT</button>

<script>
function sendData() {
  jsPsych.turk.submitToTurk({
    code: document.getElementById('code').value
  });
}
</script>
```

当被试点击按钮时，`code`输入框的内容就会被发送到Mechanical Turk，这样我们就可以看到被试及他们在Mechanical Turk页面提交的代码，然后我们就可以在Mechanical Turk网站上选择接受或拒绝被试的提交结果。

## 局限

jsPsych和Mechanical Turk API的交互不可能尽善尽美。如果你需要一个发布、管理任务的软件，可以选择[PsiTurk](http://www.psiturk.org)。jsPsych和PsiTurk 互补，这里[是二者结合起来使用的例子](https://psiturk.org/ee/W4v3TPAsiD6FUVY8PDyajH)。
