# free-sort plugin

这个插件的作用是在屏幕上呈现一张或多张图片，被试可以通过鼠标点击拖动这些图片，或在触屏设备上拖动图片。试次开始时，这些图片可以处以摆放区域内部或外部。被试必须把所有图片都拖动到摆放区域内部才能点击按钮以结束试次。被试的所有操作以及图片最终的位置都会被记录。当要求被试根据图片相似性摆放图片或者回忆图片空间位置时，可以使用当前的插件。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

参数 | 类型 | 默认值 | 描述 
----------|------|---------------|------------
stimuli | 数组 | *undefined* | 数组的每一个元素都是图片的路径。 
stim_height | 数值 | 100 | 图片高度的像素值。 
stim_width | 数值 | 100 | 图片宽度的像素值。 
scale_factor | 数值 | 1.5 | 图片移动时将图片放大的倍数（若为1，则不放大）。 
sort_area_height | 数值 | 800 | 摆放图片区域的高度。图片必须被放置在此区域。 
sort_area_width | 数值 | 800 | 摆放图片区域的宽度。图片必须被放置在此区域。 
sort_area_shape | 字符串 | "ellipse" | 摆放图片区域的形状。可以是`"ellipse"`（椭圆）或`"square"`（正方形）。 
prompt | 字符串 | null | 可以包含HTML元素。该参数的内容会在`stimulus`下面进行呈现，从而起到提示被试该做什么的作用（例如：该按哪个/些键）。 
prompt_location | 字符串 | "above" | 把`prompt`放置在摆放图片区域的上面（`above`）还是下面（`below`）。 
button_label | 字符串 | 'Continue' | 确认进入下一个试次的按钮文本。 
change_border_background_color | 布尔 | true | 如果为true，则摆放图片区域的边框颜色会在图片移入移出时发生改变；如果所有图片都被移入区域，背景颜色会发生改变。如果为false，则边框颜色一直为黑色，区域背景色会一直为白色。 
border_color_in |字符串 | '#a1d99b' | 如果`change_border_background_color`为true，摆放图片区域的边框颜色会在图片移入时变为当前参数指定的颜色；当所有图片都移入时，区域的背景颜色也会变为当前参数指定的颜色。 
border_color_out | 字符串 | '#fc9272' | 如果`change_border_background_color`为true，则当还有不处于摆放图片区域的图片时，区域边框为当前参数指定的颜色。 
border_width | 数值 | null | 摆放图片区域边框宽度的像素值。如果为`null`，则宽度等于`sort_area_height`的3%。 
counter_text_unfinished | 字符串 | You still need to place %n% item%s% inside the sort area. | 当还有不处于摆放图片区域的图片时呈现的文字。如果当前参数值中包括了`%n%`，则在实验中会被替换为还处于区域外的图片数。如果当前参数值中包括了`%s%`，则区域外部图片数大于1时，对应位置会自动加上"s"。 
counter_text_finished | 字符串 | All items placed. Feel free to reposition items if necessary. | 当所有图片都被移入摆放图片区域时代替`counter_text_unfinished`的文字。 
stim_starts_inside | 布尔 | false | 如果为false，则图片一开始会被放在摆放区域的左右两边；如果为true，则图片已开始会被随机放置在摆放区域的内部。 
column_spread_factor | 数值 | 1 | 当图片出现在摆放区域外部时，控制图片在水平方向上的分布。当前参数默认值为1；如果小于1，则会在水平方向上彼此距离更近；如果大于1，则会在水平方向上彼此距离更远。 

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值 
-----|------|------
init_locations | 数组 | 包含了图片起始位置的数组。数组中的每个元素都是一个对象，对应一张图片，并有`src`、`x`、`y`属性。`src`是图片的路径，而`x`和`y`是图片的位置。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 
moves | 数组 | 包含了被试所有移动操作的数组。数组中的每个元素都是一个对象，对应了一次移动操作，并有`src`、`x`、`y`属性。`src`是图片的路径，而`x`和`y`是图片移动后的位置。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 
final_locations | 数组 | 包含了图片最终位置的数组。数组中的每个元素都是一个对象，对应一张图片，并有`src`、`x`、`y`属性。`src`是图片的路径，而`x`和`y`是图片的位置。在后面使用`.json()`或`.csv()`方法保存数据时，该数组会以JSON形式存储起来。 
rt | 数值 | 被试完成摆放所用的毫秒数。 

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## 示例

???+ example "基本示例"
    === "Code"
        ```javascript
        var sort_trial = {
            type: jsPsychFreeSort,
            stimuli: sorting_stimuli,
            stim_width: 80,
            stim_height: 60,
            sort_area_width: 500,
            sort_area_height: 500,
            prompt: "<p>Click and drag the images below to sort them so that similar items are close together.</p>"
        };
        ```
    === "Demo"
        <div style="text-align:center;">
            <iframe src="../../demos/jspsych-free-sort-demo1.html" width="90%;" height="700px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-free-sort-demo1.html">在新标签页中打开</a>

