# 接入Prolific

[Prolific](https://www.prolific.co/?ref=5JCXZPVU)提供一个面向科研的招募被试的服务。将jsPsych编写的实验接入Prolific需要记录被试的ID并在实验结束后跳转到特定的一个URL。

## 记录Participant ID, Study ID, and Session ID

在Prolific上创建研究时，我们需要提供研究的URL。在把实验托管到服务器上后（详见[运行实验](/overview/running-experiments.html#_6)），就有了实验的URL， 我们此时需要把该URL填写到Prolific的 *study link* 部分，然后点击通过URL记录Prolific ID选项。

![Prolific screenshot](/img/prolific-study-link.png)

这样，就会把被试的prolific ID (`PROLIFIC_PID`)，研究的ID (`STUDY_ID`)和session的ID (`SESSION_ID`)添加到被试访问实验的URL后面。

jsPsych中会记录这些量并添加到数据中。可以在代码中任意部分执行该功能，而不需要再时间线中进行。

```html
<script>
  // capture info from Prolific
  var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
  var study_id = jsPsych.data.getURLVariable('STUDY_ID');
  var session_id = jsPsych.data.getURLVariable('SESSION_ID');

  jsPsych.data.addProperties({
    subject_id: subject_id,
    study_id: study_id,
    session_id: session_id
  });

  // create the rest of the experiment
  var timeline = [...]

  jsPsych.init({
    timeline: timeline
  })
</script>
```

## 结束实验

实验结束时，Prolific要求将被试跳转到Prolific服务器上标志着session结束的一个URL上。该链接由Prolific在设置阶段的 *study completion* 部分提供。

![Prolific Study Completion Screenshot](/img/prolific-study-completion.png)

我们可以用多种范式实现这个功能。

!!! warning "警告"
    在被试回到Prolific之前，我们需要保存数据。请确保在此之前，已经完成了和服务器之间的通讯。解决方法之一是使用`call-function`插件中的异步功能 ([参照这个示例](/plugins/jspsych-call-function.html#_6))。

### 被试点击链接

方法之一是创建一个包含链接的试次，被试可以通过点击链接结束实验并返回Prolific。例如，`html-keyboard-response`插件可以用来呈现包含链接的文字。我们可以在debrief阶段呈现该链接。

下面的示例中展示了该如何实现这一功能。注意，我们将`choices`设置为了`jsPsych.NO_KEYS`，以方便我们将实验停在当前位置。

```js
var final_trial = {
  type: 'html-keyboard-response',
  stimulus: `<p>You've finished the last task. Thanks for participating!</p>
    <p><a href="https://app.prolific.co/submissions/complete?cc=XXXXXXX">Click here to return to Prolific and complete the study</a>.</p>`,
  choices: jsPsych.NO_KEYS
}
```

### 自动跳转

另一个方案是在实验结束后自动将被试跳转到完成页面。我们可以在jsPsych的时间线中加入这一功能。

下面的示例中在`on_finish`中加入了自动跳转。

```js
jsPsych.init({
  timeline: [...],
  on_finish: function(){
    window.location = "https://app.prolific.co/submissions/complete?cc=XXXXXXX"
  }
});
```


