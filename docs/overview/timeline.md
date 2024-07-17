# 创建实验：时间线

使用jsPsych创建实验时需要通过时间线说明实验的整体结构。时间线包含了实验中的试次。实验开始前必须创建时间线。实验中大部分代码都是用来创建时间线的。本页会对时间线的创建进行讲解，并展示一些基本的示例和高级的特性。

## 单个试次

我们通过创建对象来定义一个试次。试次中最重要的属性是`type`参数，该参数告诉试次使用哪个插件。例如，如果要使用[html-keyboard-response插件](../plugins/html-keyboard-response.md)呈现一条消息，试次对象应该是这个样子：

```javascript
const trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'Welcome to the experiment.'
}
```

该对象的参数 (如`stimulus`)取决于你选择的插件种类。每个插件都定义了一系列参数，详见各个插件的文档。每个插件都定义了一些列运行实验时会用到的参数。在各个插件的文档页中可以查看它们可以使用的参数。

如果要创建一个只有一个试次的时间线并运行，就只需要把这个试次对象添加到数组里。最简单的时间线就是一个由试次对象组成的数组。

```javascript
const timeline = [trial];

jsPsych.run(timeline);
```

关于如何创建、运行这种简单的试验任务，详见[呈现hello world的教程](../tutorials/hello-world.md)。

## 多个试次

运行多个试次也很简单，只需要为每个试次创建一个对象，然后将对象添加到时间线数组中即可。

```javascript
// with lots of trials, it might be easier to add the trials
// to the timeline array as they are defined.
const timeline = [];

const trial_1 = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'This is trial 1.'
}
timeline.push(trial_1);

const trial_2 = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'This is trial 2.'
}
timeline.push(trial_2);

const trial_3 = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'This is trial 3.'
}
timeline.push(trial_3);
```

## 嵌套时间线

时间线中的每个对象也可以有自己的时间线。这非常实用，原因之一是因为，对于嵌套的时间线上的试次，那些重复使用的参数我们可以只定义一次，这些参数会对这些试次都生效。下面的示例中创建了一系列使用[image-keyboard-response插件](../plugins/image-keyboard-response/)的试次，其中试次间唯一的不同在于呈现的图片文件不同。

```javascript
const judgment_trials = {
	type: jsPsychImageKeyboardResponse,
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
const judgment_trials = {
	type: jsPsychImageKeyboardResponse,
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

行为实验中的一个常见模式是多次重复一个相同的流程，且每次对参数微调。这个流程可能只包含单个试次，也可能包含一系列试次。例如，任务中可能会包括注视点的呈现、空屏、呈现图片、呈现问题和输入框等。

实现这种功能的一种简单办法是使用前一部分中提到的嵌套时间线，但是该方法只在流程中所有的试次都使用相同插件的时候适用。时间线变量则是一个更通用的解决方案。使用时间线变量时，我们可以通过一条时间线定义这个流程，然后指定每次迭代中改变的参数及参数值。

下面的例子中，我们展示了如何使用时间线变量。[简单反应时教程](../tutorials/rt-task.md)也讲解了如何使用时间线变量。

假设我们需要创建一个实验，实验中会向被试呈现人脸图片。假设这是一个记忆实验，且处于实验中第一次给被试呈现人脸图片的阶段。在每张人脸图片之间，我们要呈现一个注视点。如果不使用时间线变量，就需要添加很多试次，其中注视点试次和呈现人脸图片及名字的试次交替添加。我们倒是可以通过循环或函数简化这一流程，但是用时间线变量会更简单，而且同时还可以使用随机等功能。

下面是使用时间线变量的简单示例。

```javascript
const face_name_procedure = {
	timeline: [
		{
			type: jsPsychHtmlKeyboardResponse,
			stimulus: '+',
			choices: "NO_KEYS",
			trial_duration: 500
		},
		{
			type: jsPsychImageKeyboardResponse,
			stimulus: jsPsych.timelineVariable('face'),
			choices: "NO_KEYS",
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

上面的代码中，`timeline_variables`参数中定义了四个试次，每个试次中都用到了`face`变量。`timeline`定义了一个先呈现注视点500ms、然后呈现人脸图片2500ms的流程。该流程会重复四次，第一次呈现`'person1.jpg'`，第二次呈现`'person2.jpg'`，以此类推。该变量通过`jsPsych.timelineVariable()`方法进行调用，调用时只需要将变量名称传进去。

如果我们想要在人脸图片呈现之前显示人名呢 (或许这是一个探究人名和人脸图片出现顺序影响的实验中的一个条件)？我们可以在时间线变量中再添加一个变量，将图片和人名联系起来，然后再在时间线中加入一个试次用来显示这个名字。

```javascript
const face_name_procedure = {
	timeline: [
		{
			type: jsPsychHtmlKeyboardResponse,
			stimulus: '+',
			choices: "NO_KEYS",
			trial_duration: 500
		},
		{
			type: jsPsychHtmlKeyboardResponse,
			stimulus: jsPsych.timelineVariable('name'),
			trial_duration: 1000,
			choices: "NO_KEYS"
		},
		{
			type: jsPsychImageKeyboardResponse,
			stimulus: jsPsych.timelineVariable('face'),			
			choices: "NO_KEYS",
			trial_duration: 1000
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

### 在函数中使用时间线变量

继续看前一部分的例子，如果想把人脸和人名一起呈现该怎么办呢？我们可以使用[动态参数](dynamic-parameters.md) (函数)去创建一段HTML字符串，从而将两个变量传入到一个参数当中。不过，由于是在函数中使用时间线变量，我们需要使用`jsPsych.evaluateTimelineVariable()`而不是`jsPsych.timelienVariable()`。`.evaluateTimelineVariable()`会在被调用时直接返回相应的变量值，而`.timelineVariable()`会创建一个“占位值”，在实验进行到这里的时候才会由jsPsych进行赋值。`stimulus`参数的值就变成了一个函数，其返回值是同时包含了图片和人名的HTML字符串。

```javascript
const face_name_procedure = {
	timeline: [
		{
			type: jsPsychHtmlKeyboardResponse,
			stimulus: '+',
			choices: "NO_KEYS",
			trial_duration: 500
		},
		{
			type: jsPsychHtmlKeyboardResponse,
			stimulus: jsPsych.timelineVariable('name'),
			trial_duration: 1000,
			choices: "NO_KEYS"
		},
		{
			type: jsPsychHtmlKeyboardResponse,
			stimulus: function(){
				const html = `
					<img src="${jsPsych.timelineVariable('face')}">
					<p>${jsPsych.timelineVariable('name')}</p>`;
				return html;
			},			
			choices: "NO_KEYS",
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

如果需要对时间线变量定义的试次顺序随机，可以将`randomize_order`设置为`true`。

```javascript
const face_name_procedure = {
	timeline: [...],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	randomize_order: true
}
```

### 抽样

jsPsych提供了从timeline_variables中抽取一部分试次进行执行的抽样方法，通过`sample`参数设定。该参数值为一个对象，其中`type`参数指定了抽样的类型，可以取以下值：

* `"with-replacement"`: 从时间线变量中取出 `size` 个试次，一个试次可以重复抽取。
* `"without-replacement"`: 从时间线变量中取出 `size` 个试次，每个试次最多抽取一次。
* `"fixed-repetitons"`: 将时间线变量中的每个变量重复 `size`次并对顺序随机。不同于使用 `repetitons` 参数，该方法允许相同试次连续出现。
* `"alternate-groups"`: 根据分组交替进行抽取。分组通过 `groups` 参数定义，该参数值为包含了多个数组的数组，数组内的每个数组对应一个分组，内部数组的每个元素是该组中的试次在`timeline_variables`内的位置。
* `"custom"`: 自定义的函数。

<h4 id="sampling-with-replacement">有重复地抽取</h4>

`sample`参数的含义是，有重复地从时间线变量中抽取10次。

```javascript
const face_name_procedure = {
	timeline: [...],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'with-replacement',
		size: 10
	}
}
```

<h4 id="sampling-with-replacement-unequal-probabilities">有重复地抽取, 但权重不同</h4>

`sample`参数地设置会使得"Alex"被抽中的概率是其他的3倍。

```javascript
const face_name_procedure = {
	timeline: [...],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'with-replacement',
		size: 10, 
		weights: [3, 1, 1, 1]
	}
}
```

<h4 id="sampling-without-replacement">不重复地抽取</h4>

`sample`参数的含义是从四个时间线变量中随机抽取三个。

```javascript
const face_name_procedure = {
	timeline: [...],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'without-replacement',
		size: 3 
	}
}
```

<h4 id="repeating-each-trial-a-fixed-number-of-times-in-a-random-order">将每个试次重复一定次数并对顺序进行随机</h4>

`sample`参数的含义是将每个参数重复3次 (共计12个试次)并对顺序进行随机。

```javascript
const face_name_procedure = {
	timeline: [...],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'fixed-repetitions',
		size: 3
	}
}
```

<h4 id="alternating-groups">在不同组间交替抽取</h4>

`sample`参数的含义是，将"Alex"和"Chad"放入组1，将"Beth"和"Dave"放入组2。这样，在抽样的时候，就会按照`组1` -> `组2` -> `组1` -> `组2`的顺序进行。每一个试次只能抽取一次。如果你希望有些时候`组2`也能被先抽到，则可以设置`randomize_group_order: true`。

```javascript
const face_name_procedure = {
	timeline: [...],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'alternate-groups',
		groups: [[0,2],[1,3]],  
		randomize_group_order: false
	}
}
```

<h4 id="custom-sampling-function">自定义抽取</h4>

我们也可以使用`custom`类型的抽样，此时抽取的试次顺序就由`fn`决定。该函数接受一个传入参数`t`，该参数是一个从`0`到`n-1`的数组，其中`n`是`timeline_variables`数组中试次的数量。该函数的返回值需要是指定试次顺序的数组，例如，`[3,3,2,2,1,1,0,0]`的含义是，试次顺序为 `Dave` -> `Dave` -> `Chad` -> `Chad` -> `Beth` -> `Beth` -> `Alex` -> `Alex`。

```javascript
const face_name_procedure = {
	timeline: [...],
	timeline_variables: [
		{ face: 'person-1.jpg', name: 'Alex' },
		{ face: 'person-2.jpg', name: 'Beth' },
		{ face: 'person-3.jpg', name: 'Chad' },
		{ face: 'person-4.jpg', name: 'Dave' }
	],
	sample: {
		type: 'custom',
		fn: function(t){
			return t.reverse(); // show the trials in the reverse order
		}
	}
}
```

## 重复一系列试次

如果要将时间线重复执行，可以创建一个包含了`timeline`的对象 (节点)，其中`timeline`就是要重复的时间线数组，并指定`repetitions`，即重复次数。

```javascript
const trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'This trial will be repeated twice.'
}

const node = {
	timeline: [trial],
	repetitions: 2
}
```

`repetitions`参数可以和其他参数一起使用，如timeline_variales、loop_function、以及conditional_function。如果使用了`timeline_variables`且`randomize_order`为true，则每次重复时会对时间线变量的顺序进行随机。

```javascript
const face_name_procedure = {
	timeline: [...],
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

时间线可以通过 `loop_function` 循环执行。loop_function是一个函数，如果需要循环则返回`true`，如果需要结束则返回`false`。该函数接受一个传入参数，通常命名为`data`。该参数为时间线上一次循环中收集的[数据集对象](/core_library/jspsych-data.md#datacollection)。时间线执行一次后，会执行loop_function。

```javascript
const trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'This trial is in a loop. Press R to repeat this trial, or C to continue.'
}

const loop_node = {
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

时间线可以通过 `conditional_function` 跳过。如果conditional_function返回`true`，则时间线正常执行；如果返回`false`，则会跳过时间线。conditional_function在运行时间线的第一个试次前执行。

如果同一条时间线上同时使用`conditional_function`和`loop_function`，则前者只会被执行一次。

```javascript
const jsPsych = initJsPsych();

const pre_if_trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'The next trial is in a conditional statement. Press S to skip it, or V to view it.'
}

const if_trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'You chose to view the trial. Press any key to continue.'
}

const if_node = {
	timeline: [if_trial],
	conditional_function: function(){
		// get the data from the previous trial,
		// and check which key was pressed
		const data = jsPsych.data.get().last(1).values()[0];
		if(jsPsych.pluginAPI.compareKeys(data.response, 's')){
			return false;
		} else {
			return true;
		}
	}
}

const after_if_trial = {
	type: jsPsychHtmlKeyboardResponse,
	stimulus: 'This is the trial after the conditional.'
}

jsPsych.run([pre_if_trial, if_node, after_if_trial]);
```

## 时间线开始和结束时执行的函数

我们可以在时间线开始和结束时，通过`on_timeline_start`和`on_timeline_finish`参数执行特定函数。这两个函数分别在时间线开始和结束时执行对应的回调。

```javascript
const procedure = {
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
const face_name_procedure = {
	timeline: [...],
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
const repetition_count = 0;

const procedure = {
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
