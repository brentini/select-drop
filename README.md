# Select Drop

Simple jQuery plugin to convert select to dropdown. Nothing particularly fancy, if you're looking for something taking care of all your input elements there are other plugins out there that will be more appropriate.

[See the demo](http://romainberger.github.io/select-drop/)

## Basic Usage

In the head of your html add the Select Drop stylesheet. A basic style is applied to the dropdown, it will be easy to customize it to fit your needs.

```
  <link rel="stylesheet" href="css/select-drop.css">
```

At the bottom of your document link both jQuery and Select Drop:

```
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendors/jquery-2.0.0.min.js"><\/script>')</script>
  <script src="js/select-drop.min.js"></script>
```

Then attach the plugin to the element:

```
  <form>
    <select>
        <option>Hello</option>
        <option>Wassup</option>
    </select>
  </form>

  <script>
      $(document).ready(function() {
          $('select').selectDrop()
      })
  </script>
```

Use the options like you would do with any jQuery plugin:

```
  $('select').selectDrop({
      eventType: 'click'
    , autoSubmit: true
  })
```

## Options

Here is the list of options available:

* `speed`
* `eventType`: event used to show the option list - default to click
* `onChange`: callback function called after the selected value is changed
* `autoSubmit`: If set to true, the form will be submitted when the selected value is changed - default to false
* `effect`: 'slide' or 'show' determines the effect to show or hide the list - default to slide

## Browser Support

Select Drop has been tested on Google Chrome, Safari, Firefox and IE7+.
