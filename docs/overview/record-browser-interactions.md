# 记录浏览器交互

被试参加在线实验时有可能会干一些实验以外的事情，因此jsPsych会东记录被试点击实验以外的窗口以及在全屏模式下运行实验时被试退出全屏模式的行为。这部分的数据和实验的数据分开记录，可以通过[jsPsych.data.getInteractionData()](../core_library/jspsych-data.html#jspsychdatagetinteractiondata)访问。

被试离开实验窗口、退出全屏模式或进入全屏模式时，该事件都会被记录到交互数据当中。所有事件数据结构如下：

```javascript
{
  event: 'focus', // 'focus' or 'blur' or 'fullscreenenter' or 'fullscreenexit'
  trial: 12, // the index of the active trial when the event happened
  time: 1240543 // time in ms since the start of the experiment
}
```

我们可以在`jsPsych.init()`方法中自定义一个函数，在每次产生新的交互数据时执行。

```javascript
jsPsych.init({
  on_interaction_data_update: function(data) {
    console.log(JSON.stringify(data))
  }
});
```
