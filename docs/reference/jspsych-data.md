# jsPsych.data

jsPsych.data模块包含了用于和jsPsych产生的数据交互的函数。

---

## jsPsych.data.addProperties

```javascript
jsPsych.data.addProperties(properties)
```

### 参数

参数 | 类型 | 描述 
----------|------|------------
properties | 对象 | 添加到数据中的对象。 

### 返回值

无。

### 描述

当前方法会对每个（已经完成的和尚未进行的）试次的数据对象中添加一系列新的属性。我们可以通过这个方法记录被试ID或实验分组等信息。

### 示例

#### 分配被试ID和实验条件

```javascript
jsPsych.data.addProperties({subject: 1, condition: 'control'});
```

---

## jsPsych.data.displayData

```javascript
jsPsych.data.displayData(format)
```

### 参数

参数 | 类型 | 描述 
----------|------|------------
format | 字符串 | 指定以`'csv'`还是`'json'`格式呈现数据。 

### 返回值

无。

### 描述

以JSON或CSV形式将所有数据输出到屏幕上。有助于我们在开发阶段进行debug。

### 示例

#### 在实验结束时使用on_finish回调显示数据

```javascript
var jsPsych = initJsPsych({
	on_finish: function() {
		jsPsych.data.displayData('csv');
	}
})
```

---

## jsPsych.data.get

```
jsPsych.data.get()
```

### 参数

无。

### 返回值

返回实验产生的数据集对象。

### 描述

我们一般都会用这个函数获取实验中的数据，它会返回一个数据集对象，包含了多种用于筛选、汇总、和查看数据的方法。后文会对这些方法进行介绍。

### 示例

```javascript
// select all trials
var all_data = jsPsych.data.get();

// get csv representation of data and log to console
console.log(all_data.csv());
```

---

## jsPsych.data.getInteractionData

```javascript
jsPsych.data.getInteractionData()
```

### 参数

无。

### 返回值

返回所有交互事件的数据集对象。

### 描述

jsPsych会自动记录一些不同类型的交互事件。当用户在实验过程中点击另一个窗口时，记为`blur`，即，他们没有在做实验。用户先点击了实验以外的地方（即，产生了`blur`事件）后又点击了实验部分，记为`focus`。`fullscreenenter`和`fullscreenexit`事件在进入和退出全屏模式时触发。但是，只有通过代码进入全屏，如，通过[fullscreen插件](../plugins/fullscreen.md)进入全屏才会触发`fullscreenenter`，而手动进入全屏不会。而无论被试手动退出全屏模式还是用代码控制退出全屏模式，都会触发`fullscreenexit`事件。当前方法返回记录了所有交互事件的数据集对象。我们可以通过这部分数据记录被试是否全程专注地完成了实验。每一个事件记录的格式如下：

```javascript
{
	type: 'focus' or 'blur' or 'fullscreenenter' or 'fullscreenexit',
	trial: 10, // the trial number when the event happened
	time: 13042 // total time elapsed since the start of the experiment
}
```

### 示例

```javascript
var interaction_data = jsPsych.data.getInteractionData();
// log data to console in json format
console.log(interaction_data.json());
```

---

## jsPsych.data.getLastTimelineData

```javascript
jsPsych.data.getLastTimelineData()
```

### 返回值

返回数据集对象。

### 描述

获取最后一个试次所在的时间线中全部的数据。

### 示例

```javascript
var lasttimelinedata = jsPsych.data.getLastTimelineData();
```

---

## jsPsych.data.getLastTrialData

```javascript
jsPsych.data.getLastTrialData()
```

### 返回值

返回数据集对象。

### 描述

获取最后一个试次产生的数据集对象。

### 示例

```javascript
var lasttrialdata = jsPsych.data.getLastTrialData();
```

---

## jsPsych.data.getURLVariable

```javascript
jsPsych.data.getURLVariable(var_name)
```

### 参数

参数 | 类型 | 描述 
----------|------|------------
var_name | 字符串 | 获取的变量。

### 返回值

返回URL query参数中某个变量的值。

### 描述

通过URL query字符串传入的变量。

### 示例

```javascript
// if the URL of the page is: experiment.html?subject=1234&condition=test
console.log(jsPsych.data.getURLVariable('subject')) // logs "1234"
console.log(jsPsych.data.getURLVariable('condition')) // logs "test"
```

---

## jsPsych.data.urlVariables

```javascript
jsPsych.data.urlVariables()
```

### 返回值

返回包含URL query字符串中所有变量和变量值的对象。

### 描述

提取URL query字符串中的变量。

### 示例

```javascript
// if the URL of the page is: experiment.html?subject=1234&condition=test
var urlvar = jsPsych.data.urlVariables();
console.log(urlvar.subject) // logs "1234"
console.log(urlvar.condition) // logs "test"
```

---

## jsPsych.data.write

```javascript
jsPsych.data.write(data_object)
```

### 参数

参数 | 类型 | 描述 
----------|------|------------
data_object | 对象 | 写入数据中的对象。 

### 返回值

无。

### 描述

该方法用于在`jsPsych.finishTrial`中写入数据。我们不应该在实验中用这个方法记录数据，而是应该使用[jsPsych.data.addProperties](#addProperties)。

### 示例

```javascript
// don't use this! data should only be written once per trial. use jsPsych.finishTrial to save data.

var trial_data = {
	correct: true,
	rt: 487
}

jsPsych.data.write(trial_data);
```

---

## 数据集对象 (DataCollection)

所有的数据都存储在数据集对象中。我们可以使用`jsPsych.data.get()`和`jsPsych.data.getLastTrialData()`这些方法获取数据集对象。下面是数据集对象中自带的所有方法。

#### .addToAll()

给数据集对象中所有的数据条目都加上某个属性，类似于`jsPsych.data.addProperties()`，只不过可以在对数据集对象进行筛选后，对子数据集使用。

```javascript
jsPsych.data.get().addToAll({subject_id: 123, condition: 'control'});
```

#### .addToLast()

给数据集对象中最后一个试次的数据添加属性。

```javascript
jsPsych.data.get().addToLast({success: true});
```

#### .count()

对数据集对象中试次计数。

```javascript
jsPsych.data.get().count()
```

#### .csv()

获取数据集对象中的数据的csv字符串。

```javascript
console.log(jsPsych.data.get().csv());
```

#### .filter()

筛选出子数据集。筛选器是一个对象，只有包含了筛选器中数据且数据值匹配的试次会被保留在子数据集中。例如，下面的代码中选择了所有数据中包含correct属性且correct属性为true的试次。

```javascript
var correct_trials = jsPsych.data.get().filter({correct: true});
```

该对象可以有多个键值对，只有满足所有筛选条件的试次才会被保留在返回的数据集中。

```javascript
// keep only correct trials from the practice phase
var correct_practice_trials = jsPsych.data.get().filter({correct:true, phase: 'practice'});
```

选器也可以是对象数组。数组中的多个对象起的是一个“或”的选择作用。只要试次与其中一个匹配就会出现在返回的数据集对象中。

```javascript
// select trials from block 1 and block 5.
var trials = jsPsych.data.get().filter([{block: 1}, {block:5}]);
```

filter方法会返回一个数据集对象，所以我们也可以对筛选后的结果使用适用于数据集对象的方法。

```javascript
// count the number of correct trials in block 1
var block_1_correct = jsPsych.data.get().filter({block:1, correct:true}).count();
```

#### .filterColumns()

选中数组中的多列数据；与`.ignore()`方法相反。

```javascript
// Get only the subject, rt, and condition entries for each trial.
const subset_of_data = jsPsych.data.get().filterColumns(['subject', 'rt', 'condition'])
```

#### .filterCustom()

该方法类似于`.filter()`方法，但是筛选器是一个函数。函数只有一个传入参数，是当前试次的数据。如果函数返回`true`，则该试次会保留在返回的子数据集中。

```javascript
// count the number of trials with a response time greater than 2000ms.
var too_long = jsPsych.data.get().filterCustom(function(trial){
	return trial.rt > 2000;
}).count()
```

#### .first() / .last()

返回前/后*n*个试次的数据集对象。如果*n*大于数据集对象中试次的总数，则返回的数据集对象中试次数和当前数据集中有的试次数相等。如果当前数据集中没有试次，则返回的数据集中也没有试次。如果没有指定*n*，则函数会使用默认值1。如果*n*为0或负数，则会报错。

```javascript
var first_trial = jsPsych.data.get().first(1);
var last_trial_with_correct_response = jsPsych.data.get().filter({correct: true}).last(1);
var last_10_trials = jsPsych.data.get().last(10);
```

#### .ignore()

返回一个数据集对象，但是从数据中移除了一个特定的属性。

```javascript
// log a csv file that does not contain the trial_type values for each trial
console.log(jsPsych.data.get().ignore('trial_type').csv());
```

#### .join()

将两个数据集拼接并返回拼接的结果。

```javascript
// get a DataCollection with all trials that are either correct or
// have a response time greater than 200ms.
var dc1 = jsPsych.data.get().filter({correct: true});
var dc2 = jsPsych.data.get().filterCustom(function(trial){ return trial.rt > 200});
var data = dc1.join(dc2);
```

#### .json()

获取数据集对象中的数据的json字符串。

```javascript
console.log(jsPsych.data.get().json());
```

#### .localSave()

在运行实验的电脑上保存CSV或JSON文件。如果是在线实验，这个方法会在被试的电脑上下载数据文件，所以我们不推荐在线实验中用这个方法进行数据收集。

**警告:** 在一些老版本的浏览器中，这个方法可能会出现错误，建议升级到主流浏览器的最新版本。

```javascript
// first argument is the format, second is the filename.
// the format can be either 'csv' or 'json'.
jsPsych.data.get().localSave('csv','mydata.csv');
```

#### .push()

向数据集中添加一条新的记录。通常地，这个方法是在框架内部使用的，我们不应该在实验中调用这个方法。

```javascript
var data = {correct: true, rt: 500}
jsPsych.data.get().push(data);
```

#### .readOnly()

创建一份数据集的副本，这样我们可以对副本进行修改，修改不会影响原始的数据。

```javascript
// this line edits the rt property of the first trial
jsPsych.data.get().first(1).values()[0].rt = 100;

// readOnly creates a copy that can be modified without affecting the original

jsPsych.data.get().first(1).values()[0].rt
// outputs 100

jsPsych.data.get().readOnly().first(1).values()[0].rt = 200
jsPsych.data.get().first(1).values()[0].rt
// still outputs 100
```

#### .select()

从数据集对象中返回一个属性的数据列 (DataColumn)对象 (详见下面的文档) 。

```javascript
var rt_data = jsPsych.data.get().select('rt');
rt_data.mean()
```

#### .uniqueNames()

从数据集对象中无重复地提取所有的属性名。这对于搭建关系型数据库 (如MySQL)是很有帮助的，因为我们需要预先设置列名称。

```javascript
console.log(jsPsych.data.get().uniqueNames());
```

#### .values()

返回数据集对象中的数据部分（数组）。我们可以修改这个数组进行修改，这些修改也会同时改变它所在的数据集对象。

```javascript
var raw_data = jsPsych.data.get().values();

// was response in first trial correct?
if(raw_data[0].correct){
	console.log('correct!');
} else {
	console.log('incorrect.');
}
```

---

## DataColumn

数据列对象指的是数据集对象中某个属性的所有值，通过数据集对象的`.select()`方法获得。有了数据列对象后，就可以使用下面的这些方法。

#### .all()

检查数据列中的所有值是否在传入到一个函数中时都返回true（即，是否都满足某个条件）。该函数只有一个传入参数，代表数据列中的一个值。

```javascript
// check if all the response times in the practice phase were under 1000ms
jsPsych.data.get().filter({phase: 'practice'}).select('correct').all(function(x) { return x < 1000; });
```

#### .count()

对数据列中的值进行计数。

```javascript
// count how many response times there are
jsPsych.data.get().select('rt').count();
```

#### .frequencies()

对数据列中所有不同值分别计数，并返回一个对象。对象的每个属性都是一个数据列中一个不同的值，属性值是该值在数据列中出现的次数。

```javascript
// get frequencies of correct and incorrect responses
jsPsych.data.get().select('correct').frequencies();
```

#### .max() / .min()

返回数据列中的最大/最小值。

```javascript
jsPsych.data.get().select('rt').max();
jsPsych.data.get().select('rt').min();
```

#### .mean()

返回数据列中所有数据的平均值。

```javascript
jsPsych.data.get().select('rt').mean();
```

#### .median()

返回数据列中所有数据的中位数。

```javascript
jsPsych.data.get().select('rt').median();
```

#### .sd()

返回数据列中所有数据的标准差。

```javascript
jsPsych.data.get().select('rt').sd();
```

#### .subset()

筛选出数据列中传入特定函数后返回`true`的值。

```javascript
// below results will be less than 200.
jsPsych.data.get().select('rt').subset(function(x){ return x < 200; }).max();
```

#### .sum()

返回数据列中所有数据的和。

```javascript
jsPsych.data.get().select('rt').sum();
```

#### .values

以数组形式返回数据列中数据的值。

```javascript
// note that this is not a function call.
jsPsych.data.get().select('rt').values;
```

#### .variance()

返回数据列中所有数据的方差。

```javascript
jsPsych.data.get().select('rt').variance();
```
