# 进度条

jsPsych可以在实验页面顶端呈现进度条，以显示当前实验进度。该进度条在包裹jsPsych实验元素的容器外部进行渲染，需要页面引入`jspsych.css`文件。在6.0版本中，进度条是这个样子的：

![Progressbar Screenshot](/img/progress_bar.png)

如果要显示进度条，可以在`initJsPsych`中将`show_progress_bar`选项设置为`true`：

```javascript
var jsPsych = initJsPsych({
	show_progress_bar: true
});
```

进度条随着主时间线中的节点更新，这样就不会在使用了多个插件的试次中间进行更新，也不会因为使用了循环或条件结构、但因为被试的反应而没有执行时进行更新而让被试感到莫名其妙。此外，这也给编程提供了比较大的操作空间，我们可以通过嵌套时间线来控制进度条的更新。

## 手动控制

可以通过`jsPsych.setProgressBar()`手动控制进度条。该函数接受一个0 - 1之间的数值作为传入参数，该值代表着进度条进度的百分比。

```js
var trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'Almost done...',
	on_finish: function(){
		jsPsych.setProgressBar(0.85); // set progress bar to 85% full.
	}
}
```

还可以用`jsPsych.getProgressBarCompleted()`获取当前进度。

```js
var proportion_complete = jsPsych.getProgressBarCompleted();
```

如果需要手动控制，则应该禁用进度条的自动更新，即，在`initJsPsych()`中将`auto_update_progress_bar`属性设置为`false`。 

```js
var jsPsych = initJsPsych({
	show_progress_bar: true,
	auto_update_progress_bar: false
});
```

下面的示例中展示了如何手动更新进度条：

```js
var jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false
});

var n_trials = 5;

var start = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Press any key to start!',
    on_start: function() {
        // set progress bar to 0 at the start of experiment
        jsPsych.setProgressBar(0);
    }
};

var trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'This is a trial!',
    on_finish: function() {
        // at the end of each trial, update the progress bar
        // based on the current value and the proportion to update for each trial
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + (1/n_trials));
    }
};

var trials = {
    timeline: [trial],
    repetitions: n_trials
};

var done = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Done!'
};

jsPsych.run([start, trials, done]);
```

## 自定义文字

默认情况下，jsPsych在进度条左侧添加"Completion Progress"的字样，但我们也可以在`initJsPsych`中使用`message_progress_bar`参数进行设置。

```js
// support for different spoken languages
var jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: 'Porcentaje completo'
});
```

```js
// no message
var jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: ''
});
```