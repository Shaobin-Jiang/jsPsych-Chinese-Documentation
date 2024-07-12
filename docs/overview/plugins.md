# 插件

jsPsych中，插件定义了实验中的试次或事件。一些插件定义的是比较宽泛的事件，比如呈现指导语，呈现图片并记录按键，或播放音频并记录点击按钮的行为。其他的插件内容则更具体一些，如呈现特定类型刺激的插件（如，随机运动点阵，视觉搜索任务），或运行特定实验任务的插件（如，内隐联想测验）。使用jsPsych创建实验时，我们需要弄清楚具体使用哪些插件来添加需要被试完成的任务。

插件提供的是试次或任务的整体结构，允许我们灵活地进行自定义。例如，`image-keyboard-response`插件的功能是呈现图片并记录按键，但是我们可以定义刺激内容是什么，被试可以按哪些键，刺激呈现多久，被试反应的时间限制，等等。这些选项中很多都有默认值，虽然该插件有很多参数，但你只需要指定其中几个就可以进行使用。每个插件都有自己的文档，描述了插件的功能、可选参数以及收集的数据。

## 使用插件

使用插件时，我们需要将插件对应的JavaScript文件加载到实验的HTML文件内。jsPsych的实验文件都需要加载jsPsych.js文件。

```html
<head>
  <script src="jsPsych/jspsych.js" type="text/javascript"></script>
  <script src="jsPsych/plugins/jspsych-image-keyboard-response.js" type="text/javascript"></script>
</head>
```

加载好插件后，我们可以添加使用JavaScript定义使用该插件的试次。所有的jsPsych试次都有`type`属性，会告诉jsPsych当前试次使用哪个插件。试次的`type`值就是插件的名字，通常是将插件的文件名同名，但会删除前缀部分中的"jspsych-"。

下面的JavaScript代码定义了一个使用`image-keyboard-response`插件呈现图片的试次。该试次中有效按键、刺激持续时间、试次持续时间以及其他参数都使用了默认值。

```javascript
var image_trial = {
	type: 'image-keyboard-response', 
	stimulus: 'images/happy_face.jpg'
}
```

我们可以通过在试次中设置参数值以覆盖其默认值。下面的例子中，我们用自定义的值代替了`trial_duration`和`post_trial_gap`的默认值:

```javascript
var image_trial = {
  type: 'image-keyboard-response',
  stimulus: 'images/happy_face.jpg',
  trial_duration: 3000,
  post_trial_gap: 2000
}
```

## 所有插件都有的参数

每个插件都有自己的参数，详见其对应的文档。

不过，所有插件也都有着共同的一些参数：

| 参数      | 类型     | 默认值                  | 描述                              |
| -------------- | -------- | ----------------------- | ---------------------------------------- |
| data           | 对象   | *undefined*             | 包含了需要额外记录的数据的对象，详见[数据存储、汇总和操作部分](../overview/data.html) 。 |
| post_trial_gap | 数值  | null                    | 设置当前试次和下一个试次之间间隔的毫秒数。如果为null则没有间隔。 |
| on_start       | 函数 | `function(){ return; }` | 试次开始时、加载开始前执行的回调函数。详见[事件相关回调函数](../overview/callbacks.html)。 |
| on_finish      | 函数 | `function(){ return; }` | 试次结束时、下一个试次开始前执行的回调函数。详见[事件相关回调函数](../overview/callbacks.html)。 |
| on_load        | 函数 | `function(){ return; }` | 试次加载完成时执行的回调函数，一般是呈现内容刚刚完成加载的时候。详见[事件相关回调函数](../overview/callbacks.html)。 |
| css_classes    | 字符串   | null                    | 给当前试次中呈现实验内容的元素添加的class名。这样，我们就可以添加只在当前试次生效的CSS样式。详见[控制呈现样式部分](../overview/style.html)及jsPsych的examples文件夹下的"css-classes-parameter.html"文件。 |
| save_trial_parameters | 对象 | `{}` | 包含了应该或不应该记录到数据中的当前试次的参数。其中，每个属性名和试次参数同名，其值根据是否需要记录到数据中为true或false。如果某个参数值是通过函数返回的，则数据中记录的该参数值为相应函数的返回值。如果某个参数值就是一个函数（如，回调函数），则会将函数本身保存为字符串。详见jsPsych的examples文件夹下的"save-trial-parameters.html"文件。 |

### data参数

`data`参数允许我们向数据中添加额外的属性。这有助于我们记录一些插件不会自己记录的数据。`data`参数的值应该是对象。

一个简单的例子就是[Flanker任务](https://en.wikipedia.org/wiki/Eriksen_flanker_task)。实验中，被试需要通过按键对屏幕中央箭头的朝向进行反应。箭头周围还有其他箭头出现，但被试需要无视它们。这些剪头方向可以是一致的 (>>>>>) 或不一致的 (<<><<)。

使用jsPsych创建Flanker任务的代码如下：

```javascript
var trial = {
  type: 'html-keyboard-response',
  stimulus: '<<<<<',
  choices: ['f','j'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'left'
  }
}
```

注意，我们使用data参数添加了`stimulus_type`参数，其值为`congruent`，还添加了`target_direction`参数，其值为`left`。这些数据大大简化了数据分析过程，我们可以直接根据`stimulus_type`及`target_direction`进行汇总。

### post_trial_gap (ITI)参数

jsPsych默认的试次间间隔 (ITI)为0ms。我们可以在`jsPsych.init()`中通过改变`default_iti`参数对全局的ITI进行设置。

不过，我们也可以通过`post_trial_gap`参数改变某一个试次的ITI。如果将该参数设为整数x，则当前试次结束后会呈现x毫秒的空屏。该参数会覆盖`jsPsych.init`中的`default_iti`参数。

```javascript
var trial = {
  type: 'html-keyboard-response',
  stimulus: 'There will be a 1.5 second blank screen after this trial.',
  post_trial_gap: 1500
}
```

### on_start参数

我们可以在试次开始前运行自己定义的函数，这是通过`on_start`实现的。该函数只接受一个传入参数，是当前的试次对象，其参数可以编辑。因此，我们可以利用这个函数，根据实验的状态，调整接下来的试次。

```javascript
// when this trial runs, the on_start function will change the trial's stimulus and data parameters,
// so the trial will display an incongruent Flanker stimulus with a right-facing central arrow
var trial = {
  type: 'html-keyboard-response',
  stimulus: '<<<<<',
  choices: ['f','j'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'left'
  },
  on_start: function(trial){
    trial.stimulus = '<<><<';
    trial.data.stimulus_type = 'incongruent';
    trial.data.target_direction = 'right';
  }
}
```

### on_finish参数

我们可以在试次结束后运行自己定义的函数，这是通过`on_finish`实现的。该函数只接受一个传入参数，是当前的试次记录的数据，其参数可以编辑。因此，我们可以利用这个函数，根据数据更新实验的状态或者修改数据本身。

`on_finish`函数对于计算试次开始时无从知晓的数据很有用。例如，在上面的Flanker任务中，我们可以使用`on_finish`函数检查被试反应是否正确，并在data中添加一个`correct`属性，其值可以是true或false。

```javascript
// in addition to all of the standard data collected for this trial, 
// this on_finish function adds a property called 'correct' 
// which is either 'true' or 'false'
// depending on the response that was made
var trial = {
  type: 'html-keyboard-response',
  stimulus: '<<<<<',
  choices: ['f','j'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'left',
    correct_response: 'f'
  },
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, data.correct_response)){
      data.correct = true;
    } else {
      data.correct = false;
    }
  }
}
```

### on_load参数

`on_load`回调函数在试次加载完成后立刻触发。对于多数插件，这个函数会在呈现的内容出现在页面上、但是被试还没有进行交互、计时还没开始（如，动画）的时候执行。我们可以利用这个功能改变页面元素的一些属性，这样就不需要通过修改插件文件本身去实现这一需求。

```javascript
var trial = {
  type: 'image-keyboard-response',
  stimulus: 'imgA.png',
  on_load: function() {
    // this will change the src attribute of the image after 500ms
    setTimeout(function(){
      document.querySelector('img').src = 'imgB.png'
    }, 500);
  }
};
```

### css_classes参数

`css_classes`参数可以给jsPsych呈现内容的元素添加一系列class名，且只对当前试次生效。这样，我们就可以添加一些这在当前试次生效的CSS样式。如果需要将CSS样式添加到页面上的其他元素，则可以在类名的基础上添加其他选择器。

```html
<style>
  .flanker-stimulus {
    font-size: 500%;
  }
  .flanker-stimulus #prompt {
    font-size: 18px;
  }
  .fixation {
    font-size: 80px;
  }
</style>
<script>
  var fixation_trial = {
    type: 'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus: '+',
    css_classes: ['fixation']
  };
  var flanker_trial = {
    type: 'html-keyboard-response',
    choices: ["ArrowLeft", "ArrowRight"],
    stimulus: '>>>>>',
    prompt: '<span id="prompt">Press the left or right arrow key.</span>',
    css_classes: ['flanker-stimulus']
  };
</script>
```

### save_trial_parameters参数

`save_trial_parameters`参数可以告诉jsPsych需要把哪些参数保存到数据中，从而覆盖插件默认记录的插件参数。我们可以添加一些插件一般不会记录的参数，或者移除一般情况下会保存的参数。这在我们使用动态参数（即，函数）但还需要记录该参数的具体值时非常有用。

```javascript
var trial = {
  type: 'html-button-response',
  stimulus: '<p style="color: orange; font-size: 48px; font-weight: bold;">BLUE</p>',
  choices: function() {
    return jsPsych.randomization.shuffle(['Yes','No']);
  },
  post_trial_gap: function() {
    return jsPsych.randomization.sampleWithoutReplacement([200,300,400,500],1)[0];
  },
  save_trial_parameters: {
    // save the randomly-selected button order and post trial gap duration to the trial data
    choices: true,
    post_trial_gap: true,
    // don't save the stimulus
    stimulus: false
  }
}
```

!!! note "注意" 
    不能删除`internal_node_id`和`trial_index`值，因为jsPsych会用到这些值。

## 所有插件都收集的数据

每个插件都会收集一些数据，其对应的文档中会详细说明记录了哪些数据。

除了这些数据，还有一些数据是所有插件都会收集的。

| 名称             | 类型   | 值                                     |
| ---------------- | ------ | -------------------------------------- |
| trial_type       | 字符串 | 当前试次使用的插件名称。               |
| trial_index      | 数值   | 当前试次的编号。                       |
| time_elapsed     | 数值   | 从实验开始到当前试次结束经过的毫秒数。 |
| internal_node_id | 字符串 | 定义当前时间线节点的字符串。           |

## 开发插件

如果需要使用jsPsych执行库中不包含的任务，可以自己开发新的插件或对现有插件进行修改。所执行的任务种类不限。只要是能够使用JavaScript执行的，基本就可以转化为jsPsych插件的形式。

### 插件文件中有什么？

插件文件有一个固定的模板。只有按照模板编写插件，jsPsych才能正常运行插件。而插件之所以非常灵活，是因为模板对代码的限制很少。模板如下：

```js
jsPsych.plugins['plugin-name'] = (function(){

  var plugin = {};

  plugin.info = {
    name: 'plugin-name',
    parameters: {
    }
  }

  plugin.trial = function(display_element, trial){
    jsPsych.finishTrial();
  }

  return plugin;

})();
```

现在这个插件就已经可以使用了。它定义了一个名为'plugin-name'的插件，但什么功能也没有。不过，这个插件不会破坏实验进程，jsPsych会将其视为有效的插件。

我们来仔细看看这个插件。

插件的整体结构是按照模块化的设计模式来的。该模式使用了JavaScript的匿名闭包，代码的第一行是`(function(){`，最后一行是`})();`。这些细节不重要，不过如果你想详细了解也可以看[这里](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)。使用这种模式的原因是可以控制状态恒定，并使用私有的变量作用域。换言之，该插件是独立的，不受其他插件影响。

该模块包含了一个名为`plugin`的对象，它有两个属性：`info`和`trial`。模块的末尾会返回`plugin`对象，从而定义了`jsPsych['plugin-name']`的`plugin`属性。

#### plugin.info

插件的`info`属性是一个包含了所有可选参数的对象。该对象的每个属性名对应了插件的参数名，其值是包含了该参数的描述、类型（字符串、整数等）和默认值的对象。详见jsPsych的plugins文件夹的插件文件。

jsPsych允许[在插件中使用动态参数](dynamic-parameters.html)，即参数值可以是函数，该函数在试次开始时执行。不过，如果你希望插件值是函数但不希望该函数在试次开始时执行，则应该将参数类型设置为`'FUNCTION'`，以便让jsPsych知道不要像对其他动态参数一样执行这个函数。详见`canvas-*`系列插件。

#### plugin.trial

插件的`trial`属性是运行试次的函数。该方法有两个传入参数，第一个是`display_element`，即渲染jsPsych内容的DOM元素，该参数为一个HTML元素。通常情况下，我们不需要管这个参数形式是否正确，只需要假定它就是一个HTML元素，并使用相应的方法即可。第二个参数是`trial`，这是一个包含了当前试次所有参数值的对象。如果我们在`plugin.info`中添加了参数和默认值，则`trial`对象会自动将默认值赋给试次定义阶段没有赋值的参数。

`trial`方法中唯一的硬性要求是在试次结束时调用`jsPsych.finishTrial()`，以便告诉jsPsych进入下一个试次（或者，如果这已经是最后一个试次了，则结束实验）。在此之前，插件可以执行自己的功能。

当然，除了结束试次，你肯定还需要`plugin.trial`函数内执行其他功能。下面是一些示例：

### 改变页面内容

改变页面内容有若干方法。`display_element`参数对应着呈现内容的DOM元素，所以我们可以通过JavaScript中和DOM元素交互的方法改变页面内容。其中常见的方法之一是改变`innerHTML`。

```javascript
var html_content = '<p>This is the first paragraph</p>';
html_content += '<p>This is the second paragraph</p>';

display_element.innerHTML = html_content;
```

jsPsych在试次开始前或结束后不会清空页面内容，所以我们需要在试次结束时通过`innerHTML`清空呈现内容的DOM元素的内容：

```javascript
// clear the display
display_element.innerHTML = '';
```

### 写入数据

插件的作用包括收集数据，所以很显然我们需要添加保存数据的功能。我们可以给`jsPsych.finishTrial()`传入一个数据对象：

```javascript
var data = {
  correct: true,
  rt: 350
}

jsPsych.finishTrial(data);
```

这样，记录的数据中，`correct`为true，`rt`为350。jsPsych还会自动记录一些其他的数据。

### 插件模板

空白插件模板在`plugins/template`文件夹下。