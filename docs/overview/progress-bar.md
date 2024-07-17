# 进度条

jsPsych可以在实验页面顶端呈现进度条，以显示当前实验进度。该进度条在包裹jsPsych实验元素的容器外部进行渲染，需要页面引入`jspsych.css`文件。在6.0版本中，进度条是这个样子的：

![Progressbar Screenshot](/img/progress_bar.png)

如果要显示进度条，可以在`initJsPsych`中将`show_progress_bar`选项设置为`true`：

```javascript
const jsPsych = initJsPsych({
	show_progress_bar: true
});
```

进度条在试次结束后自动更新。

## 手动控制

可以通过设置`jsPsych.progressBar.progress`手动控制进度条，取值范围为0 - 1之间。例如，将进度条设置为85%可以这样做：

```js
const trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'Almost done...',
	on_finish: function(){
		jsPsych.progressBar.progress = 0.85; // set progress bar to 85% full.
	}
}
```

还可以用`jsPsych.progressBar.progress`获取当前进度。

```js
const proportion_complete = jsPsych.progressBar.progress;
```

如果需要手动控制，则应该禁用进度条的自动更新，即，在`initJsPsych()`中将`auto_update_progress_bar`属性设置为`false`。 

```js
const jsPsych = initJsPsych({
	show_progress_bar: true,
	auto_update_progress_bar: false
});
```

下面的示例中展示了如何手动更新进度条：

```js
const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false
});

const n_trials = 5;

const start = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Press any key to start!',
    on_start: function() {
        // set progress bar to 0 at the start of experiment
        jsPsych.progressBar.progress = 0
    }
};

const trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'This is a trial!',
    on_finish: function() {
        // at the end of each trial, update the progress bar
        // based on the current value and the proportion to update for each trial
        var curr_progress_bar_value = jsPsych.progressBar.progress;
        jsPsych.progressBar.progress = curr_progress_bar_value + (1/n_trials)
    }
};

const trials = {
    timeline: [trial],
    repetitions: n_trials
};

const done = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: 'Done!'
};

jsPsych.run([start, trials, done]);
```

## 自定义文字

默认情况下，jsPsych在进度条左侧添加"Completion Progress"的字样，但我们也可以在`initJsPsych`中使用`message_progress_bar`参数进行设置。

```js
// support for different spoken languages
const jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: 'Porcentaje completo'
});
```

```js
// no message
const jsPsych = initJsPsych({
    show_progress_bar: true,
    message_progress_bar: ''
});
```
