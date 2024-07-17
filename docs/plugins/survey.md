# survey

该插件基于[**SurveyJS**](https://surveyjs.io/form-library/documentation/overview)，可以在一页或多页上呈现调查问卷。你可以在同一页面上呈现不同类型的题目，也可以制作多页的调查问卷并允许被试前后翻页的同时不丢失作答数据。SurveyJS内置了大量的题目类型、作答校验、根据条件呈现选项、特殊的选项（“无”、“全选”、“其他”）以及其他一些在构建复杂的调查的时候很有用的特性，详见[使用jsPsych编制调查](../overview/building-surveys.md)。

SurveyJS允许我们通过JavaScript/JSON对象、JavaScript函数或是共同使用两者编制问卷。jsPsych的`survey`插件提供了相应的参数。由于本插件基于SurveyJS，我们也可以方便地使用SurveyJs所有的特性，也可以将SurveyJS提供的用例直接复制到插件的`survey_json`参数（使用JSON对象）或`survey_function`参数（使用JavaScript代码）。[使用jsPsych编制调查](../overview/building-surveys.md)那一部分则更详细地讲解了如何使用这一插件。

如果想要最全面地了解如何配置调查以及其他特性，请参见[SurveyJS文档](https://surveyjs.io/form-library/documentation/overview)和[示例](https://surveyjs.io/form-library/examples/overview)。

!!! warning "局限"
    jsPsych的`survey`插件和jsPsych以及SurveyJs一些特性不兼容。具体来说：

    - **不完全兼容jsPsych的[时间线变量](../overview/timeline.md#_5)。**这是因为时间线变量数组必须把每个试次的`survey_json`都保存起来，而不是只保存试次间发生变化的嵌套在`survey_json`里面的那一部分。我们在[这里](../overview/building-surveys.md#_4)提供了一些替代的方法。
    - **不支持SurveyJS的[完成页面](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#complete-page)。**在原生的SurveyJS中，这个页面在被试点击提交按钮后出现。在jsPsych中，你需要再编写一个jsPsych试次来实现同样的功能。
    - **不支持SurveyJS题目的`correctAnswer`属性，**该属性用于自动计分。SurveyJS并不会把这个值或者是被试作答的得分存储在数据里，而是仅用于在完成页面上呈现得分。鉴于jsPsych不支持“完成页面”，`correctAnswer`属性也没法正常发挥作用。

## 参数

除了[适用于所有插件的参数](../overview/plugins.md#parameters-available-in-all-plugins#_3)，当前插件还接受以下参数。我们必须对默认值为 **undefined** 的参数进行赋值，而对于其他参数，如果不需要则不用进行赋值。

### Survey的参数

参数 | 类型 | 默认值 | 描述
----------|------|---------------|------------
survey_json | 对象 | `{}` | SurveyJs格式的JavaScript对象，用以定义调查问卷内容（我们称之为'JSON'是为了和SurveyJS文档保持一致，但这实际上是一个对象而不是字符串）。如果和`survey_function`共同使用，则会先使用这个对象构建调查问卷，然后这个参数会被传入`survey_function`。详见[SurveyJS JSON文档](https://surveyjs.io/form-library/documentation/design-survey/create-a-simple-survey#define-a-static-survey-model-in-json)。
survey_function | 函数 | null | 接收SurveyJs JSON的函数。如果没有设置`survey_json`，则函数的传入参数为空的调查问卷模型，此时我们需要向其中添加页面/元素。如果提供了`survey_json`对象，则可以在此对象基础上进行编制。详见[SurveyJS JavaScript文档](https://surveyjs.io/form-library/documentation/design-survey/create-a-simple-survey#create-or-change-a-survey-model-dynamically)。
validation_function | 函数 | null | 校验被试作答的函数。SurveyJS的`onValidateQuestion`事件触发时会调用此函数。（注意：我们也可以在`survey_function`中添加这个函数，单独设置这样一个参数只是为了更方便一些）。

### 问题类型和参数

调查问卷中必须包含至少一个SurveyJS“元素”，可以通过JSON或函数的方式添加。SurveyJs的元素主要由不同类型的问题组成，但也包含HTML、图片、视频等内容。[使用jsPsych编制调查](../overview/building-surveys.md)这一部分详细介绍了如何定义调查问卷的元素，你也可以在当前页面的[这一部分](#_5)找到一些具体的示例。

下面列出了SurveyJS中的题目类型，以及SurveyJS中相应内容和示例的链接。

#### boolean

是/否（或其他二项选择）的单选题。与"radiogroup"（单选）的不同之处在于它提供了除标砖的两个单选框以外的多种格式的选项（左/右滑动按钮，是/否选项框）。

- [示例](https://surveyjs.io/form-library/examples/yes-no-question/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/boolean-question-model)

#### checkbox

允许被试选择一至多项。你还可以设置一些特殊选项，如“全选”、“全不选”、“其他”（选中时会出现一个输入框）。

- [示例](https://surveyjs.io/form-library/examples/create-checkboxes-question-in-javascript/jquery)
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/checkbox-question-model)

#### comment

输入长文本，类似于文字输入题型，但区别在于可以进行多行输入，还可以允许修改输入框大小、限制文字数量。

- [示例](https://surveyjs.io/form-library/examples/add-open-ended-question-to-a-form/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/comment-field-model)

#### dropdown

从下拉菜单中选择一个选项。

- [示例](https://surveyjs.io/form-library/examples/create-dropdown-menu-in-javascript/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/dropdown-menu-model)

#### tagbox

在下拉菜单中多选，类似于dropdown，区别是可以多选。

- [示例](https://surveyjs.io/form-library/examples/how-to-create-multiselect-tag-box/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/dropdown-tag-box-model)

#### expression

只读的元素，作用是根据表达式计算值。该元素可以用于根据被试作答或是预设的变量计算值然后呈现在页面上。例如，如果要求被试估算一天中各种活动的占比，就可以设置一道题让被试进行输入，然后在旁边添加一个expression元素实时显示总的百分比（确保被试的输入综合不超过100%）。

- [示例](https://surveyjs.io/form-library/examples/expression-question-for-dynamic-form-calculations/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/expression-model)

#### file

上传一个或多个文件（图片、文档等）。允许拖动到此处/弹出文件选择对话框两种选择。我们可以将文件上传到服务器也可以直接以base64格式直接存在数据里。

!!! note "注意"
    使用这一元素时，需要想好怎么处理文件。一种选择是直接以base64格式保存文件 (`storeDataAsText: true`)，但这样会显著增大数据大小，所以我们只应该在上传的文件较小时使用这一选项。另一个选项是将被试上床的文件传到服务器上，此时我们可以在jsPsych的`survey_function`中使用`onUploadFiles`事件监听。关于这些选项，详见[上传文件](https://surveyjs.io/form-library/examples/file-upload/jquery#content-docs)部分以及这一[示例](https://surveyjs.io/form-library/examples/file-upload/jquery#content-code)中的`index.js`文件。

- [示例](https://surveyjs.io/form-library/examples/file-upload/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/file-model)

#### html

多数SurveyJS题目不支持在内容中呈现HTMl内容。html元素允许我们向调查问卷中添加自定义的HTML内容，从而实现添加图片、超链接等功能。

- [示例](https://surveyjs.io/form-library/examples/add-html-form-field/jquery#) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/add-custom-html-to-survey)

#### image

添加图片或视频。

- [示例](https://surveyjs.io/form-library/examples/add-image-and-video-to-survey/jquery#) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/add-image-to-survey)

#### imagepicker

呈现图片/视频并允许被试选择其中的一个或多个。

- [示例](https://surveyjs.io/form-library/examples/image-picker-question/jquery)
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/image-picker-question-model)

#### matrix

创建多个共用相同选项的单选题，以表格形式呈现。通常用于李克特量表或是类似的题型。

- [示例](https://surveyjs.io/form-library/examples/single-selection-matrix-table-question/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/matrix-table-question-model)

#### matrixdropdown

以表格形式呈现一系列问题，每个格子里可以有不同的选项类型。虽然名字里有"dropdown"，但你不只可以设置下拉菜单，还可以设置复选框、单选框、输入框等。

- [示例](https://surveyjs.io/form-library/examples/multi-select-matrix-question/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/matrix-table-with-dropdown-list)

#### multipletext

在一道题里呈现多个[text题型](#text)，方便我们将相关联的多个文本框组织在一起（例如，分三个输入框用来输入全名）。本题目类型中的每个条目定义了一个text题型，支持text题型的输入类型 (电子邮件、日期等)、内置的格式化和校验功能。在保存的数据中，会有单独一个属性对应这道题的数据（name属性；如果没指定则是自动生成的`questionN`），具体的值是一个由每个输入框条目共同组成的键值对 (`"item1Name": "item1Response", "item2Name": "item2Response"`, 等等)。

- [示例](https://surveyjs.io/form-library/examples/multiple-text-box-question/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/multiple-text-entry-question-model)

#### panel

将相关联的问题组织在一起，有助于页面的视觉组织，可以帮助被试理解一系列题目的目的。这一题型的问题的样式是上面呈现一个标题/一段描述，下面是一个文本框，呈现相应的元素/题目。题目可以一开始就完全展开（呈现所有题目），也可以折叠起来（隐藏所有题目），被试可以通过点击标题切换这一状态。

- [示例](https://surveyjs.io/form-library/examples/set-properties-on-multiple-questions-using-panel/jquery) 
- [示例](https://surveyjs.io/form-library/documentation/api-reference/panel-model)

#### paneldynamic

根据被试在其他题目中的作答重复呈现一组题目。一般用于被试给出的作答数量未知、你又希望对每一个作答都问同样的问题的情境。比如说，可以使用这一题型来设置一系列关于被试的子女、工作历史、爱好等的一系列问题。这一题型允许被试添加/删除“子面板” (subpanel，即自己的作答以及相应的题目)。

- [示例](https://surveyjs.io/form-library/examples/duplicate-group-of-fields-in-form/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/dynamic-panel-model)

#### radiogroup

单选题。你可以设置特殊的选项，比如说“其他”，这样在被试选择时就会弹出一个输入框。

- [示例](https://surveyjs.io/form-library/examples/single-select-radio-button-group/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/radio-button-question-model)

#### rating

特殊的单选题，允许被试对某个条目进行评级。可以呈现一系列数值、符号（星星、笑脸）或是其他文本标记。选项可以水平排列、以下拉菜单形式呈现，也可以直接设置为"auto"（页面宽度足够就水平排列，否则以下拉菜单形式呈现；详见[Rating UI page](https://surveyjs.io/form-library/examples/ui-adaptation-modes-for-rating-scale/jquery)）。

- [示例](https://surveyjs.io/form-library/examples/rating-scale/jquery) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/rating-scale-question-model)

#### ranking

根据偏好、重要性或其他标准对一系列选项进行排序，或是根据相对的权重给各个选项赋值。选项竖直排列，被试可以拖动进行排序。这一题型可以和SurveyJS的“带到下一道题目”的特性配合使用。例如，可以将被试前面多选题的作答结果拿过来进行排序（参见jsPsych survey包里的`reference_previous_answers.html`）。我们还可以把选择-排序的流程放在一道题里，见[选择条目并排序](https://surveyjs.io/form-library/examples/select-items-to-rank/jquery)，此时被试可以直接通过拖拽某个条目进行选中，并同时进行排序。

- [示例](https://surveyjs.io/form-library/documentation/api-reference/ranking-question-model) 
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/ranking-question-model)

#### signaturepad

通过鼠标或手指（手写板或触屏设备上）添加数字签名。我们可以设置颜色和书写区域大小，可以将签名以PNG / JPEG / SVG格式保存为base64，也可以直接保存到服务器。关于将签名保存为图片文件见[SurveyJS demo和文档](https://surveyjs.io/form-library/examples/upload-signature-pad-data-to-server/jquery#content-code)，关于如何处理文件详见[file题型](#file)。

- [示例](https://surveyjs.io/form-library/examples/signature-pad-widget-javascript/jquery)
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/signature-pad-model)

#### text 

除了基本的文本输入，还可以输入：**颜色、日期、日期时间、电子邮件、月份、数值、密码、滑动条、电话号码、时间、url、星期**。设置具体的输入类型会修改(1) 输入元素的格式，(2) 被试可以输入的内容，(3) 对输入内容自动校验。

- [文本输入示例](https://surveyjs.io/form-library/examples/text-entry-question/jquery) - includes email, password, and URL input types
- [日期/时间输入示例](https://surveyjs.io/form-library/examples/datetime-entry-question/jquery)
- [数值输入示例](https://surveyjs.io/form-library/examples/numeric-entry-question/jquery) - includes range input (slider) and telephone number input types
- [颜色输入示例](https://surveyjs.io/form-library/examples/color-input-question/jquery)
- [API文档](https://surveyjs.io/form-library/documentation/api-reference/text-entry-question-model)

## 数据

除了[所有插件默认都会收集的数据](../overview/plugins.md#_4)，当前插件还会记录以下数据。

名称 | 类型 | 值
-----|------|------
response | 对象 | 包含了每个问题作答情况的对象。对于每一个问题，该对象都会添加一个属性，如果设定了`name`属性，则属性名称和该问题的name属性一致；如果没有设置，则自动命名，第一个未命名的问题命名为`question1`，第二个命名为`question2`，以此类推。对象的type属性取决于问题的类型。后面使用`.json()`或`.csv()`方法保存数据时，会以JSON形式存储起来。 |
rt | 数值 | 被试反应时 (单位：毫秒)。计时从问题呈现开始，到被试提交结束。 |

## 模拟模式

该插件暂时不支持[模拟模式](../overview/simulation.md)。

## CSS

这个插件会额外用到一个`survey.css`文件。我们可以这样引入这个文件：

```html
<link rel="stylesheet" href="https://unpkg.com/@jspsych/plugin-survey@latest/css/survey.css">
```

如果你使用了[webpack](https://webpack.js.org/)这样的打包工具，可以像下面这样将其直接在JavaScript中进行引入（取决于打包工具的配置）：

```javascript
import '@jspsych/plugin-survey/css/survey.css'
```

## 示例

???+ example "在同一页面上呈现单选题和多选题"
    === "Code"

        ```javascript
        const trial = {
          type: jsPsychSurvey,
          survey_json: {
            showQuestionNumbers: false,
            elements:
              [
                {
                  type: 'radiogroup',
                  title: "Which of the following do you like the most?", 
                  name: 'vegetablesLike', 
                  choices: ['Tomato', 'Cucumber', 'Eggplant', 'Corn', 'Peas', 'Broccoli']
                }, 
                {
                  type: 'checkbox',
                  title: "Which of the following do you like?", 
                  name: 'fruitLike', 
                  description: "You can select as many as you want.",
                  choices: ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Kiwi', 'Mango'], 
                  showOtherItem: true,
                  showSelectAllItem: true,
                  showNoneItem: true,
                  required: true,
                }
            ]
          }
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo1.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo1.html">Open demo in new tab</a>

??? example "在多页上呈现文字输入、单选题，以及更多自定义"
    === "Code"

        ```javascript
        const trial = {
          type: jsPsychSurvey,
          survey_json: {
            showQuestionNumbers: false,
            title: 'My questionnaire',
            completeText: 'Done!',
            pageNextText: 'Continue',
            pagePrevText: 'Previous',
            pages: [
              {
                name: 'page1',
                elements: [
                    {
                      type: 'text',
                      title: 'Where were you born?', 
                      placeholder: 'City, State/Region, Country',
                      name: 'birthplace', 
                      size: 30,
                      isRequired: true,
                    }, 
                    {
                      type: 'text',
                      title: 'How old are you?', 
                      name: 'age', 
                      isRequired: false,
                      inputType: 'number',
                      min: 0,
                      max: 100,
                      defaultValue: 0
                    }
                  ]
              },
              {
                name: 'page2',
                elements: [
                  {
                    type: 'radiogroup',
                    title: "What's your favorite color?", 
                    choices: ['Blue','Yellow','Pink','Teal','Orange','Lime green'],
                    showNoneItem: true,
                    showOtherItem: true,
                    colCount: 0,
                    name: 'FavColor',
                  }, 
                  {
                    type: 'checkbox',
                    title: 'Which of these animals do you like? Select all that apply.', 
                    choices: ['Lion','Squirrel','Badger','Whale', 'Turtle'],
                    choicesOrder: 'random',
                    colCount: 0,
                    name: 'FavAnimals', 
                  }
                ]
              }
            ]
          }
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo2.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo2.html">Open demo in new tab</a>

??? example "使用rating和matrix题型编制里克特量表"
    当前示例使用多种不同选项呈现量表（按钮、星星、笑脸），并用表格形式在一个量表中呈现多个题目。
    **注意:** 内容需要足够的页面宽度，最好在新的标签页中呈现。
    === "Code"

        ```javascript
        const trial = {
          type: jsPsychSurvey,
          survey_json: {
            showQuestionNumbers: false,
            title: 'Likert scale examples',
            pages: [
              {
                elements: [
                  {
                    type: 'rating',
                    name: 'like-vegetables',
                    title: 'I like to eat vegetables.',
                    description: 'Button rating scale with min/max descriptions',
                    minRateDescription: 'Strongly Disagree',
                    maxRateDescription: 'Strongly Agree',
                    displayMode: 'buttons',
                    rateValues: [1,2,3,4,5]
                  }, 
                  {
                    type: 'rating',
                    name: 'like-cake',
                    title: 'I like to eat cake.',
                    description: 'Star rating scale with min/max descriptions',
                    minRateDescription: 'Strongly Disagree',
                    maxRateDescription: 'Strongly Agree',
                    rateType: 'stars',
                    rateCount: 10,
                    rateMax: 10,
                  },
                  {
                    type: 'rating',
                    name: 'like-cooking',
                    title: 'How much do you enjoy cooking?',
                    description: 'Smiley rating scale without min/max descriptions',
                    rateType: 'smileys',
                    rateCount: 10,
                    rateMax: 10,
                    scaleColorMode: 'colored',
                  }
                ]
              }, {
                elements: [
                  {
                    type: 'matrix',
                    name: 'like-food-matrix',
                    title: 'Matrix question for rating mutliple statements on the same scale.',
                    alternateRows: true,
                    isAllRowRequired: true,
                    rows: [
                      {text: 'I like to eat vegetables.', value: 'VeggiesTable'},
                      {text: 'I like to eat fruit.', value: 'FruitTable'},
                      {text: 'I like to eat cake.', value: 'CakeTable'},
                      {text: 'I like to cook.', value: 'CookTable'},
                    ],
                    columns: [{
                      "value": 5,
                      "text": "Strongly agree"
                    }, {
                      "value": 4,
                      "text": "Agree"
                    }, {
                      "value": 3,
                      "text": "Neutral"
                    }, {
                      "value": 2,
                      "text": "Disagree"
                    }, {
                      "value": 1,
                      "text": "Strongly disagree"
                    }]
                  }
                ]
              }
            ]
          }
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo3.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo3.html">Open demo in new tab</a>

??? example "根据被试作答控制题目是否可见"
    当前示例的功能是根据被试作答控制题目是否可见，以及控制浏览页面按钮是否可见、自动跳转到下一页。
    === "Code"

        ```javascript
        const survey_function = (survey) => {
          // If it's the question page, then hide the buttons and move on automatically.
          // If it's the feedback page, then show the navigation buttons.
          function updateNavButtons(sender, options) {
            if (options.newCurrentPage.getPropertyValue("name") === "feedback") {
              survey.showNavigationButtons = "bottom";
            } else {
              survey.showNavigationButtons = "none";
            }
          }
          survey.onCurrentPageChanging.add(updateNavButtons);
        }

        const trial = {
          type: jsPsychSurvey,
          survey_json: {
            showQuestionNumbers: false,
            title: 'Conditional question visibility.',
            showNavigationButtons: "none",
            goNextPageAutomatic: true,
            allowCompleteSurveyAutomatic: true,
            pages: [{
              name: 'question',
              elements: [
                {
                  type: 'radiogroup',
                  title: 'During the experiment, are you allowed to write things down on paper to help you?',
                  choices: ["Yes", "No"],
                  name: "WriteOK",
                  isRequired: true
                }
              ],
            }, {
              name: 'feedback',
              elements: [
                {
                  type: 'html',
                  name: 'incorrect',
                  visibleIf: '{WriteOK} = "Yes"',
                  html: '<h4>That response was incorrect.</h4><p>Please return to the previous page and try again.</p>'
                },
                {
                  type: 'html',
                  name: 'correct',
                  visibleIf: '{WriteOK} == "No"',
                  html: '<h4>Congratulations!</h4>'
                }
              ]
            }]
          },
          survey_function: survey_function
        };
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo4.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo4.html">Open demo in new tab</a>

??? example "使用不同变量重复调查问卷试次"
    survey插件不适用于jsPsych的时间线变量特性，所以替代方式是通过循环对其进行重复。当向survey试次中添加数据时，应该通过`data`参数在试次水平进行添加（而不是在问题对象中添加），即使这个数据只和一道题目有关系。
    === "Code"

        ```javascript
        // values that change across survey trials - each object represents a single trial
        const question_variables = [
          {
            'fruit': 'apples',
            'Q1_prompt': 'Do you like apples?', 
            'Q1_type': 'regular',
            'Q2_word': 'like'
          },
          {
            'fruit': 'pears',
            'Q1_prompt': 'Do you like pears?', 
            'Q1_type': 'regular',
            'Q2_word': 'like'
          },
          {
            'fruit': 'bananas',
            'Q1_prompt': 'Do you NOT like bananas?', 
            'Q1_type': 'reverse',
            'Q2_word': 'hate'
          },
        ];

        // create an array to store all of our survey trials so that we can easily randomize their order
        survey_trials = [];

        // construct the survey trials dynamically using an array of question-specific information
        for (let i=0; i<question_variables.length; i++) {

          // set up the survey JSON for this trial
          // any question-specific variables come from the appropriate object in the question_variables array
          let survey_json = {
            showQuestionNumbers: false,
            title: 'Dynamically constructing survey trials.',
            completeText: 'Next >>',
            elements: [
              {
                type: 'radiogroup',
                title: question_variables[i].Q1_prompt,
                choices: ['Yes', 'No'],
                name: 'Q1'
              },
              {
                type: 'text',
                title: 'What do you '+question_variables[i].Q2_word+' most about '+question_variables[i].fruit+'?',
                name: 'Q2'
              }
            ]
          };
          
          // set up a survey trial object using the JSON we've just created for this question, 
          // and add the trial object to the survey trials array
          survey_trials.push({
            type: jsPsychSurvey,
            survey_json: survey_json,
            data: {
              'Q1_prompt': question_variables[i].Q1_prompt,
              'Q1_type': question_variables[i].Q1_type,
              'Q2_word': question_variables[i].Q2_word,
              'fruit': question_variables[i].fruit                                                        
            }  
          });

        }

        const timeline = jsPsych.randomization.shuffle(survey_trials);
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo5.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo5.html">Open demo in new tab</a>


??? example "添加图片、音频、HMTL"
    当前示例展示了如何添加HTML内容、图片、音频并通过CSS进行自定义、对作答校验。
    === "Code"

        ```css
        /* center the audio player and all image question types in the survey */
        div.sd-question--image, div.sd-question[data-name="audio-player"] {
          text-align: center;
        }
        /* use 'data-name' to select any specific question by name */
        div[data-name="audio-response"] {
          text-align: center;
          margin-top: 30px;
        }
        ```

        ```javascript
        // Embed HTML, images, videos and audio into the survey
        const image_video_html_trial_info = {
          pages: [{
            elements: [{
              type: "panel",
              name: "html-img-panel",
              description: "This panel contains an HTML element and an image element.",
              elements: [{
                type: "html",
                name: "html",
                html: "<div style='text-align: center; align-items: center; align-content: center; justify-content: center;'><p style='text-align: center; color: darkgreen; font-size: 2em;'>This demo shows how you can add <em>HTML</em>, <strong>images</strong>, and <sub>video</sub> to your jsPsych survey trial.</p></div>"
              }, {
                type: "image",
                name: "monkey",
                imageLink: "img/monkey.png",
                altText: "Monkey",
                imageWidth: 300
              }]
            }, {
              type: "panel",
              name: "video-panel",
              description: "This panel contains a fun fish video.",
              elements: [{
                type: "image",
                name: "jspsych-tutorial",
                imageLink: "video/fish.mp4",
                imageWidth: 700,
                imageHeight: 350
              }],
            }]
          }],
          widthMode: "static",
          width: 900,
          completeText: 'Next'
        };

        const image_video_html_trial = {
          type: jsPsychSurvey,
          survey_json: image_video_html_trial_info
        };

        // Using images as response options
        const image_choice_trial_info = {
          elements: [{
            type: "imagepicker",
            name: "animals",
            title: "Which animals would you like to see in real life?",
            description: "Please select all that apply.",
            choices: [{
              value: "lion",
              imageLink: "img/lion.png",
              text: "Lion"
            }, {
              value: "monkey",
              imageLink: "img/monkey.png",
              text: "Monkey"
            }, {
              value: "elephant",
              imageLink: "img/elephant.png",
              text: "Elephant"
            }],
            showLabel: true,
            multiSelect: true
          }],
          showQuestionNumbers: "off",
          completeText: 'Next',
        };

        const image_choice_trial = {
          type: jsPsychSurvey,
          survey_json: image_choice_trial_info
        };

        // Add sound to an HTML element
        // This also demonstrates response validation
        const sound_trial_info = {
          elements: [{
            type: "html",
            name: "audio-player",
            html: "<audio controls><source src='sound/speech_red.mp3' type='audio/mp3'></audio>"
          },
          {
            type: "text",
            name: "audio-response",
            title: "Please play the sound above and then type the word that you heard in the box below.",
            description: "Try getting it wrong to see the response validation.",
            required: true,
            validators: [{
              type: "regex",
              text: "Oops, that's not correct. Try again!",
              regex: "[rR]{1}[eE]{1}[dD]{1}"
            }],
          }],
          completeText: "Check my response",
          showQuestionNumbers: "off"
        };

        const sound_trial = {
          type: jsPsychSurvey,
          survey_json: sound_trial_info
        }

        const timeline = [image_video_html_trial, image_choice_trial, sound_trial];
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo6.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo6.html">Open demo in new tab</a>


??? example "自动对文本输入格式化"
    我们可以为文本输入题目添加自动的格式化。详见SurveyJS文档。
    === "Code"

        ```javascript
        const timeline = [];
        
        const text_masking_json = {
          elements: [
            {
              type: "html",
              name: "intro",
              html: "<h3>Input masking examples</h3><p>You can use input masking with text questions to add automatic formatting to the participant's answer. The mask types are: currency, decimal, pattern, and datetime. These masks will also restrict the types of characters that can be entered, e.g. only numbers or letters."
            },
            {
              type: "text",
              name: "currency",
              title: "Currency:",
              description: "This currency mask adds a prefix/suffix to the number to indicate the currency. Enter some numbers to see the result.",
              maskType: "currency",
              maskSettings: {
                prefix: "$",
                suffix: " USD"
              }
            },
            {
              type: "text",
              name: "decimal",
              title: "Decimal:",
              description: "This numeric mask will specify the number of decimals allowed. You can enter numbers with up to three decimals (precision: 3).",
              maskType: "numeric",
              maskSettings: {
                precision: 3
              }
            },
            {
              type: "text",
              name: "phone",
              title: "Phone:",
              description: "This pattern mask will format the numbers as a phone number.",
              maskType: "pattern",
              maskSettings: {
                pattern: "+9 (999)-999-9999"
              }
            },
            {
              type: "text",
              name: "creditcard",
              title: "Credit card number:",
              description: "This pattern mask will format the numbers as a credit card number.",
              maskType: "pattern",
              maskSettings: {
                pattern: "9999 9999 9999 9999"
              }
            },
            {
              type: "text",
              name: "licenseplate",
              title: "License plate number:",
              description: "A pattern mask can also be used with letters. Enter a license plate number in the format ABC-1234.",
              maskType: "pattern",
              maskSettings: {
                pattern: "aaa-9999"
              }
            }
          ],
          showQuestionNumbers: false
        };

        timeline.push({
          type: jsPsychSurvey,
          survey_json: text_masking_json
        });
        ```

    === "Demo"
        <div style="text-align:center;">
          <iframe src="../../demos/jspsych-survey-demo7.html" width="90%;" height="500px;" frameBorder="0"></iframe>
        </div>

    <a target="_blank" rel="noopener noreferrer" href="../../demos/jspsych-survey-demo7.html">Open demo in new tab</a>
