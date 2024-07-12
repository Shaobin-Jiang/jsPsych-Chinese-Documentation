# survey-text plugin

这个插件的作用是呈现一系列填空题。被试通过文字输入进行作答。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
questions | 数组 | *undefined* | 数组中的每个元素都是对象，代表了屏幕上呈现的一个问题。每个对象都包含了prompt, placeholder, required, rows 和columns参数，用于对其对应的问题进行设置，详见下面的示例。`prompt`: 类型为字符串，默认值是*undefined*，这些问题会和一个输入框进行绑定。`placeholder`: 类型为字符串，默认值为`""`，会作为输入框的placeholder属性。`required`: 类型为布尔，如果为true则该题为必答。`rows`: 类型为整数，默认值为1，输入框的行数。`columns`: 类型为整数，默认值为40，输入框的列数。`name`: 问题的name属性，主要用在数据存储部分。如果不定义，则使用默认名（`Q0`, `Q1`, `...`）。 
randomize_question_order | 布尔 | `false` | 如果为true，则`questions`的呈现顺序在试次开始时进行随机。在数据对象中，`Q0`指的还是数组中的第一个问题，不管它在实验中排在第几位。 
preamble | 字符串 | 空字符串 | 呈现在页面顶端、所有问题上方的HTML字符串。 
button_label | 字符串 |  'Continue' | 按钮的文本。 
autocomplete | 布尔 | false | 页面上的input元素是否允许自动补全。如果该参数为true，则表单元素允许自动填充。 

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
response | 对象 | 记录了所有问题作答情况的对象。对于每一个问题，对象都会添加一个属性，第一个问题记录在`Q0`属性下，第二个问题记录在`Q1`属性下，以此类推。被试的作答是其提交作答时输入框内的文字。如果定义了`name`参数，则会使用`name`的值作为当前属性名（而非`Q0`这种形式） 。后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 
rt | 数值 | 反应时（单位：毫秒）。问题刚开始出现时开始计时，被试完成作答后结束计时。 
question_order | 数组 | 记录问题顺序的数组。例如，`[2,0,1]`代表呈现的第一个问题是`trial.questions[2]` (`questions`参数下的第三个问题), 呈现的第二个问题是`trial.questions[0]`, 呈现的最后一个问题是`trial.questions[1]`。后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。

## 示例

???+ example "单个问题"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSurveyText,
          questions: [
            {prompt: 'How old are you?'}
          ]
        }
        ```
    
    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-text-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-text-demo1.html">在新标签页中打开</a>

???+ example "多个问题，部分问题中使用了placeholder和required"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSurveyText,
          questions: [
            {prompt: 'What is your date of birth?', placeholder: 'mm/dd/yyyy', required: true},
            {prompt: 'What country do you currently live in?'}
          ]
        }
        ```
    
    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-text-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-text-demo2.html">在新标签页中打开</a>

???+ example "定义问题的name属性"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSurveyText,
          questions: [
            {prompt: 'What did you eat for breakfast?', name: 'Breakfast'},
            {prompt: 'What did you eat for lunch?', name: 'Lunch'}
          ]
        }
        ```
    
    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-text-demo3.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-text-demo3.html">在新标签页中打开</a>

    
???+ example "使用preamble和更长的输入框"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSurveyText,
          preamble: `<img src="img/navarro_burst_03.jpg" style="width:400px;"></img>`,
          questions: [
            {prompt: 'Describe your reaction to the image above', rows: 5}
          ]
        }
        ```

        *The artwork in this demo is by [Danielle Navarro](https://art.djnavarro.net/)*
    
    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-text-demo4.html" width="90%;" height="800px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-text-demo4.html">在新标签页中打开</a>

