# reconstruction plugin

这个插件的作用是呈现一个可以交互的刺激，被试可以改变其某个参数并观看实时的变化。

该刺激的定义必须通过一个返回HTML的函数完成。用于定义刺激的函数只有一个传入参数，即被试可以调整的参数，其取值范围为0 - 1.详见下面的示例部分。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stim_function | 函数 | *undefined* | 该函数只有一个传入参数，返回代表着刺激的HTML字符串。 
starting_value | 数值 | 0.5 | 刺激参数的起始值。 
step_size | 数值 | 0.05 | 按键调整刺激参数时参数的改变量。 
key_increase | 字符串 | 'h' | 增加刺激参数所按的键。 
key_decrease | 字符串 | 'g' | 减少刺激参数所按的键。 
button_label | 字符串 | 'Continue' | 用于结束试次的按钮上呈现的文字。

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
start_value | 数值 | 刺激参数起始值。 
final_value | 数值 | 刺激参数最终值。 
rt | 数值 | 试次持续的毫秒数。 

## 示例

???+ example "调整方块的大小"
    === "Code"

        ```javascript
        var sample_function = function(param){
            var size = 50 + Math.floor(param*250);
            var html = '<div style="display: block; margin: auto; height: 300px; width: 300px; position: relative;">'+
            '<div style="display: block; position: absolute; top: '+(150 - size/2)+'px; left:'+(150 - size/2)+'px; background-color: #000000; '+
            'width: '+size+'px; height: '+size+'px;"></div></div><p>Press "h" to make the square larger. Press "g" to make the square smaller.</p>'+
            '<p>When the square is the same size as the previous one, click Continue.</p>';
            return html;
        }

        var match_item = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: '<div style="display: block; margin: auto; height: 300px; width: 300px; position: relative;">'+
            '<div style="display: block; position: absolute; top: '+(150 - 210/2)+'px; left:'+(150 - 210/2)+'px; background-color: #000000; '+
            'width: 210px; height: 210px;"></div></div>',
            choices: ['c'],
            post_trial_gap: 1250,
            prompt: '<p>Study the size of this square carefully. On the next screen you will have to recreate it. When you are ready, press "c".</p>'
        }

        var reconstruction = {
            type: jsPsychReconstruction,
            stim_function: sample_function,
            starting_value: 0.5,
        }
        ```

    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-reconstruction-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-reconstruction-demo1.html">在新标签页中打开</a>
