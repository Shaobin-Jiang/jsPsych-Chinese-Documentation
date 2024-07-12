# sketchpad plugin

该插件会创建一个可交互的canvas元素，被试可以在上面通过鼠标或触屏进行绘制。可用于绘制类的任务，例如要求被试画某个物体。也可以用于一些图片切割或标注任务，这个时候只需要设置`background_image`参数，让canvas元素上先渲染一张图片。

该插件将图像以[base64格式](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)保存，可以使用[在线工具](https://www.google.com/search?q=base64+image+decoder)或[R](https://stackoverflow.com/q/58604195/3726673)、[python](https://stackoverflow.com/q/2323128/3726673)或其他语言的小程序进行转换。该插件还会将被试每一笔绘制都记录下来。

!!!warning "警告"
    这个插件会产生**大量**的数据。在最后输出的JSON中，每个试次产生的数据量很容易就会超过500kB。如果最终数据分析不需要的话，我们可以禁用对每一笔绘制内容 (`save_strokes: false`)或完整图像信息 (`save_final_image: false`)以减少数据量。如果我们使用这个插件收集了大量的数据，最好在每个试次结束后就把数据保存到服务器，而不是在实验结束后一起上传。这个功能可以通过[`on_data_update`事件](../overview/events.md#on_data_update)实现。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。


| 参数          | 类型            | 默认值 | 描述                              |
| ------------------ | --------------- | ------------- | ---------------------------------------- |
| canvas_shape | `"rectangle"` 或 `"circle"` | `"rectangle"` | canvas元素的形状 |
| canvas_width | 整数 | 500 | `canvas_shape`为`"rectangle"`时，canvas元素宽度的像素值 |
| canvas_height | 整数 | 500 | `canvas_shape`为`"rectangle"`时，canvas元素高度的像素值 |
| canvas_diameter | 整数 | 500 | `canvas_shape`为`"circle"`时，canvas元素直径的像素值 |
| canvas_border_width | 整数 | 0 | canvas元素边框的宽度 |
| canvas_border_color | 字符串 | `"#000"` | canvas元素边框的颜色 |
| background_image | 图片路径 | `null` | canvas元素的背景图片 |
| background_color | 字符串 | `"#fff"` | canvas元素的背景颜色。注意，`background_image`会覆盖背景颜色。
| stroke_width | 整数 | 2 | canvas元素上绘制时画笔的粗细 |
| stroke_color | 字符串 | `"#000"` | canvas元素上绘制时画笔的颜色 |
| stroke_color_palette | 字符串数组 | `[]` | canvas元素上绘制时可选的颜色。点击一个颜色时会将画笔换为相应的颜色。 |
| prompt | 字符串 | null | 页面上呈现的HTML内容
| prompt_location | `"abovecanvas"` 或 `"belowcanvas"` 或 `"belowbutton"` | `"abovecanvas"` | `prompt`呈现的位置 |
| save_final_image | 布尔 | true | 是否将最终的图像保存为base64格式 |
| save_strokes | 布尔 | true | 是否将每一笔绘制的内容都分别保存下来 |
| key_to_draw | 字符串 | null | 按下这个键就相当于按下了鼠标。以字符串的形式表示按键，例如，用`'a'`表示A，用`' '`表示空格。 |
| show_finished_button | 布尔 | true | 是否显示用来结束试次的按钮。 |
| finished_button_label | 字符串 | `"Finished"` | 结束试次的按钮上的文字。 |
| show_clear_button | 布尔 | true | 是否显示清空绘制内容的按钮。 |
| clear_button_label | 字符串 | `"Clear"` | 清空绘制内容的按钮上的文字。 |
| show_undo_button | 布尔 | true | 是否显示撤销按钮。 |
| undo_button_label | 字符串 | `"Undo"` | 撤销按钮上的文字。 |
| show_redo_button | 布尔 | true | 是否显示恢复按钮。注意，只有`show_undo_button`为`true`时，才会显示恢复按钮。 |
| redo_button_label | 字符串 | `"Redo"` | 恢复按钮上的文字。 |
| choices | array of keys | `"NO_KEYS"` | 被试可以用来结束试次的按键。按键应该以字符串的形式说明（例如：`'a'`, `'q'`, `' '`, `'Enter'`, `'ArrowDown'`）—— 更多的示例参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)和[这里 (event.key一列)](https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/)。不在范围内的按键反应不会被记录。默认值是`"ALL_KEYS"`，即所有按键都是有效的。如果将当前参数值设为`"NO_KEYS"`，则不允许被试按任何键。 |
| trial_duration | 整数 | null | 试次的时长。如果为`null`，则只能手动结束。 |
| show_countdown_trial_duration | 布尔 | false | 在`trial_duration`不是`null`时是否显示倒计时。 |
| countdown_timer_html | 字符串 | `'<span id="sketchpad-timer"></span> remaining'` | 作为倒计时的HTML元素。带有`id="sketchpad-timer"`的元年苏的内容会被替换为倒计时，格式为`MM:SS`。

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

| 名称           | 类型        | 值                                    |
| -------------- | ----------- | ---------------------------------------- |
| rt | 整数 | 试次的时长。
| response | 字符串 | 如果试次时通过点击结束按钮结束的，则为`"button"`。如果是通过按键结束的，则为按的键。如果超时了，则为`null`。 |
| png | base64字符串 | 如果`save_image`为true，则为png格式的图片的base64编码。 |
| strokes | 数组 | 如果`save_strokes`为true，则该数组会将每一笔绘制作为一个对象添加进去。这些对象有一个`action`属性，取值为`"start"`, `"move"`, 或`"end"`。如果`action`为`"start"`或`"move"`，则对象还会有`x`和`y` 属性，用来记录相对于canvas元素左上角的坐标。如果`action`为`"start"`，则对象还会有`t`和`color`属性，分别记录相对于试次开始时的时间 (ms)和绘制的颜色。如果`action`为`"end"`，则对象只有`t`属性。 |

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "简单的画板，呈现一段提示"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSketchpad,
          prompt: '<p>Draw an apple!</p>',
          prompt_location: 'abovecanvas',
          canvas_width: 300,
          canvas_height: 300,
          canvas_border_width: 2
        }
        ```
    
    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-sketchpad-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-sketchpad-demo1.html">在新标签页中打开</a>

???+ example "使用不同颜色对图片进行分割"
    === "Code"

        ```javascript
        var trial = {
          type: jsPsychSketchpad,
          prompt: '<p style="width:380px">Circle the mouth using red. Circle the eyes using blue.</p>',
          prompt_location: 'abovecanvas',
          stroke_color_palette: ['red', 'blue'],
          stroke_color: 'red',
          background_image: 'img/sad_face_4.jpg',
          canvas_width: 380,
          canvas_height: 252
        }
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-sketchpad-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-sketchpad-demo2.html">在新标签页中打开</a>

???+ example "在指定时间内绘制，然后要求被试绘制的内容命名"
    === "Code"

        ```javascript
        var draw = {
          type: jsPsychSketchpad,
          prompt: '<p>Draw the first animal that comes to mind. You have 30 seconds!</p>',
          prompt_location: 'belowcanvas',
          trial_duration: 30000,
          show_countdown_trial_duration: true,
        }

        var label = {
          type: jsPsychSurveyText,
          preamble: () => {
            var imageData = jsPsych.data.get().last(1).values()[0].png;
            return `<img src="${imageData}"></img>`;
          },
          questions: [
            {prompt: 'What animal did you draw?'}
          ]
        }
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-sketchpad-demo3.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-sketchpad-demo3.html">在新标签页中打开</a>
