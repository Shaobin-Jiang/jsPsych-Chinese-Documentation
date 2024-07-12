# 简单反应时实验

## 教程内容摘要

当前教程会讲述如何创建一个简单反应时实验。具体任务是：呈现蓝色圆的时候按一个键，呈现橙色圆的时候按另一个键。尽管这个实验很简单，但这个教程包含了jsPsych很多的关键特性，包括：

* 使用插件创建一个标准的试次
* 将多个插件结合起来创建全新种类的试次
* 使用时间线变量实现代码复用
* 多媒体文件的预加载
* 呈现顺序的随机
* 操作、筛选、汇总数据
* 根据被试反应改变实验参数

## 第1部分: 创建空白实验

我们从下载jsPsych以及创建实验项目文件夹开始。如果你还不知道这些该怎么做，可以参照[Hello World教程](hello-world.md)中的步骤1-5。在第5步后面，你的实验文件应该是这样的：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych-6.3.0/jspsych.js"></script>
    <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
    <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
  </head>
  <body></body>
</html>
```

在此基础上，我们来编写实验的剩余部分。

## 第2部分: 呈现欢迎消息

所有用jsPsych编写的实验都是由时间线定义的。时间线是一个包含着实验中各个试次的数组。我们先来定义时间线数组：

```javascript
var timeline = [];
```

现在，我们来使用[jspsych-html-keyboard-response](/plugins/jspsych-html-keyboard-response.html)插件，用一条简短的文字来欢迎被试。

首先，我们创建一个使用`jspsych-html-keyboard-response`插件的试次，这个试次包含了一段要呈现给被试的文字。

```javascript
var welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment. Press any key to begin."
};
```

接着，我们把这个试次push到时间线中，这样它就会出现在数组的最后。

<span style='color: red;'>译者注：push是JavaScript中数组的操作方法，会将元素添加到数组的最末尾</span>

```javascript
timeline.push(welcome);
```

最后，我们需要告诉jsPsych开始运行实验。这就需要我们调用[jsPsych.init() 函数](../core_library/jspsych-core.html#jspsychinit)并把定义了时间线的数组传进去。

```javascript
jsPsych.init({
  timeline: timeline
});
```
教程的每一部分结束后，你都可以点击下面查看到当前位置的完整代码。

??? example "完整代码"

    ``` html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
          
        /* create timeline */
        var timeline = [];
          
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
          
        /* start the experiment */
        jsPsych.init({
          timeline: timeline
        });
      </script>
    </html>
    ```


## 第3部分: 呈现指导语

我们可以使用和第2部分类似的步骤来创建一个呈现指导语的试次。唯一的区别在于，这里我们会使用HTML来控制指导语的呈现，并且会在试次结束后通过`post_trial_gap`参数添加一段2秒的间隔。

试次的定义如下：

```javascript
var instructions = {
  type: "html-keyboard-response",
  stimulus: `
    <p>In this experiment, a circle will appear in the center 
    of the screen.</p><p>If the circle is <strong>blue</strong>, 
    press the letter F on the keyboard as fast as you can.</p>
    <p>If the circle is <strong>orange</strong>, press the letter J 
    as fast as you can.</p>
    <div style='width: 700px;'>
    <div style='float: left;'><img src='img/blue.png'></img>
    <p class='small'><strong>Press the F key</strong></p></div>
    <div class='float: right;'><img src='img/orange.png'></img>
    <p class='small'><strong>Press the J key</strong></p></div>
    </div>
    <p>Press any key to begin.</p>
  `,
  post_trial_gap: 2000
};
```

!!! tip "小贴士"

    在JavaScript中，有三种定义`字符串`的方法。你可以使用单引号`'`、双引号`"`或反引号`` ` ``。使用反引号相较于其他方法有两个优势，一是可以分行书写`字符串`，二是可以通过[模板字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)来引入变量。这些优点在创建长的HTML字符串时显得格外突出。

注意，代码中的HTML中包含了`<img>`标签，它用来呈现刺激图片。我们需要下载这些图片文件，右键点击下面的图片并选择**图片另存为**，将它们保存到第1部分中创建的实验文件夹下名为`img`的文件夹下。

![blue circle](../img/blue.png)
![orange circle](../img/orange.png)

不要忘了把试次添加到时间线中：

```javascript
timeline.push(instructions);
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
          
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
          
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
          
        /* start the experiment */
        jsPsych.init({
          timeline: timeline
        });
      </script>
    </html>
    ```

## 第4部分: 呈现刺激并获取反应

呈现图片刺激的试次和呈现指导语的试次并没有太多不同，只是现在我们呈现的是图片而不是文字或者是HTML。这也就意味着我们需要使用新的插件：jspsych-image-keyboard-response。我们来通过`<script>`标签把它引入文档。

```html hl_lines="5"
<head>
  <title>My experiment</title>
  <script src="jspsych-6.3.0/jspsych.js"></script>
  <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
  <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
  <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
</head>
```

现在，我们只会让每张图片呈现一次。我们将试次的`stimulus`属性设置为图片的路径，并通过`choices`属性指定允许被试按键的范围，将 <kbd>f</kbd> 键和 <kbd>j</kbd> 键设为有效的反应。

```javascript
var blue_trial = {
  type: 'image-keyboard-response',
  stimulus: 'img/blue.png',
  choices: ['f', 'j']
};

var orange_trial = {
  type: 'image-keyboard-response',
  stimulus: 'img/orange.png',
  choices: ['f', 'j']
}
```

和前面一样，将试次添加到时间线当中：

```javascript
timeline.push(blue_trial, orange_trial);
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var blue_trial = {
          type: 'image-keyboard-response',
          stimulus: 'img/blue.png',
          choices: ['f', 'j']
        };
    
        var orange_trial = {
          type: 'image-keyboard-response',
          stimulus: 'img/orange.png',
          choices: ['f', 'j']
        }
    
        timeline.push(blue_trial, orange_trial);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline
        });
      </script>
    </html>
    ```

## 第5部分: 多媒体文件的预加载

我们在实验中使用多媒体元素时（图片、音频、视频），最好在使用它们之前进行预加载，这样我们就在使用这些素材之前将它们下载好，从而避免在使用时因为还要下载而出现延迟。

我们会使用[jspsych-preload插件](/plugins/jspsych-preload.html)预加载这两张图片。[多媒体文件预加载部分](/overview/media-preloading.html)更详尽地讲解了预加载的各种可选项以及使用这一插件的不同方式，但这里我们我们只会把我们要预加载的文件列表告诉这个插件。

首先，我们得把preload插件引入我们的`<head>`标签内部：

```html hl_lines="6"
<head>
  <title>My experiment</title>
  <script src="jspsych-6.3.0/jspsych.js"></script>
  <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
  <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
  <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
  <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
</head>
```

我们需要把这个trial添加实验的最开始，所以请把下面的代码添加到`welcome`试次前。

```js
var preload = {
  type: 'preload',
  images: ['img/blue.png', 'img/orange.png']
}
```

和前面一样，把试次添加到时间线当中：

```js
timeline.push(preload);
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* preload images */
        var preload = {
          type: 'preload',
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var blue_trial = {
          type: 'image-keyboard-response',
          stimulus: 'img/blue.png',
          choices: ['f', 'j']
        };
    
        var orange_trial = {
          type: 'image-keyboard-response',
          stimulus: 'img/orange.png',
          choices: ['f', 'j']
        }
    
        timeline.push(blue_trial, orange_trial);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline
        });
      </script>
    </html>
    ```

## 第6部分: 时间线变量

在整个实验中，我们需要的可不止两个试次。增加试次的方法之一是多创建一些对象来定义更多的试次，并把它们都添加到时间线里，但是还有一种更有效的方法：使用时间线变量 (timeline variables)。

呈现蓝色和橙色圆所用到的参数十分之相似，唯一的区别就是所使用的图片的路径。时间线变量允许我们定义呈现刺激的流程，这一流程可以重复使用，每次使用时可以指定不同的变量。可以想象，即便在现有的这个简单的例子中，这种方法也能大幅减少代码量。

我们首先创建一个包含了测试阶段所有试次的数组。现阶段实验中只有两个试次：蓝色和橙色。

```javascript
var test_stimuli = [
  { stimulus: "img/blue.png"},
  { stimulus: "img/orange.png"}
];
```

现在我们在呈现蓝色或橙色圆的基础上再在试次间添加呈现注视点（+）的试次。通过指定html-keyboard-response的`trial_duration`参数并将其`choices`参数设置为`jsPsych.NO_KEYS`，我们可以控制试次呈现注视点的时长。此时，当前试次不接受任何被试反应，会持续到`trial_duration`所指定的时长结束。

```javascript
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
}
```

我们还需要创建一个使用image-keyboard-response插件的试次来呈现圆形，这一次我们使用`jsPsych.timelineVariable()`函数来指定`stimulus`属性的值，用来告诉jsPsych每次运行当前试次的时候用时间线变量中的值作为该属性的值。

```javascript
var test = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j']
}
```

然后，我们要把`test_stimuli`数组中的变量和`jsPsych.timelineVariable()`联系起来。我们再来创建一条新的时间线，并指定`timeline_variables`属性。

```javascript
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli
}
```

我们把`test_procedure`添加到主时间线数组中；注意不需要再把`fixation`和`test`添加进去，因为它们已经在`test_procedure`当中了。

```javascript
timeline.push(test_procedure);
```

代码运行到`test_procedure`这里时，对于`test_stimuli`中的每一个元素，jsPsych都会运行一次`test_procedure`中的时间线（在这里一共会运行两次）。第一次运行时，jsPsych会使用`test_stimuli`中的第一个元素来替换时间线变量（蓝色），第二次则会使用第二个元素（橙色）。注意，在呈现橙色圆形和蓝色圆形的试次中间是注视点试次，因为`test_procedure`的整条时间线都会被重复运行。

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* preload images */
        var preload = {
          type: 'preload',
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];
    
        var fixation = {
          type: 'html-keyboard-response',
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: 1000,
        }
    
        var test = {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        }
    
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli
        }
    
        timeline.push(test_procedure);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline
        });
      </script>
    </html>
    ```

## 第7部分: 使用时间线变量的时间线的参数

现在，我们的实验仅有2个试次，而且每次实验刺激的呈现顺序还完全一致。但是，我们在使用时间线变量的时候，还可以使用一些随机化和重复试次的方法。如果要将呈现顺序进行随机，我们可以在设置了`timeline_variables`参数的对象中设置`randomize_order: true`。

```javascript
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true
}
```

我们还可以通过设定`repetitions`参数让测试阶段长一点。这一参数控制的是实验将时间线变量数组循环多少次。例如，如果我们设置`repetitions: 5`，那么是实验就会将时间线变量中的两个元素循环5次，因此实验共有10个试次。

```javascript
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true,
  repetitions: 5
}
```
??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* preload images */
        var preload = {
          type: 'preload',
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];
    
        var fixation = {
          type: 'html-keyboard-response',
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: 1000,
        }
    
        var test = {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        }
    
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        }
    
        timeline.push(test_procedure);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline
        });
      </script>
    </html>
    ```

## 第8部分: 使用函数生成参数

现在，实验还有一处可以改进的地方，那就是注视点的呈现时长。在目前版本的实验中，圆形出现的时间太容易预测了，因此我们应该对于每个试次中的`fixation`的`trial_duration`参数值进行修改。但是，在保持现有的清晰的代码结构的前提下，我们该如何实现这一功能呢？现在的代码中，我们只需要定义注视点试次一次就好了。我们自然想到，可以再添加一个时间线变量，如`fixation_duration`，用它来控制注视点呈现时长。但这里，我们介绍另一种方法，那就是用一个函数作为`trial_duration`参数的值。如果参数值是一个函数，jsPsych会在试次运行的时候执行该函数，因此通过让函数每次都返回不同的值，我们就可以在试次每次运行的时候改变参数值。

这里，我们来用jsPsych在[jsPsych随机化模块](/core_library/jspsych-randomization.html)内置的随机化方法进行实现。`jsPsych.randomization.sampleWithoutReplacement()`会从一个数组中随机取出*N*个不重复元素组成一个长度为*N*的数组作为返回值。

```javascript
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  }
}
```

在上面的代码中，我们把`trial_duration: 1000`的参数值替换为了一个函数。函数中，我们从数组 `[250, 500, 750, 1000, 1250, 1500, 1750, 2000]` 中随机取出一个元素。由于`jsPsych.randomization.sampleWithoutReplacement`方法的返回值是一个数组，我们在后面加上了`[0]`来将数组中唯一的元素提取出来。

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* preload images */
        var preload = {
          type: 'preload',
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];
    
        var fixation = {
          type: 'html-keyboard-response',
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          }
        }
    
        var test = {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        }
    
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        }
    
        timeline.push(test_procedure);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline
        });
      </script>
      </html>
    ```

## 第10部分: 呈现数据

我们已经创建了一个虽简单但完整的实验，现在就让我们来看看实验数据吧。jsPsych有一个内置的[`jsPsych.data.displayData()`函数](/core_library/jspsych-data.html#jspsychdatadisplaydata)，该方法在debug的时候很是好用，它会在清屏后将目前收集到的原始数据呈现在屏幕上。如果你真的在做实验收数据，这个方法倒不是很好，但是在开发过程中用来查看数据倒是不错的。

我们需要`displayData`函数在实验结束后进行。实现的一种方式是使用[`on_finish`回调函数](/overview/callbacks.html#on_finish-experiment)，它会自动在实验中所有试次结束后执行。我们可以在`jsPsych.init`中定义一个回调函数。

```javascript
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.displayData();
  }
});
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* preload images */
        var preload = {
          type: 'preload',
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];
    
        var fixation = {
          type: 'html-keyboard-response',
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          }
        }
    
        var test = {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        }
    
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        }
    
        timeline.push(test_procedure);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline,
          on_finish: function() {
            jsPsych.data.displayData();
          }
        });
      </script>
      </html>
    ```

## 第11部分: 给试次添加额外的数据

jsPsych中的所有试次都可以添加额外的数据，这些数据会和插件默认收集的数据一起存储起来，从而允许实验者在记录试次中产生的数据之外，还可以记录试次本身的一些属性。

我们什么时候会用到这一特性呢？在现在这个实验中，我们可以给所有呈现图片的试次标记为`response`试次，这样我们可以从完整数据中更方便地筛选出我们需要分析的试次：

```javascript
var test = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: {
    task: 'response'
  }
}
```

我们还可以在测试试次中添加一个说明正确反应的属性（对于蓝色圆形，F是正确反应；对于橙色圆性，J是正确反应）。现阶段，我们用时间线变量控制呈现的圆形的颜色；因为正确反应是由呈现的圆形颜色决定的，我们需要把用于标记试次的数据也添加到`test_stimuli`数组中，并使用`jsPsych.timelineVariable()`函数将其赋给`data`的某个属性。

我们先来修改`test_stimuli`:

```javascript
var test_stimuli = [
  { stimulus: "img/blue.png",  correct_response: 'f'},
  { stimulus: "img/orange.png",  correct_response: 'j'}
];
```

现在我们在`test`试次的`data`参数中使用`timelineVariable()`：

```javascript
var test = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: {
    task: 'response',
    correct_response: jsPsych.timelineVariable('correct_response')
  }
}
```

我们还可以像下面这样给注视点试次进行标记，从而在数据处理阶段能够更方便地剔除注视点试次的数据。

```js
var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  },
  data: {
    task: 'fixation'
  }
}
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* preload images */
        var preload = {
          type: 'preload',
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var test_stimuli = [
          { stimulus: "img/blue.png",  correct_response: 'f'},
          { stimulus: "img/orange.png",  correct_response: 'j'}
        ];
    
        var fixation = {
          type: 'html-keyboard-response',
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          },
          data: {
            task: 'fixation'
          }
        }
    
        var test = {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j'],
          data: {
            task: 'response',
            correct_response: jsPsych.timelineVariable('correct_response')
          }
        }
    
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        }
    
        timeline.push(test_procedure);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline,
          on_finish: function() {
            jsPsych.data.displayData();
          }
        });
      </script>
      </html>
    ```

## 第12部分: 在实验中对数据进行操作

我们已经对每一个试次的正确反应进行了记录，这让实验结束后的数据分析中判断被试是否做出了正确的选择变得方便得多。

不过在jsPsych中，我们也可以在实验运行过程中进行这一判断过程，这样可以为后续的数据分析省下不少时间。

这一功能的实现需要用到试次的`on_finish`事件。我们可以把一个函数赋给`on_finish`，该函数会接收一个记录了当前试次数据的对象作为传入参数，我们可以在函数内部对这个数据对象进行直接的操作，所做的调整都会改变jsPsych内部存储的原始数据。

在下面的这个例子中，我们会对被试是否做出了正确反应进行判断，并且据此给数据对象中添加一个`correct`属性。

```javascript
var test = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: {
    task: 'response',
    correct_response: jsPsych.timelineVariable('correct_response')
  },
  on_finish: function(data){
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
  }
}
```

`data.response`的值是以字符串形式记录的被试的按键，我们可以把这个值和`data.correct_response`进行比较，并将比较的结果赋给`data.correct`。

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="jspsych-6.3.0/jspsych.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
        <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
        <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
      </head>
      <body></body>
      <script>
    
        /* create timeline */
        var timeline = [];
    
        /* preload images */
        var preload = {
          type: 'preload',
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);
    
        /* define welcome message trial */
        var welcome = {
          type: "html-keyboard-response",
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);
    
        /* define instructions trial */
        var instructions = {
          type: "html-keyboard-response",
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div class='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);
    
        /* test trials */
        var test_stimuli = [
          { stimulus: "img/blue.png",  correct_response: 'f'},
          { stimulus: "img/orange.png",  correct_response: 'j'}
        ];
    
        var fixation = {
          type: 'html-keyboard-response',
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: jsPsych.NO_KEYS,
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          },
          data: {
            task: 'fixation'
          }
        }
    
        var test = {
          type: "image-keyboard-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j'],
          data: {
            task: 'response',
            correct_response: jsPsych.timelineVariable('correct_response')
          },
          on_finish: function(data){
            data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
          }
        }
    
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        }
    
        timeline.push(test_procedure);
    
        /* start the experiment */
        jsPsych.init({
          timeline: timeline,
          on_finish: function() {
            jsPsych.data.displayData();
          }
        });
      </script>
      </html>
    ```


## 第13部分: 数据汇总

jsPsych内置了一些数据分析的函数，可以计算诸如特定试次的平均反应时之类的东西。这一部分，我们来利用这些函数，给当前的实验添加最后一个试次，告知被试他们的正确率和做出正确反应的试次的平均反应时。

这里用的是`html-keyboard-response`插件。因为所呈现的文本内容由被试在实验中的表现决定，这里的`stimulus`参数值应该是一个函数。

下面是代码：

```js
var debrief_block = {
  type: "html-keyboard-response",
  stimulus: function() {

    var trials = jsPsych.data.get().filter({task: 'response'});
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());

    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
      <p>Your average response time was ${rt}ms.</p>
      <p>Press any key to complete the experiment. Thank you!</p>`;

  }
};

timeline.push(debrief_block);
```

我们用`jsPsych.data.get()`给`trials`赋值，这个方法会返回一个jsPsych的数据集，包含了实验的所有数据。可以用`.filter`来筛选出`task`为`response`的试次（这就体现出了第11部分对数据进行标记的好处了）。`trials`包含了所有呈现圆形的试次的数据。

我们可以再用`.filter`筛选出反应正确的试次，即，从`trial`中选出所有`correct`属性为`true`的试次。

计算正确率时，可以用`.count()`方法来判断正确的试次数以及总试次数，还可以用`Math.round()`对结果进行取整。

最后，我们利用`correct_trials`数据集的`.select`方法计算正确反应的平均反应时，即筛选出这些试次的`rt`属性，再用`.mean()`方法计算出这些反应时数据的平均值。

## 完整代码

完整的代码可以在你jsPsych的`/examples`文件夹下找到，文件名为`demo-simple-rt-task.html`。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="jspsych-6.3.0/jspsych.js"></script>
    <script src="jspsych-6.3.0/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jspsych-6.3.0/plugins/jspsych-image-keyboard-response.js"></script>
    <script src="jspsych-6.3.0/plugins/jspsych-preload.js"></script>
    <link href="jspsych-6.3.0/css/jspsych.css" rel="stylesheet" type="text/css">
  </head>
  <body></body>
  <script>

    /* create timeline */
    var timeline = [];

    /* preload images */
    var preload = {
      type: 'preload',
      images: ['img/blue.png', 'img/orange.png']
    }
    timeline.push(preload);

    /* define welcome message trial */
    var welcome = {
      type: "html-keyboard-response",
      stimulus: "Welcome to the experiment. Press any key to begin."
    };
    timeline.push(welcome);

    /* define instructions trial */
    var instructions = {
      type: "html-keyboard-response",
      stimulus: `
        <p>In this experiment, a circle will appear in the center 
        of the screen.</p><p>If the circle is <strong>blue</strong>, 
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J 
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='img/blue.png'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div class='float: right;'><img src='img/orange.png'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
      `,
      post_trial_gap: 2000
    };
    timeline.push(instructions);

    /* test trials */
    var test_stimuli = [
      { stimulus: "img/blue.png",  correct_response: 'f'},
      { stimulus: "img/orange.png",  correct_response: 'j'}
    ];

    var fixation = {
      type: 'html-keyboard-response',
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
      },
      data: {
        task: 'fixation'
      }
    }

    var test = {
      type: "image-keyboard-response",
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: ['f', 'j'],
      data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
      },
      on_finish: function(data){
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
      }
    }

    var test_procedure = {
      timeline: [fixation, test],
      timeline_variables: test_stimuli,
      repetitions: 5,
      randomize_order: true
    }
    timeline.push(test_procedure);

    /* define debrief */

    var debrief_block = {
      type: "html-keyboard-response",
      stimulus: function() {

        var trials = jsPsych.data.get().filter({task: 'response'});
        var correct_trials = trials.filter({correct: true});
        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
        var rt = Math.round(correct_trials.select('rt').mean());

        return `<p>You responded correctly on ${accuracy}% of the trials.</p>
          <p>Your average response time was ${rt}ms.</p>
          <p>Press any key to complete the experiment. Thank you!</p>`;

      }
    };
    timeline.push(debrief_block);

    /* start the experiment */
    jsPsych.init({
      timeline: timeline,
      on_finish: function() {
        jsPsych.data.displayData();
      }
    });
  </script>
</html>
```
