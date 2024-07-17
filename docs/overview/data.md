# 数据存储、汇总和操作

## jsPsych中的数据：永久和暂时的数据

有两种数据存储方式：将数据存储在**内存**中和将数据**永久保存**。永久保存的数据在浏览器关闭后仍然存在，一般是保存在数据库或者是文件中。保存在内存中的数据只在运行jsPsych的浏览器窗口没有关闭时存在。

jsPsych有很多和内存中数据交互的功能，但和永久存储的数据的交互功能很少。事实上，这是因为永久存储数据的方式多种多样，jsPsych没法限制你使用其中某一种。不过，永久存储数据显然是实验很重要的一部分，因此本页的第二部分会就永久存储数据给出一些建议。

## 在jsPsych的数据结构中存储数据

jsPsych内置了一个数据集，随着实验运行不断变化。每一个试次都会向该数据集添加数据，我们可以通过很多函数，如`jsPsych.data.get()`（会返回全部数据），访问数据。

在大多数情况下，收集数据的过程是自动且不可见的。插件自身会对数据进行存储，所以一般情况下和数据唯一的交互是在实验结束的时候，这时候可以将数据永久保存下来（详见后文）。但是，有些时候我们也需要一些和数据额外的交互，尤其是我们想要记录插件默认情况下不记录的数据，如被试编号或分组。此时，我们可能需要对每个试次添加数据。例如，在使用Stroop范式时，我们可能需要对试次的一致与不一致进行标记。这些情况会在后文进行说明。

### 给所有试次添加数据

很多时候，我们需要给实验的**所有**试次添加数据，如，给每个试次添加被试的ID。我们可以通过`jsPsych.data.addProperties()`函数实现这一功能。示例如下：

```javascript
// generate a random subject ID with 15 characters
var subject_id = jsPsych.randomization.randomID(15);

// pick a random condition for the subject at the start of the experiment
var condition_assignment = jsPsych.randomization.sampleWithoutReplacement(['conditionA', 'conditionB', 'conditionC'], 1)[0];

// record the condition assignment in the jsPsych data
// this adds a property called 'subject' and a property called 'condition' to every trial
jsPsych.data.addProperties({
  subject: subject_id,
  condition: condition_assignment
});
```

### 给部分试次添加数据

我们可以通过试次的`data`参数向某个试次中添加数据。`data`参数是一个对象，对象中的每个键-值对都会添加到该试次存储的数据中。

```js
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'imgA.jpg',
  data: { image_type: 'A' }
}
```

如果使用了嵌套的时间线，这样声明的数据也会被保存。

```js
var block = {
  type: jsPsychImageKeyboardResponse,
  data: { image_type: 'A' },
  timeline: [
    {stimulus: 'imgA1.jpg'},
    {stimulus: 'imgA2.jpg'}
  ]
}
```

试次的数据对象也可以在`on_finish`中进行更新。我们可以覆盖数据中的属性值或添加新的属性。如果需要记录的数据与试次的进行情况有关，可以使用这种方式。

```js
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'imgA.jpg',
  on_finish: function(data){
    if(jsPsych.pluginAPI.compareKeys(data.response, 'j')){
      data.correct = true;
    } else {
      data.correct = false;
    }
  }
}
```

### 不记录某个试次的数据

有时候我们想要不记录某个试次的数据，此时我们可以将`record_data`参数设置为`false`。有时候，我们只想要记录被试反应的试次，这时候这个功能就很有用。比如，我们可以去掉注视点试次的数据。

```js
var trial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'imgA.jpg',
  record_data: false
}
```

## 汇总、操作jsPsych记录的数据

我们使用`jsPsych.data.get()`访问数据时，会返回一个数据集对象，包含了一系列汇总、操作数据的方法。完整的方法参见 [数据部分的文档](../reference/jspsych-data.md)。

下面是对数据集对象进行操作的一些示例。

所有image-keyboard-response插件产生的数据：
```js
var data = jsPsych.data.get().filter({trial_type: 'image-keyboard-response'});
```

所有categorize-image插件产生的数据中被试反应正确的那部分：
```js
var data = jsPsych.data.get().filter({trial_type: 'categorize-image', correct: true});
```

所有反应时在100 - 500ms范围之内的数据：
```js
var data = jsPsych.data.get().filterCustom(function(x){ return x.rt >= 100 && x.rt <=500 });
```

连续进行筛选，选取特定插件产生的反应时高于100ms的数据：
```js
var data = jsPsych.data.get().filter({trial_type: 'image-keyboard-response'}).filterCustom(function(x){ return x.rt > 100; });
```

获取最后n个试次产生的数据：
```js
var n = 3;
var data = jsPsych.data.get().last(n);
```

获取最后n个被试反应正确的试次的数据：
```js
var n = 3;
var data = jsPsych.data.get().filter({correct: true}).last(n);
```

获取前n个试次的数据：
```js
var n = 3;
var data = jsPsych.data.get().first(n);
```

对数据集中正确的试次进行计数：
```js
var count = jsPsych.data.get().filter({correct: true}).count();
```

从数据集中选取出反应时数据：
```js
var response_times = jsPsych.data.get().select('rt');
```

计算数据集中反应时数据的描述统计值：

```js
jsPsych.data.get().select('rt').mean();
jsPsych.data.get().select('rt').sum();
jsPsych.data.get().select('rt').min();
jsPsych.data.get().select('rt').max();
jsPsych.data.get().select('rt').variance();
jsPsych.data.get().select('rt').sd();
jsPsych.data.get().select('rt').median();
jsPsych.data.get().select('rt').count();
```

## 将数据保存为文件

这是把数据保存在运行实验的服务器上最简单的方式之一，我们可以通过PHP和JavaScript代码实现这一功能。这个方法可以将被试的数据保存为CSV文件并存储在服务器上。**只有把试验运行在一个装有PHP环境的服务器或本地服务器（如，[XAMPP](https://www.apachefriends.org/index.html)）时这个方法才会生效**。

我们用PHP将文件写入服务器：

```php
<?php
// get the data from the POST message
$post_data = json_decode(file_get_contents('php://input'), true);
$data = $post_data['filedata'];
// generate a unique ID for the file, e.g., session-6feu833950202 
$file = uniqid("session-");
// the directory "data" must be writable by the server
$name = "data/{$file}.csv"; 
// write the file to disk
file_put_contents($name, $data);
?>
```

`file_put_contents($filename, $data)`方法需要写入新文件的权限。解决这个的简单办法是在服务器上创建一个用于存放数据的文件夹，然后用chmod命令给所有用户往该路径写入的权限。在上面的示例中，使用了`data/`文件夹存储文件。

使用上面的PHP代码时，我们还需用在jsPsych的代码中向服务器发送`filename`和`filedata`信息。我们通过[AJAX](http://www.w3schools.com/xml/ajax_intro.asp)实现这一功能。

```javascript
function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filedata: data}));
}

// call the saveData function after the experiment is over
initJsPsych({
   on_finish: function(){ saveData(jsPsych.data.get().csv()); }
});
```

!!!danger "危险"
    上面的示例中的代码并不安全，应该在有相应防护措施的情况下才这样做。其不安全之处在于随便谁都可以使用`saveData()`函数往你的服务器上写入任意的数据。如果被猜到了PHP文件生成的文件名称或者是获取存放文件名的目录列表的访问权限，就可以随之在你的服务器上写入可执行文件并运行它们。

    一种修复的方法是把CSV文件存放在服务器上的web目录之外。此时，我们就需要把上面PHP代码中的路径从`/data`改为一个不能直接从web端访问的路径。切记，只有在有服务器上web路径以外路径的访问权限的时候才能这么做。
    
    我们也可以[配置服务器，禁止访问存储数据的路径](https://stackoverflow.com/q/5046100/3726673)。

    下面所说的使用MySQL是更安全的一种选择。

## 将数据存储在MySQL数据库中

一种存储jsPsych产生的数据的较为理想的办法是写入数据库。

数据库的选择多种多样，而MySQL是使用较多的一种[关系数据库](http://en.wikipedia.org/wiki/Relational_database)，它可以免费使用，且[安装](https://www.google.com/search?q=how+to+install+mysql)十分简单。下面的代码假定你的服务器上已经安装了MySQL且可以运行PHP代码。如果你是在本地机器上运行实验，则需要安装本地服务器环境，如[XAMPP](https://www.apachefriends.org/index.html)。

我们需要两个PHP脚本。第一个是数据库的配置文件，我们将其命名为`database_config.php`并保存在服务器上。在这个文件里，我们需要写入数据库的一些配置项。我们可能需要根据安装MySQL时的配置方式对下面代码中的一些内容进行修改。

```php
<?php
  $servername = "localhost";
  $port = 3306;
  $username = "username";
  $password = "password";
  $dbname = "database";
  $table = "tablename";
?>
```

第二个PHP脚本负责将数据写入数据库。该脚本会读取数据库，以确定数据表中有哪些列，然后将匹配这些列的数据写入数据库。这个特性是出于安全性的考虑。我们将这个文件命名为`write_data.php`并保存在服务器上。

```php
<?php

// this path should point to your configuration file.
include('database_config.php');

$data_array = json_decode(file_get_contents('php://input'), true);

try {
  $conn = new PDO("mysql:host=$servername;port=$port;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // First stage is to get all column names from the table and store
  // them in $col_names array.
  $stmt = $conn->prepare("SHOW COLUMNS FROM `$table`");
  $stmt->execute();
  $col_names = array();
  while($row = $stmt->fetchColumn()) {
    $col_names[] = $row;
  }
  // Second stage is to create prepared SQL statement using the column
  // names as a guide to what values might be in the JSON.
  // If a value is missing from a particular trial, then NULL is inserted
  $sql = "INSERT INTO $table VALUES(";
  for($i = 0; $i < count($col_names); $i++){
    $name = $col_names[$i];
    $sql .= ":$name";
    if($i != count($col_names)-1){
      $sql .= ", ";
    }
  }
  $sql .= ");";
  $insertstmt = $conn->prepare($sql);
  for($i=0; $i < count($data_array); $i++){
    for($j = 0; $j < count($col_names); $j++){
      $colname = $col_names[$j];
      if(!isset($data_array[$i][$colname])){
        $insertstmt->bindValue(":$colname", null, PDO::PARAM_NULL);
      } else {
        $insertstmt->bindValue(":$colname", $data_array[$i][$colname]);
      }
    }
    $insertstmt->execute();
  }
  echo '{"success": true}';
} catch(PDOException $e) {
  echo '{"success": false, "message": ' . $e->getMessage();
}
$conn = null;
?>
```

我们在JavaScript中使用AJAX发送数据。
```JavaScript
function saveData() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response.success);
    }
  };
  xhr.send(jsPsych.data.get().json());
}
```

很重要的一点是，`XMLHttpRequest`需要在实验关闭前完成。如果我们在实验的最后调用`saveData()`，而被试又在数据完成传输前关掉了窗口，数据就丢失了。为了防止这种事情的发生，我们应该使用`call-function`插件中的`async`参数，在数据完成传输后再让实验继续。

```javascript
var trial = {
  type: jsPsychCallFunction,
  async: true,
  func: function(done){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'write_data.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if(xhr.status == 200){
        var response = JSON.parse(xhr.responseText);
        console.log(response.success);
      }
      done(); // invoking done() causes experiment to progress to next trial.
    };
    xhr.send(jsPsych.data.get().json());
  }
}
```
