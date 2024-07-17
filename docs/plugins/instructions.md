# instructions plugin

这个插件的作用是给被试呈现多页指导语，允许被试按自己的节奏进行浏览，并会记录被试在每一页上花费了多少时间。可以使用鼠标或键盘翻页。如果需要的话，可以允许被试自由向前或向后翻页。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

| 参数                  | 类型   | 默认值       | 描述                                                         |
| --------------------- | ------ | ------------ | ------------------------------------------------------------ |
| pages                 | 数组   | *undefined*  | 数组的每一个元素对应一页内容，均为HTML字符串。               |
| key_forward           | 字符串 | 'ArrowRight' | 翻到下一页的按键，应该以字符串的形式进行设置（如：`'a'`, `'ArrowLeft'`, `' '`, `'Enter'`）。 |
| key_backward          | 字符串 | 'ArrowLeft'  | 翻到上一页的按键，应该以字符串的形式进行设置（如：`'a'`, `'ArrowLeft'`, `' '`, `'Enter'`）。 |
| allow_backward        | 布尔   | true         | 如果为true，则被试可以返回前面的页；如果为false，则被试只能向后面翻页。 |
| allow_keys            | 布尔   | true         | 如果为true，则被试可以通过键盘按键翻页；如果为false，则不可以。 |
| show_clickable_nav    | 布尔   | false        | 如果为true，则指导语下方会出现`前进`和`后退`的按钮，被试可以点击按钮翻页。 |
| button_label_previous | 字符串 | 'Previous'   | 翻到上一页的按钮上的文字。                                   |
| button_label_next     | 字符串 | 'Next'       | 翻到下一页的按钮上的文字。                                   |
| show_page_number      | 布尔   | false        | 如果为true，且启用了翻页的按钮，则会以x/y的形式在两个按钮之间显示页码。 |
| page_label            | 字符串 | 'Page'       | `show_page_number`为true时，出现在页码前面的文字。           |
| on_page_change        | 函数   | ``function (current_page) {}`` | 每次页面切换时执行的函数。该函数接受一个传入参数`current_page`，即**页面切换之后**的页面序号，从`0`开始。当离开最后一页，即结束试次的时候，该函数也会调用。|

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称         | 类型 | 值                                                           |
| ------------ | ---- | ------------------------------------------------------------ |
| view_history | 数组 | 包含了被试看的所有页面（包括被试回看的页面）以及看每页内容所花费时间的数组。数组的每一个元素是一个对象，记录了被试看一页内容的相关信息，其属性包括`page_index`（页码，从0开始）和`viewing_time` （看当前页的时间）。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 |
| rt           | 数值 | 被试看完指导语所需要的毫秒数。                               |

## 示例

#### 呈现简单的文字指导语

???+ example "呈现简单的文字指导语"
    === "Code"

        ```javascript
        var trial = {
            type: jsPsychInstructions,
            pages: [
            'Welcome to the experiment. Click next to begin.',
            'This is the second page of instructions.',
            'This is the final page.'
            ],
            show_clickable_nav: true
        }
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-instructions-demo-1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-instructions-demo-1.html">在新标签页中打开</a>

#### 加入图片

???+ example "加入图片"
    === "Code"

        ```javascript
        var trial = {
            type: jsPsychInstructions,
            pages: [
            'Welcome to the experiment. Click next to begin.',
            'You will be looking at images of arrows: ' +
            '<br>' + 
            '<img src="con2.png"></img>'
            ],
            show_clickable_nav: true
        }
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-instructions-demo-2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-instructions-demo-2.html">在新标签页中打开</a>

#### 改变按钮上的文字

???+ example "改变按钮上的文字"
    === "Code"

        ```javascript
        var trial = {
            type: jsPsychInstructions,
            pages: [
            'Welcome to the experiment. Click next to begin.',
            'This is the second page of instructions.',
            'This is the final page.'
            ],
            button_label_next: "Continue",
            button_label_previous: "Return to the dark side",
            show_clickable_nav: true
        }
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-instructions-demo-3.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-instructions-demo-3.html">在新标签页中打开</a>
