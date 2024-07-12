# 根据浏览器类型排除被试

在线实验的被试可能会使用不同类型的浏览器。根据实验内容的不同，我们可能需要对允许使用的浏览器进行限制。在jsPsych中，这一功能的实现很简单，我们只需要在`jsPsych.init`方法中设置特定的排除被试的标准即可。如果被试的浏览器达不到标准，则不会开始实验，此时被试会看到关于这个问题的消息。如果是被试浏览器窗口大小达不到标准，则被试会看到一条消息，记录其浏览器窗口尺寸以及满足要求的最小尺寸，从而让被试可以放大窗口，继续实验。

现在排除被试的标准包括：

* 浏览器窗口的最小宽&高
* 是否支持WebAudio API

## 示例

#### 如果浏览器不满足800x600像素的最小尺寸要求则剔除

```javascript
jsPsych.init({
  timeline: exp,
  exclusions: {
    min_width: 800,
    min_height: 600
  }
});
```

#### 如果浏览器不能使用WebAudio API则剔除

```javascript
jsPsych.init({
  timeline: exp,
  exclusions: {
    audio: true
  }
});
```
