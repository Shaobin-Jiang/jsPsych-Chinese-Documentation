# mouse-tracking

这个扩展的作用是追踪光标。特别地，它可以记录[mousemove事件](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)、[mousedown事件](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event)和[mouseup事件](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event)的`x`和`y`坐标以及时间。它还会记录屏幕上的元素的[边界矩形](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)，从而方便我们计算光标相对于屏幕上元素的活动。

## 参数

### 初始化参数

初始化参数在调用`initJsPsych()`时进行设置。

```js
initJsPsych({
  extensions: [
    {type: jsPsychExtensionMouseTracking, params: {...}}
  ]
})
```

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
minimum_sample_time | 数值 | 0 | 检测`mousemove`事件的时间间隔。如果`mousemove`事件的频率比这还高，则会有部分不会被记录下来。如果需要减少数据量，可以使用这个参数。默认值为0，即记录所有的移动事件。

### 试次中的参数

试次中的参数可以在将扩展添加到试次中时进行指定。

```js
var trial = {
  type: jsPsych...,
  extensions: [
    {type: jsPsychExtensionWebgazer, params: {...}}
  ]
}
```

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
targets | 数组 | [] | 需要记录位置的元素。数组中的每个元素都应该是选择了元素的有效的[CSS选择器](https://www.w3schools.com/cssref/css_selectors.asp)。若该选择器选择了多于一个元素，则只会记录第一个匹配的元素。
events | 数组 | ['mousemove'] | 记录的事件。可选值包括'mousemove', 'mousedown', 和 'mouseup'。 

## 数据

名称 | 类型 | 值
-----|------|------
mouse_tracking_data | 数组 | 数组中的每个元素都是一个对象，记录了鼠标活动。每个对象都有一个`x`，一个`y`，一个`t`和一个`event`属性。`x`和`y`属性表示光标相对于左上角的坐标，`t`表示从试次开始到当前所经过的毫秒数，`event`参数的取值可以是'mousemove', 'mousedown', 或 'mouseup'，取决于事件类型。
mouse_tracking_targets | 对象 | 包含了`.targets`参数中指定的元素的坐标。该对象中，每个属性值都是一个对象，代表一个元素，该对象的`x`和`y`属性代表着元素相对于左上角的坐标，`width`和`height`，以及`top`, `bottom`, `left`, 和`right`参数用来表示元素的[边界矩形](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)。

## 示例

???+ example "记录鼠标移动并复现其运动轨迹"
    === "Code"
        ```javascript
        var trial = {
          type: jsPsychHtmlButtonResponse,
          stimulus: '<div id="target" style="width:250px; height: 250px; background-color: #333; margin: auto;"></div>',
          choices: ['Done'],
          prompt: "<p>Move your mouse around inside the square.</p>",
          extensions: [
            {type: jsPsychExtensionMouseTracking, params: {targets: ['#target']}}
          ],
          data: {
            task: 'draw'
          }
        };

        var replay = {
          type: jsPsychHtmlButtonResponse,
          stimulus: '<div id="target" style="width:250px; height: 250px; background-color: #333; margin: auto; position: relative;"></div>',
          choices: ['Done'],
          prompt: "<p>Here's the recording of your mouse movements</p>",
          on_load: function(){
            var mouseMovements = jsPsych.data.get().last(1).values()[0].mouse_tracking_data;
            var targetRect = jsPsych.data.get().last(1).values()[0].mouse_tracking_targets['#target'];
            
            var startTime = performance.now();

            function draw_frame() {
              var timeElapsed = performance.now() - startTime;
              var points = mouseMovements.filter((x) => x.t <= timeElapsed);
              var html = ``;
              for(var p of points){
                html += `<div style="width: 3px; height: 3px; background-color: blue; position: absolute; top: ${p.y - 1 - targetRect.top}px; left: ${p.x - 1 - targetRect.left}px;"></div>`
              }
              document.querySelector('#target').innerHTML = html;
              if(points.length < mouseMovements.length) {
                requestAnimationFrame(draw_frame);
              }
            }

            requestAnimationFrame(draw_frame);

          },
          data: {
            task: 'replay'
          }
        }
        ```
        
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-extension-mouse-tracking-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-extension-mouse-tracking-demo1.html">在新标签页中打开</a>
