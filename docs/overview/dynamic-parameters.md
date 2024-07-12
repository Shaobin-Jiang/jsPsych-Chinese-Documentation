# 动态参数

试次中多数的参数值可以是函数。一般来说，jsPsych中的试次在创建之初就已经将参数定义好了，但这样也使得我们无法让后面的试次根据前面的试次的结果改变其自身的参数。不过，**当我们用函数作为参数值时。该函数会在试次开始前执行，其返回值会作为该参数的参数值**。这样，我们就可以根据此前记录的数据或其他实验开始前尚不知道的信息而动态调整当前试次。

## 示例

### 给予反馈

下面大概地说明了如何通过动态参数在Flanker任务中给被试呈现反馈。

```javascript

var timeline = [];

var trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<<<<<',
  choices: ['f','j'],
  data: {
    stimulus_type: 'congruent',
    target_direction: 'left'
  },
  on_finish: function(data){
    // Score the keyboard response as correct or incorrect.
    if(jsPsych.pluginAPI.compareKeys(data.response, "f")){
      data.correct = true;
    } else {
      data.correct = false; 
    }
  }
}

var feedback = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 1000,
  stimulus: function(){
    // The feedback stimulus is a dynamic parameter because we can't know in advance whether
    // the stimulus should be 'correct' or 'incorrect'.
    // Instead, this function will check the accuracy of the last response and use that information to set
    // the stimulus value on each trial.
    var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
    if(last_trial_correct){
      return "<p>Correct!</p>"; // the parameter value has to be returned from the function
    } else {
      return "<p>Wrong.</p>"; // the parameter value has to be returned from the function
    }
  }
}

timeline.push(trial, feedback);

```

### 对参数值随机

下面的示例通过动态参数对试次间间隔 (inter-trial interval, ITI)进行随机。这里，该动态参数值为一个命名的函数，而非匿名函数。

```js
var random_duration = function() {
    var rand_dur = jsPsych.randomization.sampleWithoutReplacement([500,600,700,800],1)[0];
    return rand_dur;
}

var trial = {
    type: jsPsychHtmlKeyboardResponse
    stimulus: '+',
    post_trial_gap: random_duration  // if you use a named function for a dynamic parameter, then just use the function name (without parentheses after it)
}
```

### 在数据中记录改变的量

试次的`data`参数值也可以是函数，这方便我们保存实验过程中可能改变的数据。例如，如果有一个名为`current_difficulty`的全局变量，该变量用于记录一个自适应的任务的难度，就可以像下面这样将该变量的当前值保存在试次的数据中：

```js
var current_difficulty; // value changes during the experiment

var trial = {
  type: jsPsychSurveyText,
  questions: [{prompt: "Please enter your response."}]
  data: function() { 
    return {difficulty: current_difficulty}; 
  }
}
```

`data`对象中任意一个属性值都可以是函数。例如，如果你想要在数据中同时记录静态和动态的信息：

```js
var trial = {
  type: jsPsychSurveyText,
  questions: [{prompt: "Please enter your response."}]
  data: {
    difficulty: function() { 
      return current_difficulty; // the difficulty value changes during the experiment
    },
    task_part: 'recall', // this part of the data is always the same
    block_number: 1
  }
}
```

### 嵌套的参数

使用嵌套的参数也是同样的道理。所谓嵌套的参数，就是指该参数里又包含了其他的参数。例如，很多survey-*插件都有一个`questions`参数，这个参数就是嵌套的——它是一个数组，包含了页面上所有问题的参数。如果要在`questions`中使用动态参数，我们可以声明一个函数，该函数会返回包含了每个问题参数的数组：

```js
var subject_id; // value is set during the experiment

var trial = {
  type: jsPsychSurveyText,
  questions: function(){
    var questions_array = [ 
        {prompt: "Hi "+subject_id+"! What's your favorite city?", required: true, name: 'fav_city'},
        {prompt: "What is your favorite fruit?", required: true, name: 'fav_fruit'},
    ];
    return questions_array;
  }
}
```

我们还可以给嵌套的参数中的某一个参数的值指定为函数：

```js
var trial = {
  type: jsPsychSurveyText,
  questions: [
    { 
      prompt: function() {  
        // this question prompt is dynamic - the text that is shown 
        // will change based on the participant's earlier response
        var favorite_city = jsPsych.data.getLastTrialData().values()[0].response.fav_city;
        var text = "Earlier you said your favorite city is "+favorite_city+". What do you like most about "+favorite_city+"?"
        return text;
      }, 
      required: true,
      rows: 40,
      columns: 10
    },
    { prompt: "What is your favorite fruit?", required: true, name: 'fav_fruit' }
  ]
}
```
## 什么情况下不能使用动态参数

注意，如果插件接受的参数值**本来**就是一个回调函数，那么该函数**不会**在试次开始时被执行。这是因为一些插件允许程序在试次的某个阶段再执行这些函数。例如，canvas-*系列插件的`stimulus`参数，cloze插件的`mistake_fn`参数，以及reconstruction的`stim_function`参数。如果你想知道某个插件的某个参数是否也是这种情况，则可以参考插件文件中`plugin.info`部分该参数的`type`。如果其type为`jsPsych.plugins.parameterType.FUNCTION`，则该参数值必须是函数，在试次开始前不会执行。

不过，在这些参数当中，虽然函数不会直接被执行，但它们终归还是函数，所以我们还是可以在其中做一些动态的改变。这些函数会在试次的某个阶段被执行，所以其实还是可以在试次当中对某些值进行更新。
