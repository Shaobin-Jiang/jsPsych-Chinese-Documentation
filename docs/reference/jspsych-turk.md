# jsPsych.turk

jsPsych.turk模块包含了和Mechanical Turk交互的函数。

---

## jsPsych.turk.submitToTurk

```javascript
jsPsych.turk.submitToTurk(data)
```

### 参数

参数 | 类型 | 描述 
----------|------|------------
data | 对象 | 当前参数中的数据会被Mechanical Turk保存，并可以通过Mechanical Turk保存为CSV文件。**注意**：当前参数至少要有一对键值对，否则HIT无法正确提交。 

### 返回值

无。

### 描述

当前方法会将HIT提交到Mechanical Turk，从而结束HIT。

当前只有从Mechanical Turk网站调用时才会生效。如果我们使用外部HIT，让被试跳转到了托管在我们服务器上的界面，则当前方法失效。只有在我们将实验内容呈现在Mechanical Turk网站页面上的一个iframe元素内，当前方法才会生效。

### 示例

```html
<p>Enter the code you were given:</p>
<input type="text" id="code"></input>
<button onclick="sendData();">Submit HIT</button>

<script>
// this content must be loaded in the iframe on the mechanical turk website.
// usually, this means that the content is part of your 'recruitment ad', the
// page the workers can see when they are deciding whether or not to accept a HIT.
// one option is to include a simple form on this page that workers submit, with a
// special code that they get at the end of the experiment.

function sendData() {
  jsPsych.turk.submitToTurk({
    code: document.getElementById('code').value
  });
}
</script>
```

---

## jsPsych.turk.turkInfo

```javascript
jsPsych.turk.turkInfo()
```

### 参数

无。

### 返回值

返回包含以下6个属性的对象：

* `.assignmentId` 为HIT的assignment ID
* `.hitId` 为HIT ID。
* `.workerId` 为当前被试的worker ID。
* `.turkSubmitTo` 为提交HIT的URL。该参数用于`jsPsych.turk.submitToTurk`方法。
* `.previewMode` 是一个布尔值，表明被试是否接受了HIT。如果被试在Mechanical Turk内查看当前页、且还没有店家'Accept HIT'，则当前值为true。如果被试在Mechanical Turk外部查看页面或者已经接受了HIT，则当前值为false。
* `.outsideTurk`  是一个布尔值，表明被试是在Mechanical Turk内查看页面还是通过别的方式（如，直接访问页面URL）查看页面。

### 描述

当前方法会返回当前Mechanical Turk进程的基本信息，包括worker ID, assignment ID, 和 HIT ID。

### 示例

```javascript
var turkInfo = jsPsych.turk.turkInfo();

alert('Worker ID is: ' + turkInfo.workerId);

alert('Assignment ID is: ' + turkInfo.assignmentId);

alert('HIT ID is: ' + turkInfo.hitId);

// true if the page is viewed within Mechanical Turk, 
// but worker has not accepted the HIT yet.
// false if the page is viewed outside Mechanical Turk,
// OR the worker has accepted the HIT.
alert('Preview mode? ' + turkInfo.previewMode); 

// true if the page is viewed outside mechanical turk,
// false otherwise.
alert('Outside turk? ' + turkInfo.outsideTurk);
```
