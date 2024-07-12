# jspsych-external-html plugin

这个插件的作用是呈现一个外部HTML文档（如：知情同意书），并需要被试按键或点击按钮以进入到下一个试次，从而允许实验者在继续实验前检查被试是否符合要求（如：知情同意）。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数           | 类型   | 默认值                       | 描述                                                         |
| -------------- | ------ | ---------------------------- | ------------------------------------------------------------ |
| url            | 字符串 | *undefined*                  | 所呈现页面的URL。                                            |
| cont_key       | 字符串 | null                         | 确认进入下一个试次所需要的按键的名称。如果为`null`，则被试不能通过键盘按键进入下一个试次。 |
| cont_btn       | 字符串 | null                         | 页面上可点击元素的ID。当点击该元素时，会进入下一个试次。     |
| check_fn       | 函数   | `function(){ return true; }` | 当即将进入下一个试次时会调用该函数，并会将jsPsych的`display_element`作为唯一传入参数传入。只有当前函数返回值为true时，实验才会继续。可以使用这个函数来执行验证被试有没有正确填写表单等操作。 |
| force_refresh  | 布尔   | false                        | 为true时，如果存在缓存的当前页面，则当前插件不会使用该缓存版本。 |
| execute_script | 布尔   | false                        | 如果为true，则会运行引入的页面上的脚本。                     |

## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

| 名称 | 类型   | 值                     |
| ---- | ------ | ---------------------- |
| url  | 字符串 | 页面的URL。            |
| rt   | 数值   | 被试完成试次的毫秒数。 |

## 示例

### 加载知情同意书

##### 这一部分内容在'external_page.html'文件中
```html
<div id="consent">
  <p>
    This is a demo experiment, with this minimal consent form being loaded
    as an external html document. To continue, click the checkbox below
    and hit "Start Experiment".
  </p>
  <p>
    <input type="checkbox" id="consent_checkbox" />
    I agree to take part in this study.
  </p>
  <button type="button" id="start">Start Experiment</button>
</div>
```

##### 加载上述页面的jsPsych代码
```javascript
// sample function that might be used to check if a subject has given
// consent to participate.
var check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;
  }
  return false;
};


// declare the block.
var trial = {
  type:'external-html',
  url: "external_page.html",
  cont_btn: "start",
  check_fn: check_consent
};
```
