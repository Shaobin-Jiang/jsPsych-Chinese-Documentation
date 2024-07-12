# jspsych-survey-html-form plugin

这一插件的作用是通过HTML字符串呈现一系列`<input>`标签，input的类型可以自由选择（详见[MDN关于input的说明](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)）。被试会使用这些input标签进行输入。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
html | 字符串 | *undefined* | 包含了所有input元素的HTML字符串，每一个input元素都有自己的name属性。该参数中不可以使用`<form>`标签，因为它会由插件自己生成。除了input元素，该参数值也可以包含其他HTML元素。 
preamble | 字符串 | 空字符串 | 呈现在页面顶端、所有问题上方的HTML字符串。 
button_label | 字符串 |  'Continue' | 结束当前试次的按钮上的文字。 
dataAsArray | 布尔 |  false | 以数组形式记录数据，例如`[{name: "INPUT_NAME", value: "INPUT_VALUE"}, ...]`，而非以对象形式记录数据，如`{INPUT_NAME: INPUT_VALUE, ...}`。如果你没有给input标签指定name属性，那么这样设定会比较方便。 
autofocus | 字符串 | 空字符串 | 自动聚焦的表单元素的ID。获得焦点的元素也就是获取键盘输入的元素。对于`<input type="text">`或`<textbox>`这样的元素，如果自动聚焦到它身上，在试次加载完成后，输入框中会出现光标。 
autocomplete | 布尔 | false | 页面上的input元素是否允许自动补全。如果该参数为true，则表单元素允许自动填充。 

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
response | 对象 | 包含了每个input元素输入情况的对象。对于每一个input元素，该对象都会添加一个属性，属性名称和该input元素的name属性一致。反应以字符串形式记录，内容为被试在此input元素上的输入内容。后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 
rt | 数值 | 反应时（单位：毫秒）。 

## 示例

### 基本示例

```javascript
var form_trial = {
  type: 'survey-html-form',
  preamble: '<p> How are you feeling <b>right now?</b> </p>',
  html: '<p> I am feeling <input name="first" type="text" />, <input name="second" type="text" />, and <input name="third" type="text" />.</p>'
};
```

### 使用autofocus参数的例子

In this example, the browser will focus on the element with the ID `test-resp-box` when the trial loads. For `<input type="text">` elements, this means that the cursor will appear inside the text box.

```javascript
var autofocus_trial = {
  type: 'survey-html-form',
  preamble: '<p> What is your favorite bird?</p>',
  html: '<p>My favorite bird is <input type="text" id="test-resp-box" name="response" size="10" /></p>',
  autofocus: 'test-resp-box'
};
```