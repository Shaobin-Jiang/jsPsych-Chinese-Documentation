# 创建实验：时间线

使用jsPsych创建实验时需要通过时间线说明实验的整体结构。时间线包含了实验中的试次。实验开始前必须创建时间线。实验中大部分代码都是用来创建时间线的代码。本页会对时间线的创建进行讲解，并展示一些基本的示例和高级的特性。

## 单个试次

我们通过创建对象来定义一个试次。试次中最重要的属性是`type`参数，该参数告诉试次使用哪个插件。例如，如果我们想要使用文字类的插件呈现一条消息，试次对象应该是这个样子：

```javascript
var trial = {
	type: 'html-keyboard-response',
	stimulus: 'hello world!'
}
```

该对象的参数取决于你选择的插件种类。每个插件都定义了一系列参数，详见各个插件的文档。

如果要在实验中运行这个试次，只需要将该试次对象添加到数组中。时间线就是由试次组成的数组。

```javascript
var timeline = [trial];

jsPsych.init({
	timeline: timeline
});
```

关于如何运行这个示例，详见[呈现hello world的教程](../tutorials/hello-world.html)。

## 多个试次

运行多个试次也很简单，只需要为每个试次创建一个对象，然后将对象添加到时间线数组中即可。

```javascript
// with lots of trials, it might be easier to add the trials
// to the timeline array as they are defined.
var timeline = [];

var trial_1 = {
	type: 'html-keyboard-response',
	stimulus: 'This is trial 1.'
}
timeline.push(trial_1);

var trial_2 = {
	type: 'html-keyboard-response',
	stimulus: 'This is trial 2.'
}
timeline.push(trial_2);

var trial_3 = {
	type: 'html-keyboard-response',
	stimulus: 'This is trial 3.'
}
timeline.push(trial_3);
```

## 嵌套时间线

时间线中的每个对象也可以有自己的时间线。这非常有用，原因之一是因为我们可以一次定义通用的参数然后让这些参数在嵌套时间线上的所有试次中生效。下面的示例中创建了一系列使用image-keyboard-response插件的试次，其中每个试次间唯一的不同在于呈现的图片文件不同。

```javascript
var judgment_trials = {
	type: 'image-keyboard-response',
	prompt: '<p>Press a number 1-7 to indicate how unusual the image is.</p>',
	choices: ['1','2','3','4','5','6','7'],
	timeline: [
		{stimulus: 'image1.png'},
		{stimulus: 'image2.png'},
		{stimulus: 'image3.png'}
	]
}
```

上面的代码中，`type`, `prompt`, 和 `choices`参数对`timeline`数组中所有的对象都生效。这样，我们就创建了三个有着相同`type`, `prompt`, 和 `choices`参数但`stimulus`不同的试次。

我们也可以在`timeline`中的某个试次内对所有试次通用的值进行覆盖。下面的示例中，第二个试次会呈现不同的prompt信息。

```javascript
var judgment_trials = {
	type: 'image-keyboard-response',
	prompt: '<p>Press a number 1-7 to indicate how unusual the image is.</p>',
	choices: ['1','2','3','4','5','6','7'],
	timeline: [
		{stimulus: 'image1.png'},
		{stimulus: 'image2.png', prompt: '<p>Press 1 for this trial.</p>'},
		{stimulus: 'image3.png'}
	]
}
```

时间线可以嵌套多次。

## 时间线变量

行为实验中的一个常见模式是多次重复一个相同的流程，且每次对参数微调。这个流程可能是单个试次，也可能是一系列试次。实现这种功能的一种简单办法是使用前一部分中描述的方法，但是该方法只适用于所有的试次都使用相同插件的时候。时间线变量则是一个更通用的解决方案。使用时间线变量时，我们通过一条时间线定义这个流程，然后指定每次迭代中改变的参数及参数值。

下面的例子中，我们展示了如何使用时间线变量。[简单反应时教程](../tutorials/rt-task.html)也讲解了如何使用时间线变量。

假设我们需要创建一个实验，实验中会向被试呈现人脸图片。假设这是一个记忆实验，且处于实验中第一次给被试呈现人脸图片的阶段。在每张人脸图片之间，我们要呈现一个注视点。如果不使用时间线变量，就需要添加很多试次，其中注视点试次和呈现人脸图片及名字的试次交替添加。我们的确可以通过循环或函数简化这一流程，但是用时间线变量会更简单，而且同时还可以使用选取试次和随机的功能。

下面是使用时间线变量的简单的版本。

```javascript
var face_name_procedure = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: '+',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		},
		{
			type: 'image-keyboard-response',
			stimulus: jsPsych.timelineVariable('face'),
			choices: jsPsych.NO_KEYS,
			trial_duration: 2500
		}
	],
	timeline_variables: [
		{ face: 'person-1.jpg' },
		{ face: 'person-2.jpg' },
		{ face: 'person-3.jpg' },
		{ face: 'person-4.jpg' }
	]
}
```

上面的代码中，`timeline_variables`参数中定义了四个试次，每个试次中都用到了`face`变量。`timeline`定义了一个先呈现注视点500ms、然后呈现人脸图片2500ms的流程。该流程会重复四次，第一次呈现person1.jpg，第二次呈现person2.jpg，以此类推。该变量通过`jsPsych.timelineVariable()`方法进行调用，调用时只需要将变量名称传进去。

如果我们需要刺激更复杂一些，比如说在人脸下面加上名字呢？我们再额外添加一个步骤，即，在呈现人脸前呈现人名（或许这是一个探究人名和人脸图片出现顺序影响的实验中的一个条件）。

现在，我们用动态参数（函数）替代`jsPsych.timelineVariable()`作为stimulus参数的值，并在函数内部调用`jsPsych.timelineVariable()`。这样，我们的参数值就包含了更多的信息，既有随试次改变的量 (来自`timeline_variables`数组)，也有不变的量。下面的示例中，我们改为使用"html-keyboard-response"插件，这样我们可以用HTML字符串作为刺激内容，从而同时呈现图片和文字。stimulus参数值为一个返回HTML字符串的函数，该字符串包含了人脸图片和姓名。(注意，使用早些版本的jsPsych时，通过函数内部调用`jsPsych.timelineVariable()`还需要额外指定一个`true`参数。但在jsPsych v6.3中，`jsPsych.timelineVariable()`会自动检测是在哪里被调用的，所以不需要额外指定该参数)。


```javascript
var face_name_procedure = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: '+',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		},
		{
			type: 'html-keyboard-response',
			stimulus: jsPsych.timelineVariable('name'),
			trial_duration: 1000,
			choices: jsPsych.NO_KEYS
		},
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				var html="<img src='"+jsPsych.timelineVariable('face')+"'>";
				html += "<p>"+jsPsych.timelineVariable('name')+"</p>";
				return html;
			},			
			choices: jsPsych.NO_KEYS,
			trial_duration: 2500
		}
	],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	]
}
```
### 试次顺序随机

如果需要对试次顺序随机，可以将`randomize_order`设置为`true`。

```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	randomize_order: true
}
```

### 抽取试次方法

jsPsych提供了从timeline_variables中抽取一部分试次进行执行的抽样方法，通过`sample`参数设定。该参数值为一个对象，其中`type`参数指定了抽样的类型，可以取以下值：

* `"with-replacement"`: 从时间线变量中取出 `size` 个试次，一个试次可以重复抽取。
* `"without-replacement"`: 从时间线变量中取出 `size` 个试次，每个试次最多抽取一次。
* `"fixed-repetitons"`: 将时间线变量中的每个变量重复 `size`次并对顺序随机。不同于使用 `repetitons` 参数，该方法允许相同试次连续出现。
* `"alternate-groups"`: 根据分组交替进行抽取。分组通过 `groups` 参数定义，该参数值为包含了多个数组的数组，数组内的每个数组对应一个分组，内部数组的每个元素是该组中的试次在`timeline_variables`内的位置。
* `"custom"`: 自定义的函数。

#### 有重复地抽取
```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'with-replacement',
		size: 10, // 10 trials, with replacement
	}
}
```

#### 有重复地抽取, 但权重不同
```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'with-replacement',
		size: 10, // 10 trials, with replacement
		weights: [3, 1, 1, 1], // The Alex trial is three times as likely to be sampled as the others.
	}
}
```

#### 不重复地抽取
```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'without-replacement',
		size: 3, // 3 trials, without replacement
	}
}
```

#### 将每个试次重复固定次数并对顺序进行随机
```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'fixed-repetitions',
		size: 3, // 3 repetitions of each trial, 12 total trials, order is randomized.
	}
}
```

#### 在不同组间交替抽取
```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'alternate-groups',
		groups: [[0,2],[1,3]], // Alex and Chad are in group 1. Beth and Dave are in group 2. 
		randomize_group_order: false // The first trial will be an item from group 1.
	}
}
```

#### 自定义抽取
```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'custom',
		fn: function(t){
			// the first parameter to this function call is an array of integers
			// from 0 to n-1, where n is the number of trials.
			// the method needs to return an array of integers specifying the order
			// that the trials should be executed. this array does not need to
			// contain all of the integers.

			return t.reverse(); // show the trials in the reverse order
		}
	}
}
```

## 重复一系列试次

如果要将时间线重复执行，可以创建一个包含了`timeline`的对象（节点），其中`timeline`就是要重复的时间线数组，并指定`repetitions`，即重复次数。

```javascript
var trial = {
	type: 'html-keyboard-response',
	stimulus: 'This trial will be repeated twice.'
}

var node = {
	timeline: [trial],
	repetitions: 2
}
```

`repetitions`参数可以和其他参数一起使用，如timeline_variales、loop_function、以及conditional_function。如果使用了`timeline_variables`且`randomize_order`为true，则每次重复时会对时间线变量的顺序进行随机。

```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	randomize_order: true,
	repetitions: 3 
}
```

## 循环时间线

时间线可以通过 `loop_function` 循环执行。loop_function是一个函数，如果需要循环则返回true，如果需要结束则返回false。该函数接受一个传入参数，通常命名为`data`。该参数为时间线上一次循环中收集的[数据集对象](/core_library/jspsych-data.html#datacollection)。时间线执行一次后，会执行loop_function。

```javascript
var trial = {
	type: 'html-keyboard-response',
	stimulus: 'This trial is in a loop. Press R to repeat this trial, or C to continue.'
}

var loop_node = {
	timeline: [trial],
	loop_function: function(data){
		if(jsPsych.pluginAPI.compareKeys(data.values()[0].response, 'r')){
			return true;
		} else {
			return false;
		}
	}
}
```

## 条件时间线

时间线可以通过 `conditional_function` 跳过。如果conditional_function返回true，则时间线正常执行；如果返回false，则会跳过时间线。conditional_function在运行时间线的第一个试次前执行。

```javascript
var pre_if_trial = {
	type: 'html-keyboard-response',
	stimulus: 'The next trial is in a conditional statement. Press S to skip it, or V to view it.'
}

var if_trial = {
	type: 'html-keyboard-response',
	stimulus: 'You chose to view the trial. Press any key to continue.'
}

var if_node = {
	timeline: [if_trial],
	conditional_function: function(){
		// get the data from the previous trial,
		// and check which key was pressed
		var data = jsPsych.data.get().last(1).values()[0];
		if(jsPsych.pluginAPI.compareKeys(data.response, 's')){
			return false;
		} else {
			return true;
		}
	}
}

var after_if_trial = {
	type: 'html-keyboard-response',
	stimulus: 'This is the trial after the conditional.'
}

jsPsych.init({
	timeline: [pre_if_trial, if_node, after_if_trial],
	on_finish: function(){jsPsych.data.displayData(); }
});
```

## 时间线开始和结束时执行的函数

我们可以在时间线开始和结束时，通过`on_timeline_start`和`on_timeline_finish`参数执行特定函数。这两个函数分别在时间线开始和结束时执行对应的回调。

```javascript
var procedure = {
	timeline: [trial_1, trial_2],
	on_timeline_start: function() {
		console.log('The trial procedure just started.')
	},
	on_timeline_finish: function() {
		console.log('The trial procedure just finished.')
	}
}
```

这个示例中，如果使用时间线变量效果不会发生变化。`on_timeline_start` 和 `on_timeline_finish` 函数会在试次开始开始和结束时调用。

```javascript
var face_name_procedure = {
	// timeline parameter hidden to save space ...
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	randomize_order: true,
	on_timeline_start: function() {
		console.log('First trial is starting.')
	},
	on_timeline_finish: function() {
		console.log('Last trial just finished.')
	}
}
```

如果使用了`repetititons`参数 (且大于1)，则这些函数每次重复时间线的时候都会执行一次。

```javascript
var repetition_count = 0;

var procedure = {
	timeline: [trial_1, trial_2],
	repetitions: 3,
	on_timeline_start: function() {
		repetition_count++;
		console.log('Repetition number ',repetition_count,' has just started.');
	},
	on_timeline_finish: function() {
		console.log('Repetition number ',repetition_count,' has just finished.')
	}
}
```