# jspsych-cloze

这个插件的作用是呈现一段文本，但这一段文本中部分词被移除了。被试需要对移除的部分进行填空。当被试点击按钮时，会对被试作答进行记录。我们可以对被试的作答进行判断，如果出错了可以执行一个特定的函数，从而告知被试自己作答错误。participants about mistakes.

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数          | 类型   | 默认值             | 描述                                                         |
| ------------- | ------ | ------------------ | ------------------------------------------------------------ |
| text          | 字符串 | *undefined*        | 呈现的题目文本。其中的空白部分用`%%`进行标识，这些部分在实验中会被自动替换为输入框。如果你希望检查被试作答是否正确，则需要提供正确答案，正确答案需要写在两个%中间（例如：`%正确答案%`）。 |
| button_text   | 字符串 | OK                 | 结束当前试次的按钮上的文字。                                 |
| check_answers | 布尔   | false              | 被试点击按钮后是否检查被试作答是否正确。如果为true，则会检查被试作答，如果作答错误则会调用`mistake_fn`。这种情况下，试次不会自动结束。如果为false，则试次在被试点击按钮后自动结束。 |
| mistake_fn    | 函数   | ```function(){}``` | 如果`check_answers`为true且被试作答错误调用的函数。          |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称     | 类型       | 值         |
| -------- | ---------- | ---------- |
| response | 字符串数组 | 被试的答案 |

## 示例

#### 使用默认设置（不检查作答情况，使用默认按钮文本）的简单填空

```javascript
var trial = {
	type: 'cloze',
	text: 'The %% is the largest terrestrial mammal. It lives in both %% and %%.'
};
```

#### 更复杂的示例（检查作答情况，错误作答的处理，修改按钮文本）

```javascript
var trial = {
    type: 'cloze',
    text: 'A rectangle has % 4 % corners and a triangle has % 3 %.',
    check_answers: true,
    button_text: 'Next',
    mistake_fn: function(){alert("Wrong answer. Please check again.")}
};
```