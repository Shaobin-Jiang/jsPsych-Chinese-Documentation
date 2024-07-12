# 教程内容摘要

本部分教程会带你了解如何编写一个简单反应时任务。该任务的内容是，当屏幕上呈现一个蓝色的圆形或橙色的圆形时分别按不同的键。尽管这个任务很简单，但本部分的教程其实涵盖了jsPsych中很多关键的特性，包括：

* 使用插件创建一个标准试次
* 将多种插件结合在一起创建不同种类的试次
* 使用时间线变量来最大程度地复用代码
* 预加载多媒体文件
* 呈现顺序地随机
* 操作、筛选和汇总数据
* 根据被试反应动态改变实验参数

## 第1部分：初始化实验

我们首先创建一个HTML文件，并引入`jsPsych`、`html-keyboard-response`插件和`jspsych.css`等文件。如果你不知道这一步该怎么做，可以参见[Hello World的呈现](hello-world.md)。现在，你的HTML文件应该是这样的：

!!!info "补充"
    当前的教程[使用CDN引入jsPsych](hello-world.md#1cdn)。如果你使用别的方式引入jsPsych，那么你的代码和示例代码应该只有引入jsPsych的方式有所不同。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>
  </script>
</html>
```

我们接下来，就以这一部分代码为基础，完成实验的编写。

## 第2部分：呈现欢迎的内容

首先，我们需要将jsPsych初始化。实现这一功能需要调用[`initJsPsych()`函数](../reference/jspsych.md#initjspsych)，并将其返回值赋给一个变量。我们将这个变量命名为`jsPsych`。

```javascript
var jsPsych = initJsPsych();
```

所有使用jsPsych编写的实验流程都是通过时间线进行定义的。时间线是一个数组，该数组包括了实验中所有的试次。我们可以先创建一个空的时间线数组，后面我们创建新的试次的时候，会将这些试次添加到这个数组中。

```javascript
var timeline = [];
```

现在，我们来给被试呈现一段文字表示欢迎。这一功能可以使用[html-keyboard-response](../plugins/html-keyboard-response.md)插件实现。

首先，我们创建一个使用`html-keyboard-response`插件的试次，该试次包含了一条呈现给被试的简短的内容。我们在[插件文档页](../overview/plugins.md)中提到，试次对象必须有一个`type`参数，该参数的作用是告诉jsPsych使用哪个插件。`type`参数的值和所使用的插件名很想，但是它的开头有一个`jsPsych`，并且是按驼峰法命名的，而不是使用横线进行分割。所以，如果我们要使用`html-keyboard-response`插件，就需要将试次的`type`指定为`jsPsychHtmlKeyboardResponse`。

```javascript
var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin."
};
```

接着，我们需要将这个试次push到时间线中。这样，该试次就被添加到了数组的末尾。

```javascript
timeline.push(welcome);
```

最后，我们需要告诉jsPsych去运行实验。这就要求我们调用[jsPsych.run()函数](../reference/jspsych.md#jspsychrun)并传入时间线数组。

```javascript
jsPsych.run(timeline);
```
在教程的每一步骤的末尾，我们都可以查看到目前位置的完整代码：

??? example "完整代码"
    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>
        
        /* initialize jsPsych */
        var jsPsych = initJsPsych();

        /* create timeline */
        var timeline = [];

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第3部分：呈现指导语

我们可以按照第2部分的方式，再创建一个`html-keyboard-response`试次，用来给被试呈现指导语。不过有所不同的是，在这个试次中，我们会使用到HTML格式的字符串来控制指导与的呈现，并且我们会指定`post_trial_gap`参数，使得指导语呈现结束后经过2秒，才会进入下一个试次。

试次定义如下：

```javascript
var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>In this experiment, a circle will appear in the center 
    of the screen.</p><p>If the circle is <strong>blue</strong>, 
    press the letter F on the keyboard as fast as you can.</p>
    <p>If the circle is <strong>orange</strong>, press the letter J 
    as fast as you can.</p>
    <div style='width: 700px;'>
    <div style='float: left;'><img src='img/blue.png'></img>
    <p class='small'><strong>Press the F key</strong></p></div>
    <div style='float: right;'><img src='img/orange.png'></img>
    <p class='small'><strong>Press the J key</strong></p></div>
    </div>
    <p>Press any key to begin.</p>
  `,
  post_trial_gap: 2000
};
```

!!!tip "小贴士"
    JavaScript中，定义`字符串`的方式有3种。我们可以使用单引号`'`、双引号`"`、或者反引号`` ` ``。使用反引号创建字符串相比于其他两种方式的优势在于，我们可以把字符串写成多行的形式，且可以使用[模板字符串](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)来更方便地将变量引入到字符串种。这两大优势在创建较长的HTML字符串的时候尤为突出。

我们可以看到，上面的HTML种包含了`<img>`标签，用于呈现实验刺激。我们需要下载这两张图片。右键点击下方的图片并选择*图片另存为...*，然后将保存的图片放到实验项目所在文件夹下的`img`文件夹中。

![blue circle](../img/blue.png)
![orange circle](../img/orange.png)

不要忘了把这个试次添加到时间线中：

```javascript
timeline.push(instructions);
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych();

        /* create timeline */
        var timeline = [];

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第4部分：呈现刺激并记录被试反应

呈现刺激和呈现指导语是一个道理，只不过我们现在要呈现的是图片，而不是文字或HTML。因此，现在需要用到另一个插件——`image-keyboard-response`。我们先来通过`<script>`标签将这个插件添加进来。

```html hl_lines="5"
<head>
  <title>My experiment</title>
  <script src="https://unpkg.com/jspsych@7.1.2"></script>
  <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
  <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
  <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
</head>
```

现在，我们先将每张图片呈现一次。插件的`stimulus`参数用于指定所使用的图片文件的路径，`choices`属性指有效的按键。这里，我们规定只有'f'和'j'键是有效的按键。

```javascript
var blue_trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'img/blue.png',
  choices: ['f', 'j']
};

var orange_trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'img/orange.png',
  choices: ['f', 'j']
};
```

和前面一样，需要将这个试次添加到时间线当中。

```javascript
timeline.push(blue_trial, orange_trial);
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych();

        /* create timeline */
        var timeline = [];

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define test trials */
        var blue_trial = {
          type: jsPsychImageKeyboardResponse,
          stimulus: 'img/blue.png',
          choices: ['f', 'j']
        };

        var orange_trial = {
          type: jsPsychImageKeyboardResponse,
          stimulus: 'img/orange.png',
          choices: ['f', 'j']
        };

        timeline.push(blue_trial, orange_trial);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第5部分：预加载多媒体文件

当我们在实验中使用多媒体文件 (图片、音频、视频)时，应该在使用之前进行预加载，即，浏览器会在用到这些文件前将它们下载好，这样就不会在试次中用到这些资源时因为还需要下载它们而造成延迟了。

现在，我们来使用[预加载插件](../plugins/preload.md)来预加载这两张图片。[多媒体文件预加载部分](../overview/media-preloading.md)会对这个插件的各个选项进行更详尽的讲解，但现在，我们就只把需要预加载的文件列表传入这个插件。

首先，我们在`<head>`标签内将插件引入。

```html hl_lines="6"
<head>
  <title>My experiment</title>
  <script src="https://unpkg.com/jspsych@7.1.2"></script>
  <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
  <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
  <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
  <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
</head>
```

这个试次需要放在实验的最前面，所以需要将这段代码添加到`welcome`试次前。

```js
var preload = {
  type: jsPsychPreload,
  images: ['img/blue.png', 'img/orange.png']
};
```

和前面一样，需要将这个试次添加到时间线当中。

```js
timeline.push(preload);
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych();

        /* create timeline */
        var timeline = [];

        /* preload images */
        var preload = {
          type: jsPsychPreload,
          images: ['img/blue.png', 'img/orange.png']
        };
        timeline.push(preload);

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define test trials */
        var blue_trial = {
          type: jsPsychImageKeyboardResponse,
          stimulus: 'img/blue.png',
          choices: ['f', 'j']
        };

        var orange_trial = {
          type: jsPsychImageKeyboardResponse,
          stimulus: 'img/orange.png',
          choices: ['f', 'j']
        };
        timeline.push(blue_trial, orange_trial);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第6部分：时间线变量

在一个完整的实验中，可不能只有两个试次。如果要添加更多的试次，可以创建多个对象并添加到时间线中，也可以使用更高效的方式——时间线变量。

可以看到，呈现蓝色和橙色圆的试次的参数十分相似，唯一的不同之处在于呈现的图片文件。如果使用了时间线变量，就可以只定义一个呈现刺激的试次，然后不断复用，每次使用不同的参数。下面的例子中，我们可以看到，对于当前这种简单的实验，使用时间线变量也可以显著减少代码量。

首先，我们创建数组，将实验中要用到的试次放进去。现在这个实验只有两个试次——蓝色和橙色。

```javascript
var test_stimuli = [
  { stimulus: "img/blue.png"},
  { stimulus: "img/orange.png"}
];
```

然后，我们在显示蓝色或橙色的圆形以外，再在试次间呈现一个注视点 (+)。通过设置`html-keyboard-response`插件的`trial_duration`参数 (试次持续的时间)并将`choices`参数设置为`NO_KEYS` (所有按键均为无效案按键)，就可以让注视点呈现固定时长。

```javascript
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 1000,
};
```

我们再添加一个`image-keyboard-response`插件来显示刺激，不过这一次，我们用`jsPsych.timelineVariable()`函数来指定`stimulus`参数，jsPsych会从时间线变量中选取并对此赋值。

```javascript
var test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j']
}
```

为了让jsPsych知道调用`jsPsych.timelineVariable()`的时候是要从`test_stimuli`数组中取值，我们还需要创建一条新的时间线，并为其添加`timeline_variables`属性。

```javascript
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli
}
```

我们需要将`test_procedure`添加到主时间线，即`timeline`数组中，而`fixation`和`test`则不需要添加，因为我们已经把它们添加到`test_procedure`时间线中了。

```javascript
timeline.push(test_procedure);
```

当实验来到`test_procedure`这里时，jsPsych会根据`test_stimuli`数组的长度决定运行`test_procedure`时间线的次数 (当前实验中是2次)。第一次运行时，jsPsych会使用时间线变量中的第一个值 (蓝色)，第二次运行时则会使用第二个值 (橙色)。注意，呈现橙色圆和蓝色圆之前都会显示注视点，因为`timeline_variables`数组中每有一个值，都会将`test_procedure`的时间线完整重复一次。

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych();

        /* create timeline */
        var timeline = [];

        /* preload images */
        var preload = {
          type: jsPsychPreload,
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define trial stimuli array for timeline variables */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];

        /* define fixation and test trials */
        var fixation = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: "NO_KEYS",
          trial_duration: 1000,
        };

        var test = {
          type: jsPsychImageKeyboardResponse,
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        };

        /* define test procedure */
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli
        };
        timeline.push(test_procedure);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第7部分：为添加了时间线变量的时间线设置参数

现在，我们的实验只有两个试次，而且每次实验中刺激的呈现顺序还是固定不变的。而在使用时间线变量的时候，我们可以对试次进行随机或多次重复。如果需要随机，可以对指定了`timeline_variables`属性的那个对象设置`randomie_order: true`。

```javascript
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true
};
```

我们还可以通过设置`repetitions`参数来延长实验。这一参数的作用是指定`timeline_variables`数组的重复次数。例如，如果我们设置`repetitiosn: 5`，则实验会将`timeline_variables`数组重复5次，因而，实验共有10个试次。

```javascript
var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  randomize_order: true,
  repetitions: 5
};
```
??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych();

        /* create timeline */
        var timeline = [];

        /* preload images */
        var preload = {
          type: jsPsychPreload,
          images: ['img/blue.png', 'img/orange.png']
        };
        timeline.push(preload);

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define trial stimuli array for timeline variables */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];

        /* define fixation and test trials */
        var fixation = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: "NO_KEYS",
          trial_duration: 1000,
        };

        var test = {
          type: jsPsychImageKeyboardResponse,
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        };

        /* define test procedure */
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        };
        timeline.push(test_procedure);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第8部分：使用函数指定参数

现在的实验还有一处可以改进的地方，那就是注视点的呈现时间。现在，刺激出现的时间是固定的，但是我们可以控制`fixation`试次的`trial_duration`属性来改变这一现状，只不过这样做的难处在于怎么保持现在这种代码结构。我们可以再添加一个时间线变量来控制时长，如`fixation_duration`，也可以选择另一种方案，将`trial_duration`定义为一个函数。如果参数为函数，则jsPsych会在运行到这个试次的时候执行这个函数。这意味着，如果这个函数每次的返回值是随机的，那么每次运行到这个试次时，我们可能会得到不同的参数值。

在当前的代码中，我们需要用到jsPsych内置的随机方法，参见[jsPsych.randomization模块](../reference/jspsych-randomization.md)。`jsPsych.randomization.sampleWithoutReplacement()`方法会从数组中无重复地随机抽取 *N* 个元素组成一个新的数组。

```javascript
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  }
}
```

上面的代码中，我们把`fixation`中原本的`trial_duration: 1000`参数替换成了一个函数。函数里，我们从数组`[250, 500, 750, 1000, 1250, 1500, 1750, 2000]`中随机抽取1个元素 (传入`jsPsych.randomization.sampleWithoutReplacement`的第二个参数)。`jsPsych.randomization.sampleWithoutReplacement`的返回值是一个长度为1的数组，所以我们还需要加上`[0]`来获取随机抽取的元素的值。

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

        /* initialize jsPsych */
        var jsPsych = initJsPsych();

        /* create timeline */
        var timeline = [];

        /* preload images */
        var preload = {
          type: jsPsychPreload,
          images: ['img/blue.png', 'img/orange.png']
        }
        timeline.push(preload);

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define trial stimuli array for timeline variables */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];

        /* define fixation and test trials */
        var fixation = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: "NO_KEYS",
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          }
        };

        var test = {
          type: jsPsychImageKeyboardResponse,
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        };

        /* define test procedure */
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        };
        timeline.push(test_procedure);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第9部分：呈现数据

现在这个简单的实验已经成型了，可以来看一看收集的数据了。jsPsych内置了[`jsPsych.data.displayData()`函数](../reference/jspsych-data.md#jspsychdatadisplaydata)，在debug的时候非常有用。该函数会清空屏幕上的内容，并显示实验进行到当前阶段所收集到的原始数据。我们在真正开展实验的时候，这个功能并没有什么用处，但是在开发阶段，用这个功能去查看收集到的数据还是很好用的。

如果想让`displayData`函数在实验结束时运行一次，可以使用[`on_finish`回调函数](../overview/events.md#on_finish-experiment)。该函数会自动在实验中所有试次结束后执行一次。我们可以在通过`initJsPsych`方法初始化jsPsych的时候设置这个函数。

```javascript
var jsPsych = initJsPsych({
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
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych({
          on_finish: function() {
            jsPsych.data.displayData();
          }
        });

        /* create timeline */
        var timeline = [];

        /* preload images */
        var preload = {
          type: jsPsychPreload,
          images: ['img/blue.png', 'img/orange.png']
        };
        timeline.push(preload);

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define trial stimuli array for timeline variables */
        var test_stimuli = [
          { stimulus: "img/blue.png"},
          { stimulus: "img/orange.png"}
        ];

        /* define fixation and test trials */
        var fixation = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: "NO_KEYS",
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          }
        };

        var test = {
          type: jsPsychImageKeyboardResponse,
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j']
        };

        /* define test procedure */
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        };
        timeline.push(test_procedure);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第10部分：添加数据

jsPsych中，所有的试次都可以任意添加额外的数据。这一部分数据会和插件自身记录的数据一起被记录下来，这样，实验者就可以记录除了实验数据以外的、试次相关的属性。

我们什么时候会用到这一特性呢？在这个实验中，如果给所有呈现圆形的试次都标记为`response`试次，在数据处理阶段就可以更方便地筛选出那些关键试次。我们可以这样实现这一功能：

```javascript
var test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: {
    task: 'response'
  }
};
```

我们还可以给试次添加诸如正确反应这一类属性 (蓝色圆按F，橙色圆按J)。在当前的代码中，是通过时间线变量来控制呈现什么颜色的圆形。所以，如果要根据呈现刺激的不同来给试次添加不同的正确反应，就需要在`test_stimuli`中添加这个正确反应，并在试次的`data`属性中调用`jsPsych.timelineVariable()`函数进行赋值。

我们先给`test_stimuli`中的每个对象添加一个"correct_response"属性并赋值。

```javascript
var test_stimuli = [
  { stimulus: "img/blue.png",  correct_response: 'f'},
  { stimulus: "img/orange.png",  correct_response: 'j'}
];
```

这样，就可以在`test`试次的`data`参数中调用`timelineVariable()`函数来获取各个试次的"correct_response"值。

```javascript
var test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: {
    task: 'response',
    correct_response: jsPsych.timelineVariable('correct_response')
  }
};
```

我们可能还会需要将呈现注视点的试次标记出来，这样就可以更方便地将这些试次的数据移除

```js
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  },
  data: {
    task: 'fixation'
  }
};
```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych({
          on_finish: function() {
            jsPsych.data.displayData();
          }
        });

        /* create timeline */
        var timeline = [];

        /* preload images */
        var preload = {
          type: jsPsychPreload,
          images: ['img/blue.png', 'img/orange.png']
        };
        timeline.push(preload);

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define trial stimuli array for timeline variables */
        var test_stimuli = [
          { stimulus: "img/blue.png",  correct_response: 'f'},
          { stimulus: "img/orange.png",  correct_response: 'j'}
        ];

        /* define fixation and test trials */
        var fixation = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: "NO_KEYS",
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          },
          data: {
            task: 'fixation'
          }
        };

        var test = {
          type: jsPsychImageKeyboardResponse,
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j'],
          data: {
            task: 'response',
            correct_response: jsPsych.timelineVariable('correct_response')
          }
        };

        /* define test procedure */
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        };
        timeline.push(test_procedure);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
      </html>
    ```

## 第11部分：在实验中操作实验数据

在对试次进行了标记后，分析阶段就可以更方便地判断被试反应是否正确了。

但是，我们也可以在实验运行过程中就把这件事情做了，这样也为事后的分析省了不少时间。

这需要用到试次的`on_finish`事件。我们可以把函数赋给`on_finish`，该函数的传入值为当前试次记录的数据。函数内部可以对这个数据对象进行操作，对该传入参数的改变也应用到jsPsych内部记录的数据上。

下面的示例中，我们会对被试反应是否正确进行判断，并给数据对象添加一个`correct`属性。

```javascript
var test = {
  type: jsPsychImageKeyboardResponse,
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['f', 'j'],
  data: {
    task: 'response',
    correct_response: jsPsych.timelineVariable('correct_response')
  },
  on_finish: function(data){
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
  }
};
```

`data.response`的值是被试按的键，我们把这个值和`data.correct_response`值进行比较，并将计算出的结果赋给`data.correct`。

!!!info "补充"
  在这里，我们用到了[jsPsych.pluginAPI.compareKeys](../reference/jspsych-pluginAPI.md#jspsychpluginapicomparekeys)函数来比较`data.response`和`data.correct_response`。之所以使用这个函数，是因为它进行比较既可以是 *大小写敏感* 也可以是 *大小写不敏感*，这取决于[实验的配置](../overview/experiment-options.md)。被试按键的记录是大小写敏感的 (例如，'f'或'F')，但很多时候我们并不在乎被试的按键是大写还是小写的 (所以默认情况下，我们将实验设置中的`case_sensitive`属性设置为`false`)。使用了`jsPsych.pluginAPI.commpareKeys`函数后，即使被试在按键的同时按下了Shift或Caps Lock，jsPsych也能正确记录被试的反应。这个函数仅和键盘按键相关；对于其他类型的反应，如点击按钮，则可以直接将被试反应和正确答案进行比较，例如：
  ```js
  data.correct = data.response === data.correct_response;
  ```

??? example "完整代码"

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>My experiment</title>
        <script src="https://unpkg.com/jspsych@7.1.2"></script>
        <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
        <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
        <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
      </head>
      <body></body>
      <script>

        /* initialize jsPsych */
        var jsPsych = initJsPsych({
          on_finish: function() {
            jsPsych.data.displayData();
          }
        });

        /* create timeline */
        var timeline = [];

        /* preload images */
        var preload = {
          type: jsPsychPreload,
          images: ['img/blue.png', 'img/orange.png']
        };
        timeline.push(preload);

        /* define welcome message trial */
        var welcome = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: "Welcome to the experiment. Press any key to begin."
        };
        timeline.push(welcome);

        /* define instructions trial */
        var instructions = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
          `,
          post_trial_gap: 2000
        };
        timeline.push(instructions);

        /* define trial stimuli array for timeline variables */
        var test_stimuli = [
          { stimulus: "img/blue.png",  correct_response: 'f'},
          { stimulus: "img/orange.png",  correct_response: 'j'}
        ];

        /* define fixation and test trials */
        var fixation = {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: "NO_KEYS",
          trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
          },
          data: {
            task: 'fixation'
          }
        };

        var test = {
          type: jsPsychImageKeyboardResponse,
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ['f', 'j'],
          data: {
            task: 'response',
            correct_response: jsPsych.timelineVariable('correct_response')
          },
          on_finish: function(data){
            data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
          }
        };

        /* define test procedure */
        var test_procedure = {
          timeline: [fixation, test],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 5
        };
        timeline.push(test_procedure);

        /* start the experiment */
        jsPsych.run(timeline);

      </script>
    </html>
    ```

## 第12部分：数据汇总

jsPsych提供了一些用于分析数据的函数，例如计算指定试次的平均反应时。在这一部分，我们就来试着用这些函数，给实验最后添加一个试次，把被试的准确率和平均反应时呈现给他们。

这里用的是`html-keyboard-response`插件。因为呈现的内容是由被试在实验中的表现所决定的，因而我们需要用函数给`stimulus`参数赋值，这个函数的返回值就是需要呈现的文本内容。

!!!info "补充"
  把函数赋值给一个"普通"的参数 (即，所要求的数据类型不是函数的参数)有很多方便之处，因为这样就可以根据被试前面的反应和其他在实验开始时无从得知的信息动态改变参数值。详见[动态参数部分](../overview/dynamic-parameters.md)。

这一部分的代码是这样的：

```js
var debrief_block = {
  type: jsPsychHtmlKeyboardResponse,
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

给`trials`变量赋值时，用到了`jsPsych.data.get()`，这个函数的返回值是一个jsPsych数据集，它包含了实验中收集的所有数据。我们可以用`.filter`来选取出`task`属性为`'response'`的试次 (这就体现出了第10部分中对试次进行标记的好处了)。`trials`包含了所有呈现刺激的试次的数据。

我们可以再调用一次`.filter()`来从`trials`数据集中选取出`correct`属性为`true`的试次，从而筛选出被试做出正确反应的试次

计算正确率的时候，我们调用了`.count()`方法来判断正确的试次数和总试次数，并使用了`Math.round()`函数来去除小数点后的位数。

最后，我们对`correct_trials`数据集使用了`.select`方法，选取这些试次的`'rt'`属性，去计算正确反应试次的平均反应时，然后再使用`.mean()`方法来计算平均反应时。

## 完整代码

下面的代码可以在下载的jsPsych的`/examples`文件夹中找到，文件名为`demo-simple-rt-task.html`。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My experiment</title>
    <script src="https://unpkg.com/jspsych@7.1.2"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.0"></script>
    <script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.0"></script>
    <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.0"></script>
    <link href="https://unpkg.com/jspsych@7.1.2/css/jspsych.css" rel="stylesheet" type="text/css" />
  </head>
  <body></body>
  <script>

    /* initialize jsPsych */
    var jsPsych = initJsPsych({
      on_finish: function() {
        jsPsych.data.displayData();
      }
    });

    /* create timeline */
    var timeline = [];

    /* preload images */
    var preload = {
      type: jsPsychPreload,
      images: ['img/blue.png', 'img/orange.png']
    };
    timeline.push(preload);

    /* define welcome message trial */
    var welcome = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "Welcome to the experiment. Press any key to begin."
    };
    timeline.push(welcome);

    /* define instructions trial */
    var instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <p>In this experiment, a circle will appear in the center 
        of the screen.</p><p>If the circle is <strong>blue</strong>, 
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J 
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='img/blue.png'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div style='float: right;'><img src='img/orange.png'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
      `,
      post_trial_gap: 2000
    };
    timeline.push(instructions);

    /* define trial stimuli array for timeline variables */
    var test_stimuli = [
      { stimulus: "img/blue.png",  correct_response: 'f'},
      { stimulus: "img/orange.png",  correct_response: 'j'}
    ];

    /* define fixation and test trials */
    var fixation = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: "NO_KEYS",
      trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
      },
      data: {
        task: 'fixation'
      }
    };

    var test = {
      type: jsPsychImageKeyboardResponse,
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: ['f', 'j'],
      data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response')
      },
      on_finish: function(data){
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
      }
    };

    /* define test procedure */
    var test_procedure = {
      timeline: [fixation, test],
      timeline_variables: test_stimuli,
      repetitions: 5,
      randomize_order: true
    };
    timeline.push(test_procedure);

    /* define debrief */
    var debrief_block = {
      type: jsPsychHtmlKeyboardResponse,
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
    jsPsych.run(timeline);
    
  </script>
</html>
```
