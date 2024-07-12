# 扩展

扩展是可以增强插件功能的jsPsych模块。一个经典的扩展使用案例就是眼动。眼动的扩展使得插件可以收集被试的注视情况并记录到插件的数据对象中。

## 使用扩展

如果要在实验中使用扩展，则需要像引入插件一样，通过`<script>`标签将其引入，并且要在`jsPsych.init()`中对其进行初始化。

```html
<head>
  <script src="jspsych/jspsych.js"></script>
  <script src="jspsych/extensions/some-extension.js"></script>
</head>
```

```js
jsPsych.init({
  timeline: [...],
  extensions: [
    {type: 'some-extension', params: {...} }
  ]
})
```

如果需要扩展在试次中生效，则需要在试次的`extensions`属性下将需要使用的扩展添加进去。一些扩展可能还需要其他的依赖项或者是需要通过其他参数对其进行配置。

```js
var trial = {
  extensions: [
    {type: 'some-extension', params: {...} }
  ]
}
```

## 扩展列表

扩展 | 描述 
------ | -----------
[jspsych&#8209;ext&#8209;webgazer.js](../extensions/jspsych-ext-webgazer.html) | 使用[WebGazer](https://webgazer.cs.brown.edu/)库引入眼动功能。 

## 开发扩展

如果要开发一个新的扩展，则需要创建一个对象，该对象包含了一些事件回调函数。扩展文件的基本结构应该是这样的：

```js
jsPsych.extensions['new-extension'] = (function () {

  var extension = {};

  extension.initialize = function(params){
    // params are passed from the extensions parameter in jsPsych.init
  }
  
  extension.on_start = function(params){
    // params are passed from the extensions parameter in the trial object
  }

  extension.on_load = function(params){
    // params are passed from the extensions parameter in the trial object
  }

  extension.on_finish = function(params){
    // params are passed from the extensions parameter in the trial object
    return {
      // any data that the extension returns here will be added to the trial data
    }
  }
  
  return extension;
});
```

上面样例中的四个事件是扩展中必须有的。

`extension.initialize`在`jsPsych.init()`中调用，在这里运行扩展的初始化代码。一个实验中，该事件只会发生一次，不像其他事件每个试次都会发生。`params`对象可以包含配置插件所需要的参数。`params`对象会在调用`jsPsych.init()`时传入`extension.initialize`方法。`extension.initialize`需要返回一个`Promise`对象，该对象在扩展初始化完成后进行resolve。

`extension.on_start`在扩展开始执行时、先于`plugin.trial`被调用。该方法会针对当前试次进行初始化，例如创建记录数据的空的对象或重置内部状态等。`params`对象在试次中声明扩展时传入。你可以使用`params`对当前试次中扩展的行为进行自定义。

`extension.on_load`在`plugin.trial`执行后被调用，一般是在插件执行完了修改DOM元素部分的代码并完成事件监听的创建之后。这部分的代码中，扩展可以和DOM元素进行交互并记录数据。`params`对象在试次中声明扩展时传入。你可以使用`params`对当前试次中扩展的行为进行自定义。

`extension.on_finish`在插件完成执行后执行。可以用于试次结束后执行操作。该方法需要返回一个数据对象，这部分数据会被添加到插件本身收集的数据当中。注意，这部分的代码在`on_finish`事件 *之前* 进行，所以在`on_finish`事件中也可以拿到扩展添加的数据。`params`对象在试次中声明扩展时传入。你可以使用`params`对当前试次中扩展的行为进行自定义。

扩展中还可以加入其它的方法。示例详见[webgazer扩展](../extensions/jspsych-ext-webgazer.html)。