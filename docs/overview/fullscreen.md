# 全屏实验

我们可以使用jspsych-fullscreen插件在全屏模式下运行实验。

```javascript
var jsPsych = initJsPsych();

var timeline = [];

timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true
});

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'This trial will be in fullscreen mode.'
});

// exit fullscreen mode
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: false
});

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'This trial will NOT be in fullscreen mode.'
});

jsPsych.run(timeline);
```

出于安全方面的考虑，浏览器要求被试先和浏览器进行交互才能进入全屏。所以，fullscreen插件会呈现一个按钮，被试通过点击该按钮进入全屏。

全屏模式下，Safari不支持键盘输入。所以，在Safari中不会进入全屏模式，实验会忽略所有使用fullscreen插件的试次。
