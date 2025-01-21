# 扩展

扩展是可以增强插件功能的jsPsych模块。一个经典的扩展使用案例就是眼动。眼动的扩展使得插件可以收集被试的注视情况并记录到插件的数据对象中。

jsPsych的扩展允许我们扩展插件的功能，使得插件可以收集更多的数据，显示额外的刺激内容，等等。例如，[眼动](../extensions/webgazer.md)扩展就可以帮插件收集严冬数据并添加到数据对象中。完整的扩展详见[这里](../extensions/list-of-extensions.md)。

## 使用扩展

如果要在实验中使用扩展，则需要像引入插件一样，通过`<script>`标签将其引入，并且要在`initJsPsych()`中对其进行初始化。

```html
<head>
  <script src="https://unpkg.com/jspsych@latest"></script>
  <script src="https://unpkg.com/@jspsych/extension-example@1.0.0"></script>
</head>
```

```js
initJsPsych({
  extensions: [
    { type: jsPsychExtensionExample, params: {...} }
  ]
})
```

如果需要扩展在试次中生效，则需要在试次的`extensions`属性下将需要使用的扩展添加进去。一些扩展可能还需要其他的依赖项或者是需要通过其他参数对其进行配置。

```js
var trial = {
  extensions: [
    { type: jsPsychExtensionExample, params: {...} }
  ]
}
```

## 开发扩展

详见[开发扩展部分](../developers/extension-development.md)。
