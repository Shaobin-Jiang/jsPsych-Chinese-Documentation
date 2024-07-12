# survey

该插件可以在一至多页上呈现一至多个问题。这些插件基于[SurveyJS](https://surveyjs.io/)。

支持的问题类型包括：

- [`"drop-down"`](#drop-down)：呈现问题，并要求被试从下拉菜单中选择一个选项。
- [`"likert"`](#likert)：呈现一段提示和一个离散量表。
- [`"likert-table"`](#likert-table)：呈现一条提示和一系列陈述句/问题，对于每个陈述句/问题都有一系列相同的选项。
- [`"multi-choice"`](#multi-choice)：呈现一个问题，要求被试从给出的选项中选择一个。
- [`"multi-select"`](#multi-select)：呈现一个问题，要求被试从给出的选项中选择多个。
- [`"ranking"`](#ranking)呈现一个问题和几个选项，要求被试通过拖放对选项进行排序。
- [`"text"`](#text)：呈现一个问题和一个输入框，被试可以输入回答。

还有一个[`"html"`](#html)类型，可以添加HTML内容 (不用于获取被试反应)。

!!!warning "警告"
    这个插件的开发还在进行中，未来将支持更多[SurveyJS](https://surveyjs.io/)提供的功能。在这个插件正式推出`1.0`之前，其参数和实现方式都可能会发生改变。我们推荐在使用这个插件的时候多做一些测试。

## CSS

这个插件会额外用到一个`survey.css`文件。我们可以这样引入这个文件：

```html
<link rel="stylesheet" href="https://unpkg.com/@jspsych/plugin-survey@0.1.1/css/survey.css">
```

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

### Survey的参数

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
pages | 数组 | *undefined* | 数组的每一个元素也是一个数组，这些数组分别代表了一页的内容，由一个或多个问题组成。
button_label_next | 字符串 |  'Continue' | 前进按钮的文字
button_label_previous | 字符串 | 'Back' | 后退按钮的文字
button_label_finish | 字符串 | 'Finish' | 提交按钮的文字
autocomplete | 布尔 | `false` | 是否对input元素启用autocomplete。如果为`true`，则会启用自动补全。
show_question_numbers | 字符串 | "off" | 取值可以是"on", "onPage", "off"。如果为"on"，则问题会从第一页从“1.”开始编号，后面的页面中不会重新计数。如果为"onPage"，则每一页问题都会从“1.”开始编号。如果为"off"，则不会编号。注意，自动编号会忽略type为HTML的问题。
title | 字符串 | `null` | 如果设置了这个值，则会将这段文字显示在问卷的每一页顶端。
required_error | 字符串 | "Please answer the question." | 如果某个必答的问题没有作答显示的文字。
required_question_label | 字符串 | "*" | 必答的问题末尾显示的字符。如果不想将这些问题标记出来，请将这个值设定为空字符串 ("")。

### 问题类型和参数

#### 所有问题都有的参数

必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
type | 字符串 | *undefined* | 问题类型，可选值包括"drop-down", "html", "likert", "likert-table", "multi-choice", "multi-select", "ranking", "rating", "text"。
prompt | 字符串 | *undefined* | 问题内容。如果type为"html"，则这是一个HTML字符串；如果type为"likert-table"，则这是显示在表格上方的一个整体的问题或者标题。
required | 布尔 | `false` | 问题是否为必答，使用了HTML5的`required`属性。 
name | 字符串 | `null` | 存储数据时的name属性。如果未指定这个属性，则会使用默认的名称：`P0_Q0`, `P0_Q1`, `P1_Q0`，以此类推。问题的name不能重复。

#### Drop-down

呈现问题，要求被试从下拉菜单中选择一个答案。

除了适用于所有问题类型的参数，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
options | 字符串数组 | *undefined* | 下拉菜单中的选项。
option_reorder | 字符串 | "none" | 可选值包括"none", "asc", "desc", "random"。如果为"none"，则选项的顺序和`options`中一致。如果为`random`，则会对顺序进行随机。如果为"asc"或"desc"，则会对选项进行升序/降序排列。
correct_response | 字符串 | null | 正确答案。如果设置了这个值，则产生的数据中会包含一个`correct`属性，用来表示被试作答是否正确。

#### HTML

呈现自定义的HTML内容，包括文字、图片、音频等，但不能用于获取被试反应。

可选参数包括`type`，`prompt`和`name`。`name`参数不是必须的，主要用于从response值为`null`的问题中找出这一类的问题。`required`参数会被忽略。

#### Likert

呈现一段提示和一个离散量表，量表的选项可以选中和取消选中。量表通过`likert_scale_values`参数设置，该参数是一个数组，数组的每一个元素包括了文本内容和对应的值，也可以使用`likert_rating_min`/`max`/`stepsize`参数设置。

除了适用于所有问题类型的参数，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
likert_scale_values | 对象数组 | `null` | 量表选项的文本内容和在数据中对应的值。数组中的每个对象都定义了一个选项，包含一个`value`属性 (整数或字符串，用于数据中的记录)和一个`text`属性 (字符串，用于呈现选项)。例如：`[{value: 1, text: "A lot"},{value: 2, text: "Somewhat"},{value: 3, text: "Not much"}]`。如果没有`text`属性，则会使用`value`属性值来呈现 (例如: `[{value: 1},{value: 2},{value: 3}]`, `[{value: "Yes"},{value: "Maybe"},{value: "No"}]`)。如果有指定了当前参数，则会覆盖`likert_rating_min`/`max`/`stepsize`参数。
likert_scale_min | 整数 | 1 | 如果没有指定`likert_scale_values`，则当前参数为量表的最小值。
likert_scale_max | 整数 | 5 | 如果没有指定`likert_scale_values`，则当前参数为量表的最大值。 
likert_scale_stepsize | 整数 | 1 | 如果没有指定`likert_scale_values`，则当前参数为量表的步长。
likert_scale_min_label | 字符串 | `null` | 描述量表第一个选项的字符串。如果指定了当前值，则会呈现在选项中，但显示在选项文本的前面。这个属性的作用主要是在使用数值作为选项文本时用来定义最小值的含义。
likert_scale_max_label | 字符串 | `null` | 描述量表最后一个选项的字符串。如果指定了当前值，则会呈现在选项中，但显示在选项文本的后面。这个属性的作用主要是在使用数值作为选项文本时用来定义最大值的含义。

#### Likert-table

呈现一条提示和一系列陈述句/问题，对于每个陈述句/问题都有一系列相同的选项。

除了适用于所有问题类型的参数，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
statements | 对象数组 | *undefined* | 包含一个或多个对象，分别代表表格中每一个陈述句/问题。每个对象必须有`prompt`属性，即问题文本。对象还可以有一个`name`属性，即记录在数据中的名称。如果没有设定`name`，则会使用默认的"S0", "S1"，以此类推。
options | 字符串数组 | *undefined* | 选项文本。
randomize_statement_order | 布尔 | `false` | 如果为`true`，则会对`statements`中的顺序进行随机排列。

#### Multi-choice

呈现问题，要求被试选择一个选项。

除了适用于所有问题类型的参数，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。 

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
options | 字符串数组 | *undefined* | 问题的选项。
option_reorder | 字符串 | "none" | 可选值包括"none", "asc", "desc", "random"。如果为"none"，则选项的顺序和`options`中一致。如果为`random`，则会对顺序进行随机。如果为"asc"或"desc"，则会对选项进行升序/降序排列。
columns | 整数 | 1 | 选项的列数。如果为1 (默认值)，则会将选项垂直排为1列。如果为0，则会将选项水平排列为1行。大于1的值会将选项排列为多列。
correct_response | 字符串 | null | `options`数组中正确的项。如果设定了这个值，则产生的数据中会包含`correct`属性。

#### Multi-select

呈现问题，被试可以选择多个选项。

除了适用于所有问题类型的参数，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
options | 字符串数组 | *undefined* | 问题的选项。
option_reorder | 字符串 | "none" | 可选值包括"none", "asc", "desc", "random"。如果为"none"，则选项的顺序和`options`中一致。如果为`random`，则会对顺序进行随机。如果为"asc"或"desc"，则会对选项进行升序/降序排列。
columns | 整数 | 1 | 选项的列数。如果为1 (默认值)，则会将选项垂直排为1列。如果为0，则会将选项水平排列为1行。大于1的值会将选项排列为多列。
correct_response | 字符串数组 | null | `options`数组中正确的项。如果设定了这个值，则产生的数据中会包含`correct`属性。

#### Ranking

呈现问题和几个选项，要求被试通过拖放对选项进行排序。使用的时候，最后少添加一些选项 (最好不要超过7个)。支持鼠标点击、触屏 (移动设备)、键盘按键 (使用Tab和Shift-Tab进行选择，使用上下箭头进行排序)。

除了适用于所有问题类型的参数，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。 

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
options | 字符串数组 | *undefined* | 需要排序的选项。
option_reorder | 字符串 | "none" | 可选值包括"none", "asc", "desc", "random"。如果为"none"，则选项的顺序和`options`中一致。如果为`random`，则会对顺序进行随机。如果为"asc"或"desc"，则会对选项进行升序/降序排列。
correct_response | 字符串数组 | null | 按照正确顺序排序的`options`数组。如果设定了这个值，则产生的数据中会包含`correct`属性。

#### Text

呈现问题和输入框。

除了适用于所有问题类型的参数，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
placeholder | 字符串 | "" | 输入框的placeholder内容。
textbox_rows | 整数 | 1 | 输入框行数。
textbox_columns | 整数 | 40 | 输入框列数。
validation | 字符串 | "" | 用于验证输入内容的正则表达式。

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值
-----|------|------
response | 对象 | 包含了每个问题作答情况的对象。对于每一个问题，该对象都会添加一个属性，第一页的第一个问题记作`P0_Q0`，第一页的第二个问题记作`P0_Q1`，以此类推。如果设定了`name`属性，则属性名称和该问题的name属性一致。对象的type属性取决于问题的类型。后面使用`.json()`或`.csv()`方法保存数据时，会以JSON形式存储起来。 |
rt | 数值 | 被试反应时 (单位：毫秒)。计时从问题呈现开始，到被试提交结束。 |

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "单页"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSurvey,
          pages: [
            [
              {
                type: 'html',
                prompt: 'Please answer the following questions:',
              },
              {
                type: 'multi-choice',
                prompt: "Which of the following do you like the most?", 
                name: 'VegetablesLike', 
                options: ['Tomato', 'Cucumber', 'Eggplant', 'Corn', 'Peas'], 
                required: true
              }, 
              {
                type: 'multi-select',
                prompt: "Which of the following do you like?", 
                name: 'FruitLike', 
                options: ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry'], 
                required: false,
              }
            ]
          ],
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo1.html">在新标签页中打开</a>

???+ example "多页"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSurvey,
          pages: [
            [
              {
                type: 'text',
                prompt: "Where were you born?", 
                placeholder: 'City, State, Country',
                name: 'birthplace', 
                required: true,
              }, 
              {
                type: 'text',
                prompt: "How old are you?", 
                name: 'age', 
                textbox_columns: 5,
                required: false,
              }
            ],
            [
              {
                type: 'multi-choice',
                prompt: "What&#39;s your favorite color?", 
                options: ['blue','yellow','pink','teal','orange','lime green','other','none of these'],
                name: 'FavColor', 
              }, 
              {
                type: 'multi-select',
                prompt: "Which of these animals do you like? Select all that apply.", 
                options: ['lion','squirrel','badger','whale'],
                option_reorder: 'random',
                columns: 0,
                name: 'AnimalLike', 
              }
            ]
          ],
          title: 'My questionnaire',
          button_label_next: 'Continue',
          button_label_back: 'Previous',
          button_label_finish: 'Submit',
          show_question_numbers: 'onPage'
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-demo2.html">在新标签页中打开</a>

???+ example "单个/多个项目的Likert量表"
    === "Code"

        ```javascript
        const trial = {
          type: jsPsychSurvey,
          pages: [
            [
              {
                type: 'likert',
                prompt: 'I like to eat vegetables.',
                likert_scale_min_label: 'Strongly Disagree',
                likert_scale_max_label: 'Strongly Agree',
                likert_scale_values: [
                  {value: 1},
                  {value: 2},
                  {value: 3},
                  {value: 4},
                  {value: 5}
                ]
              }, 
              {
                type: 'likert',
                prompt: 'I like to eat fruit.',
                likert_scale_min_label: 'Strongly Disagree',
                likert_scale_max_label: 'Strongly Agree',
                likert_scale_values: [
                  {value: 1},
                  {value: 2},
                  {value: 3},
                  {value: 4},
                  {value: 5}
                ]
              },
              {
                type: 'likert',
                prompt: 'I like to eat meat.',
                likert_scale_min_label: 'Strongly Disagree',
                likert_scale_max_label: 'Strongly Agree',
                likert_scale_values: [
                  {value: 1},
                  {value: 2},
                  {value: 3},
                  {value: 4},
                  {value: 5}
                ]
              },  
              
            ],
            [
              {
                type: 'likert-table',
                prompt: ' ',
                statements: [
                  {prompt: 'I like to eat vegetables', name: 'VeggiesTable'},
                  {prompt: 'I like to eat fruit', name: 'FruitTable'},
                  {prompt: 'I like to eat meat', name: 'MeatTable'},
                ],
                options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
              }
            ]
          ],
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo3.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo3.html">在新标签页中打开</a>

???+ example "对被试作答评分"
    === "Code"

        ```javascript
        const trial = {
          type: jsPsychSurvey,
          pages: [
            [
              {
                type: 'multi-choice',
                prompt: 'During the experiment, are allowed to write things down on paper to help you?',
                options: ["Yes", "No"],
                correct_response: "No",
                required: true
              }, 
            ]
          ],
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo4.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo4.html">在新标签页中打开</a>