# maxdiff plugin

这一插件的作用是呈现一系列备选项，被试要从这些备选项中选出两个归入两个互斥的类别中（例如：最重要和最不重要，最喜欢和最不喜欢，最像和最不像，等）。被试通过点击备选项两侧的单选框对其进行归类。同一选项不可以同时归属两类。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
alternatives | 数组 | *undefined* | 包含了备选项的数组。如果`required`为true，则该参数必须有至少两个备选项。 
labels | 数组 | *undefined* | 包含了两个类别的数组，它们会分别作为表头呈现在备选项左右两列的顶部An 数组。 
randomize_alternative_order | 布尔 | `false` | 如果为true，则会对`alternatives`的排列顺序进行随机。 
preamble | 字符串 | 空字符串 | 上方呈现的HTML内容。 
required | 布尔 | `false` | 如果为true，则被试在左右两栏都作出选择后才能提交作答并继续实验。 
button_label | 字符串 |  'Continue' | 按钮的文字。


## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
rt | 数值 | 反应时（单位：毫秒），从刺激呈现开始计时，到被试做出反应结束。 
labels | 对象 | 包含了两个属性：`left`和`right`，其值分别是左右两栏的名称。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 
response | 对象 | 包含了两个属性：`left`和`right`，其值分别是被归入左右两栏的备选项。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。


## 示例

???+ example "基本示例"
    === "Code"
        ```javascript
        var maxdiff_page = {
            type: jsPsychMaxdiff,
            alternatives: ['apple', 'orange', 'pear', 'banana'],
            labels: ['Most Preferred', 'Least Preferred'],
            preamble: '<p> Please select your <b>most preferred</b> and <b>least preferred</b> fruits. </p>'
        };
        ```    
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-maxdiff-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-maxdiff-demo1.html">在新标签页中打开</a>

