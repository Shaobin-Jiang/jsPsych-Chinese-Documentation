# 插件

jsPsych中，插件定义了实验中的试次或事件。一些插件定义的是比较宽泛的事件，比如[呈现指导语](../plugins/instructions.md)，[呈现图片并记录按键](../plugins/image-keyboard-response.md)，或播[放音频并记录点击按钮的行为](../plugins/audio-button-response.md)。其他的插件内容则更具体一些，如呈现特定类型刺激的插件（如，[视觉搜索任务](../plugins/visual-search-circle.md)），或运行特定实验任务的插件 (如，[内隐联想测验](../plugins/iat-image.md))。使用jsPsych创建实验时，我们需要弄清楚具体使用哪些插件来添加需要被试完成的任务。

插件提供的是试次或任务的整体结构，允许我们灵活地进行自定义。例如，[image-keyboard-response插件](../plugins/image-keyboard-response.md)的功能是呈现图片并记录按键，但是我们可以定义刺激内容是什么，被试可以按哪些键，刺激呈现多久，被试反应的时间限制，等等。这些选项中很多都有默认值，虽然该插件有很多参数，但你只需要指定其中几个就可以进行使用。每个插件都有自己的文档，描述了插件的功能、可选参数以及收集的数据。

## 使用插件

使用插件时，我们需要将插件对应的JavaScript文件加载到实验的HTML文件内。此外，使用jsPsych编写实验还需要加载jsPsych.js文件。

```html
<head>
  <script src="https://unpkg.com/jspsych@latest" type="text/javascript"></script>
  <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@latest" type="text/javascript"></script>
</head>
```

加载好插件后，就可以定义一个试次去使用这个插件。所有的jsPsych试次都有`type`属性，会告诉jsPsych当前试次使用哪个插件。试次的`type`和插件名很像，不过它以"jsPsych"开头，并且按照 _驼峰法_ 命名，而非使用短线连接单词。试次的`type`参数不是字符串 (即，`type`参数值两侧不用引号包裹)。下面是一些插件名称和`type`的示例：

| 插件名                  | `type`                         |
| ---------------------------- | ---------------------------- |
| image-keyboard-response      | jsPsychImageKeyboardResponse |
| fullscreen                   | jsPsychFullscreen            |
| webgazer-init-camera         | jsPsychWebgazerInitCamera    |

下面的JavaScript代码定义了一个使用`image-keyboard-response`插件呈现图片的试次。该试次中有效按键、刺激持续时间、试次持续时间以及其他参数都使用了默认值。

```javascript
var image_trial = {
	type: jsPsychImageKeyboardResponse, 
	stimulus: 'images/happy_face.jpg'
}
```

我们可以通过在试次中设置参数值以覆盖其默认值。下面的例子中，我们用自定义的值代替了`trial_duration`和`post_trial_gap`的默认值:

```javascript
var image_trial = {
  type: jsPsychImageKeyboardResponse,
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
| data           | 对象   | *undefined*             | 包含了需要额外记录的数据的对象，详见[数据存储、汇总和操作部分](../overview/data.md) 。 |
| post_trial_gap | 数值  | null                    | 设置当前试次和下一个试次之间间隔的毫秒数。如果为null则没有间隔。 |
| on_start       | 函数 | `function(){ return; }` | 试次开始时、加载开始前执行的回调函数。详见[事件相关回调函数](../overview/events.md)。 |
| on_finish      | 函数 | `function(){ return; }` | 试次结束时、下一个试次开始前执行的回调函数。详见[事件相关回调函数](../overview/events.md)。 |
| on_load        | 函数 | `function(){ return; }` | 试次加载完成时执行的回调函数，一般是呈现内容刚刚完成加载的时候。详见[事件相关回调函数](../overview/events.md)。 |
| css_classes    | 字符串   | null                    | 给当前试次中呈现实验内容的元素添加的class名。这样，我们就可以添加只在当前试次生效的CSS样式。详见[控制呈现样式部分](../overview/style.md)及jsPsych的examples文件夹下的"css-classes-parameter.html"文件。 |
| save_trial_parameters | 对象 | `{}` | 包含了应该或不应该记录到数据中的当前试次的参数。其中，每个属性名和试次参数同名，其值根据是否需要记录到数据中为true或false。如果某个参数值是通过函数返回的，则数据中记录的该参数值为相应函数的返回值。如果某个参数值就是一个函数（如，回调函数），则会将函数本身保存为字符串。详见jsPsych的examples文件夹下的"save-trial-parameters.html"文件。 |
| save_timeline_variables | 布尔或数组 | `false` | 如果为`true`，则时间线变量会将当前一次循环的值保存到试次的数据中；如果为数组，则只保存数组中列出的变量。
| record_data | 布尔 | `true` | 如果为`false`，则不记录当前试次的数据。 |

### data参数

`data`参数允许我们向数据中添加额外的属性。这有助于我们记录一些插件不会自己记录的数据。`data`参数的值应该是对象。

一个简单的例子就是[Flanker任务](https://en.wikipedia.org/wiki/Eriksen_flanker_task)。实验中，被试需要通过按键对屏幕中央箭头的朝向进行反应。箭头周围还有其他箭头出现，但被试需要无视它们。这些剪头方向可以是一致的 (>>>>>) 或不一致的 (<<><<)。

使用jsPsych创建Flanker任务的代码如下：

```javascript
var trial = {
  type: jsPsychHtmlKeyboardResponse,
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

jsPsych默认的试次间间隔 (ITI)为0ms。我们可以在`initJsPsych()`中通过改变`default_iti`参数对全局的ITI进行设置。

不过，我们也可以通过`post_trial_gap`参数改变某一个试次的ITI。如果将该参数设为整数*x*，则当前试次结束后会呈现*x*毫秒的空屏。该参数会覆盖`initJsPsych`中设置的`default_iti`参数。

```javascript
var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'There will be a 1.5 second blank screen after this trial.',
  post_trial_gap: 1500
}
```

### on_start参数

我们可以在试次开始前运行自己定义的函数，这是通过`on_start`实现的。该函数只接受一个传入参数，是当前的试次对象，其参数 *可以编辑*。因此，我们可以利用这个函数，根据实验的状态，调整接下来的试次。

```javascript
// when this trial runs, the on_start function will change the trial's stimulus and data parameters,
// so the trial will display an incongruent Flanker stimulus with a right-facing central arrow
var trial = {
  type: jsPsychHtmlKeyboardResponse,
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

`on_finish`函数对于计算试次开始时无从知晓的数据很有用。例如，在上面的Flanker任务中，我们可以使用`on_finish`函数检查被试反应是否正确，并在data中添加一个`correct`属性，其值可以是`true`或`false`。

```javascript
// in addition to all of the standard data collected for this trial, 
// this on_finish function adds a property called 'correct' 
// which is either 'true' or 'false'
// depending on the response that was made
var trial = {
  type: jsPsychHtmlKeyboardResponse,
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
  type: jsPsychImageKeyboardResponse,
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

`css_classes`会给当前试次中呈现实验内容的元素添加class名。这样，我们就可以添加一些只在当前试次生效的CSS样式。如果需要将CSS样式添加到页面上的其他元素，则可以在类名的基础上添加其他选择器。

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
    type: jsPsychHtmlKeyboardResponse,
    choices: "NO_KEYS",
    stimulus: '+',
    css_classes: ['fixation']
  };
  var flanker_trial = {
    type: jsPsychHtmlKeyboardResponse,
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
  type: jsPsychHtmlButtonResponse,
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

!!!note "注意"`
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

## 创建新插件

详见[开发插件部分](../developers/plugin-development.md)。
