# 事件相关回调函数

jsPsych可以在特定事件发生时调用自定义的函数，例如在试次结束时或者是记录新的数据的时候。当前页总结了不同的事件以及如何为它们定义回调函数。

---

## on_close

`on_close`回调可以在`initJsPsych`方法中进行声明，在被试离开当前页时、页面内容被从浏览器存储中清除前触发。例如，可以在被试离开当前页的时候保存数据。

```javascript
initJsPsych({
  on_close: function(){
    var data = jsPsych.data.get().json();
    save_data_to_server(data);
  }
});
```

---

## on_data_update

`on_data_update`回调可以在`initJsPsych`方法中进行声明，在数据更新后触发。这个事件在每个试次结束后都会发生，晚于试次的on_finish和on_trial_finish事件，从而方便我们对这些回调中的数据进行修改，并在当前回调中对修改过的数据进行存储。当前函数接受一个参数，包含了新加入的数据。

```javascript
initJsPsych({
  on_data_update: function(data) {
    console.log('Just added new data. The contents of the data are: '+JSON.stringify(data));
  }
});
```

---

## on_finish (单个试次)

`on_finish`回调可以出现在任何试次当中，在试次结束时触发。该回调函数接受一个传入参数，包含了当前试次的数据对象。可以对该数据对象进行编辑，所做的修改会在jsPsych内部存储的数据中生效。

```javascript
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'imgA.png',
  on_finish: function(data) {
    if(jsPsych.pluginAPI.compareKeys(data.response, 'j')){
      data.correct = true;
    } else {
      data.correct = false;
    }
  }
};
```

---

## on_finish (整个实验)

`on_finish`回调可以在`initJsPsych`方法中进行声明，在实验中所有试次都结束后触发。该回调函数接受一个传入参数，包含了实验中全部的数据对象。

```javascript
initJsPsych({
  on_finish: function(data) {
    console.log('The experiment is over! Here is all the data: '+JSON.stringify(data));
  }
});
```

---

## on_load

`on_load`回调可以出现在任何试次中，在试次完成加载后触发。对于多数插件，这个事件指的是所有内容都已经呈现但还没有交互或开始计时（如：动画）。

```javascript
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'imgA.png',
  on_load: function() {
    console.log('The trial just finished loading.');
  }
};
```

---

## on_start (单个试次)

`on_start`回调可以出现在任何试次中，在试次开始前触发。该函数接受一个传入参数，为当前试次对象。如果试次中的某个参数值是函数或时间线变量，则在调用`on_start`前会对这些值进行计算，传入的试次对象的值是计算好的。可以对试次对象进行修改，所做改动会直接影响当前试次。

```javascript
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'imgA.png',
  on_start: function(trial) {
    console.log('The trial is about to start.');
    trial.stimulus = 'imgB.png'; // this will change what stimulus is displayed in the trial
  }
};
```

---

## on_timeline_finish

`on_timeline_finish`回调可以在使用时间线的试次中进行定义，在当前时间线结束时触发。如果使用了`timeline_variables`, `conditional_function`, `loop_function`, 或 `sample` ，该函数会在所有试次结束后运行。如果使用了`loop_function`，则该函数会在loop function前执行。如果使用了`repetitions`，则该函数会在每次重复后执行。

```javascript
var procedure = {
	timeline: [trial1, trial2],
	timeline_variables: [
		{ stimulus: 'person-1.jpg' },
		{ stimulus: 'person-2.jpg' },
		{ stimulus: 'person-3.jpg' },
		{ stimulus: 'person-4.jpg' }
	],
  on_timeline_finish: function() {
    console.log('This timeline has finished.');
  },
  loop_function: function() {
    console.log('This loop function will execute after on_timeline_finish.');
    return false;
  }
}
```

---

## on_timeline_start

`on_timeline_start`回调可以在使用时间线的试次中进行定义，在当前时间线开始时触发，使用了`timeline_variables`,  `loop_function`, 或 `sample` 时也是这样。如果使用了`conditional_function`，则会先执行conditional function，且只有在它返回true时才会执行`on_timeline_start`。如果使用了`repetitions`，则该函数会在每次重复开始时执行。

```javascript
var procedure = {
	timeline: [trial1, trial2],
  conditional_function: function() {
    console.log('This conditional function will execute first.')
    return true;
  },
  on_timeline_start: function() {
    console.log('This timeline has started');
  }
}
```

---

## on_trial_finish

`on_trial_finish`回调可以在`initJsPsych`方法中进行声明，在实验中每一个试次结束时、试次对象的[`on_finish`](#on_finish)结束后触发。当前回调函数只接受一个传入参数，为对应试次中的数据对象。如果你只想在特定试次结束后触发该回调，可以在试次中指定[`on_finish`](#on_finish)。

```javascript
initJsPsych({
  on_trial_finish: function(data) {
    console.log('A trial just ended.');
    console.log(JSON.stringify(data));
  }
});
```

---

## on_trial_start

`on_trial_start`回调可以在`initJsPsych`方法中进行声明，在实验中每一个试次开始时、试次的`on_start`开始前触发。该回调函数只接受一个传入参数，为接下来要运行的试次对象，可以通过修改该对对象来对接下来的试次进行调整。

```javascript
var current_score = 0; // a variable that is updated throughout the experiment to keep track of the current score.

initJsPsych({
  on_trial_start: function(trial) {
    trial.data.score_at_start_of_trial = current_score;
    console.log('A trial just started.');
  }
});
```
