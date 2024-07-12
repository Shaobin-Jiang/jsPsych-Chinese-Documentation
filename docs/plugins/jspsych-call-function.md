# jspsych-call-function

这个插件的作用是执行一个特定的函数，从而实现在实验中任意阶段运行其他代码的功能。

该函数不可以接受传入参数。如果确实需要传参，则需要用一个匿名函数套在该函数外面（详见下面的示例）。

## 参数

除了[适用于所有插件的参数](/overview/plugins.html#parameters-available-in-all-plugins)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
func | 函数 | *undefined* | 调用的函数。 
async | 布尔 | `false` | 如果`func`是一个异步函数则为true，此时`func`接受的第一个参数是在异步操作完成后执行的回调函数。你可以给回调函数传参。详见下面的示例。 


## 数据

除了[所有插件默认都会收集的数据](/overview/plugins.html#data-collected-by-all-plugins)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
value | 任意 | 调用函数的返回值。 

## 示例

#### 调用一个简单的函数

```javascript

var myfunc = function() {
	return 'you called?';
}

var trial = {
	type: 'call-function',
	func: myfunc
}
```

#### 使用匿名函数传参

```javascript

var myfunc = function(data){
	// data contains all the experiment data so far,
	// so this function could implement code to write
	// the data to a database.
}

var trial = {
	type: 'call-function',
	func: function(){ myfunc(jsPsych.data.get())}
}
```

#### 异步函数调用

```javascript
var trial = {
	type: 'call-function',
	async: true,
	func: function(done){
		// can perform async operations here like
		// creating an XMLHttpRequest to communicate
		// with a server
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response_data = xhttp.responseText;
				// line below is what causes jsPsych to 
				// continue to next trial. response_data
				// will be stored in jsPsych data object.
				done(response_data);
			}
		};
		xhttp.open("GET", "path_to_server_script.php", true);
		xhttp.send();
	}
}
```