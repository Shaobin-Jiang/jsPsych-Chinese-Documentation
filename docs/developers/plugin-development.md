# 开发插件

## 插件的要求

在7.0版本中，插件通过[JavaScript类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)实现。插件中需要实现：

* [`constructor()`](#constructor)：接收jsPsych实例。
* [`trial()` function](#initialize)：第一个传入参数为一个`HTMLElement`，第二个传入参数为试次参数对象。可以传入第三个参数，用来在特定情况下[处理`on_load`事件](#asynchronous-loading)。`trial()`方法需要在合适的时候触发`jsPsych,finishTrial()`以[结束试次、保存数据](#save-data)。
* [静态的`info`](#static-info)属性：该对象用于描述插件的参数。

### 模板

可以使用JavaScript或TypeScript编写插件。[JavaScript](https://github.com/jspsych/jspsych-contrib/blob/main/packages/extension-template/index.js)和[TypeScript](https://github.com/jspsych/jspsych-contrib/blob/main/packages/extension-template-ts/src/index.ts)的模板文件可以在[jspsych-contrib仓库](https://github.com/jspsych/jspsych-contrib/)中找到。

## 插件的构成

### constructor()

插件的`constructor()`会接收一个`JsPsych`的实例，constructor函数需要将其保存下来用于访问。

```js
constructor(jsPsych){
  this.jsPsych = jsPsych;
}
```

### trial()

插件的`trial()`方法用于运行试次。当jsPsych的时间线运行到了一个试次的时候，就会触发该插件的`trial()`方法。

trial方法接受以下三个参数：

* `display_element`是用于渲染jsPsych的实验内容的DOM元素。该参数需要是一个`HTMLElement`，我们可以用这个参数控制将jsPsych呈现在文档额哪个部分。
* `trial`是相应的[时间线节点](../overview/timeline.md)中设定的参数。
* `on_load`是一个可选参数，包含了一个回调函数，会在`trial()`完成加载后触发。详见[处理on_load事件](#asynchronous-loading)。

对于`trial`方法的唯一要求是在试次完成后调用`jsPsych.finishTrial()`，这样jsPsych才能知道什么时候进入下一个试次（如果是最后一个试次，则结束实验）。在那之前，插件爱干啥干啥。

### 静态的info

`info`属性是一个对象，必须有`name`属性和`parameters`属性。

```js
const info = {
  name: 'my-awesome-plugin',
  parameters: { }
}
```

`parameters`参数包含了试次所需要的参数，每个参数都有`type`和`default`属性。

```js
const info = {
  name: 'my-awesome-plugin',
  parameters: { 
    image: {
      type: jspsych.ParameterType.IMAGE,
      default: undefined
    },
    image_duration: {
      type: jspsych.ParameterType.INT,
      default: 500
    }
  }
}
```

如果`default`值为`undefined`，则用户在使用这个插件的时候必须指定该参数的值，否则会在控制台报错。如果在`info`中指定了`default`值，则插件会在没有指定该参数的值的时候使用该默认值。

jsPsych多数情况下允许[动态参数](../overview/dynamic-parameters.md)，即可以使用函数作为参数，这些函数会在试次开始前执行。但是，如果你希望插件的某一个参数是一个函数，且该函数 *不需要* 在试次开始前执行，就需要将参数的type设置为`'FUNCTION'`，这样jsPsych就不会把它当作一个动态参数。参见`canvas-*`系列插件。

`info`对象需要时一个静态参数，详见下面的示例。

```js
const info = {
  name: 'my-awesome-plugin',
  parameters: { 
    image: {
      type: jspsych.ParameterType.IMAGE,
      default: undefined
    },
    image_duration: {
      type: jspsych.ParameterType.INT,
      default: 500
    }
  }
}

class MyAwesomePlugin {
  constructor(...)

  trial(...)
}

MyAwesomePlugin.info = info;
```

## 插件的功能

在`.trial()`方法中，我们可以做很多事情，比如修改DOM元素，创建事件监听器，创建异步的请求，等等。在这一部分，我们就来看一些常见的功能。

### 改变呈现的内容

改变呈现内容的方法有多种。trial方法的`display_element`参数包含了呈现实验内容的`HTMLElement`，所以我们可以使用JavaScript中的方法和这个元素进行交互。一种常见的方法是改变他的`innerHTML`。下面的例子中使用`innerHTML`呈现`trial`参数中设定的图片。

```javascript
trial(display_element, trial){
  let html_content = `<img src="${trial.image}"></img>`;
  
  display_element.innerHTML = html_content;
}
```

jsPsych不会自动在试次开始前或结束后清空内容，所以我们一般需要在试次结束前使用`innerHTML`手动清空呈现的内容。

```javascript
display_element.innerHTML = '';
```

### 等待一段时间

如果我们需要代码暂停运行一段时间，可以使用jsPsych封装的`setTimeout()`函数——`jsPsych.pluginAPI.setTimeout()`。在`7.0`版本中，使用这个方法的唯一优点在于它创建的定时器可以在试次末通过`jsPsych.pluginAPI.clearAllTimeouts()`清除。未来的版本中，我们可能会改变`jsPsych.pluginAPI.setTimeout()`的实现方式，并基于`requestAnimationFrame`加入一些计时相关的功能。

```js
trial(display_element, trial){
  // show image
  display_element.innerHTML = `<img src="${trial.image}"></img>`;

  // hide image after trial.image_duration milliseconds
  this.jsPsych.pluginAPI.setTimeout(()=>{
    display_element.innerHTML = '';
  }, trial.image_duration);
}
```

### 处理键盘事件

插件允许我们监听很多事件，包括`keyup`和`keydown`。`jsPsych.pluginAPI`模块包含了[`getKeyboardResponse`函数](../reference/jspsych-pluginAPI.md#getkeyboardresponse)，该函数可以很方便地处理实验中的按键。

下面是一个简单的例子。更多示例详见[`getKeyboardResponse`处文档](../reference/jspsych-pluginAPI.md#getkeyboardresponse)。

```js
trial(display_element, trial){
  // show image
  display_element.innerHTML = `<img src="${trial.image}"></img>`;

  const after_key_response = (info) => {
    // hide the image
    display_element.innerHTML = '';

    // record the response time as data
    let data = {
      rt: info.rt
    }

    // end the trial
    this.jsPsych.finishTrial(data);
  }

  // set up a keyboard event to respond only to the spacebar
  this.jsPsych.pluginAPI.getKeyboardResponse({
    callback_function: after_key_response,
    valid_responses: [' '],
    persist: false
  });
}
```

### 异步加载

[试次事件](../overview/events.md)中包括了`on_load`，该事件通常在`.trial()`方法完成后自动触发。在大多数情况下，这一事件发生在DOM元素的初始化（例如，渲染图片，创建事件监听器和定时器，等等）之后。但是，在某些情况下，插件可能会执行一个异步操作，该操作需要在插件的初始加载完成之前执行。例如`audio-keyboard-response`插件中，检查音频文件是否加载完成是异步操作，`.trial()`方法在音频文件初始化、DOM元素更新前就完成执行了。

如果您想手动触发插件的`on_load`事件，可以使用`.trial()`方法可选的第三个传入参数，该参数是加载完成时调用的回调函数。

为了告诉jsPsych在`.trial()`方法完成时 *不* 使用常规的回调，我们需要显式返回一个 `Promise`对象。从 `7.0` 版本开始，这个Promise对象仅用来告诉jsPsych不要触发`on_load`事件。在未来的版本中，我们可能会丰富这个`Promise`的功能，这样`trial`可以使用异步函数。

下面的示例中展示了如何在插件中使用`on_load`事件。请注意，此示例省略了加载和完成试次之间发生的所有事情。完整示例参见`audio-keyboard-response`插件的源代码。

```js
trial(display_element, trial, on_load){
  let trial_complete;

  do_something_asynchronous().then(()=>{
    on_load();
  });

  const end_trial = () => {
    this.jsPsych.finishTrial({...})
    trial_complete(); // not strictly necessary, but doesn't hurt.
  }

  return new Promise((resolve)=>{
    trial_complete = resolve;
  })
}
```

### 保存数据

如果要将数据写入[jsPsych的数据集](../reference/jspsych-data.md#datacollection)，需要将数据对象传入`jsPsych.finishTrial()`。

```javascript
constructor(jsPsych){
  this.jsPsych = jsPsych;
}

trial(display_element, trial){
  let data = {
    correct: true,
    rt: 350
  }

  this.jsPsych.finishTrial(data);
}
```

记录的数据中，`correct`为`true`，`rt`为`350`。[其他的一些数据](../overview/plugins.md#_4)也会由插件自动收集。

## 模拟模式

插件可以支持[模拟模式](../overview/simulation.md)。

如果要插件支持模拟模式，插件需要有一个`simulate()`函数，该函数接受4个传入参数：

`simulate(trial, simulation_mode, simulation_options, load_callback)`

* `trial`: 和传入插件的`trial()`方法的`trial`参数相同，包含了试次使用的参数。
* `simulation_mode`: 字符串，可以是`"data-only"`或`"visual"`，用来表示使用哪种模拟模式。插件是否支持`"visual"` mode. If `"visual"`模式是可选的。如果不支持`"visual"`模式，则插件会在被要求使用`"visual"`模式的时候自动使用`"data-only"`模式。
* `simulation_options`: 该对象包含了模拟相关的参数。
* `load_callback`: 该函数在模拟到`on_load`事件将要触发前调用。请在正确的时候调用这个回调，这样实验中的`on_load`事件才能正常运行。

一般来说，模拟模式的流程如下：

1. 生成符合`trial`参数的数据。
2. 将生成的数据和`simulation_options`中的数据合并。
3. 验证最终的数据对象是否仍然符合`trial`参数。例如，检查反应时是否比试次的时长更长。
4. 在`data-only`模式下，调用`jsPsych.finishTrial()`并传入生成的数据。
5. 在`visual`模式下，调用`trial()`方法，并使用生成的数据触发相应的事件。[Plugin API module](../reference/jspsych-pluginAPI.md)提供了多种方法用来模拟诸如按键和点击鼠标这种事件。

我们计划在未来对模拟模式的开发进行更详细的讲解。不过目前，最好还是参考一下支持了模拟模式的插件的源代码，去看看上述流程是如何实现的。

## 关于编写插件的建议

如果你希望将开发的插件加入到jsPsych的主仓库中，请参照[贡献代码指南](contributing.md#_2)。

开发的插件最好能 *适用于多种场景* 。可以考虑通过参数方便用户进行自定义。例如，如果你的插件内会呈现文字，比如说按钮上的问题，可以将这些文字设置为参数。这样，适用其他语言的用户在适用插件的时候也可以对这些文字进行替换。
