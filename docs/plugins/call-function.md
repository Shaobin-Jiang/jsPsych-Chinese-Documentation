# call-function

这个插件的作用是执行一个特定的函数，从而实现在实验中任意阶段运行其他代码的功能。

该函数不可以接受传入参数。如果确实需要传参，则需要用一个匿名函数套在该函数外面（详见下面的示例）。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
func | 函数 | *undefined* | 调用的函数。 
async | 布尔 | `false` | 如果`func`是一个异步函数则为true，此时`func`接受的第一个参数是在异步操作完成后执行的回调函数。你可以给回调函数传参。详见下面的示例。 

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
value | 任意 | 调用函数的返回值。 

## 示例

???+ example "调用一个简单的函数"
    === "Code"
        ```javascript
		var myfunc = function() {
			return 'you called?';
		}

		var trial = {
			type: jsPsychCallFunction,
			func: myfunc
		}
		```

	=== "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-call-function-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-call-function-demo1.html">在新标签页中打开</a>
    

???+ example "使用匿名函数传参"
    === "Code"
        ```javascript
		var myfunc = function(data){
			// data contains all the experiment data so far,
			// so this function could implement code to write
			// the data to a database.
			console.log(data.values())
		}

		var trial = {
			type: jsPsychCallFunction,
			func: function(){ myfunc(jsPsych.data.get()) }
		}
		```

	=== "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-call-function-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-call-function-demo2.html">在新标签页中打开</a>

???+ example "异步函数调用：等待将数据保存到服务器"
	=== "Code"
	这段代码没有demo，因为需要服务器才能运行。
		```javascript
		var trial = {
			type: jsPsychCallFunction,
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

???+ example "异步函数调用：等待将数据保存到服务器：模拟等待事件的完成"
	=== "Code"
        ```javascript
		var trial = {
			type: jsPsychCallFunction,
			async: true,
			func: function(done){
				// generate a delay between 1500 and 3000 milliseconds to simulate  
				// waiting for an event to finish after an unknown duration,
				// then move on with the experiment
				var rand_delay = (Math.floor(Math.random() * (3000 - 1500 + 1) + 1500));
				jsPsych.pluginAPI.setTimeout(function() {
					// end the trial and save the delay duration to the data
					done(rand_delay.toString()+"ms");
				}, rand_delay)
			}
		};
  		```
	=== "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-call-function-demo3.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-call-function-demo3.html">在新标签页中打开</a>


