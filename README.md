# Select Drop

  Simple jQuery plugin to convert select to dropdown.

## Basic Usage

  In the head of your html add the Select Drop stylesheet. A basic style is applied to the dropdown, it will be easy to customized to fit your needs.

  ```
    <link rel="stylesheet" href="css/select-drop.css">
  ```

  At the bottom of your document link both jQuery and Select Drop:

  ```
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendors/jquery-1.9.1.min.js"><\/script>')</script>
    <script src="js/select-drop.min.js"></script>
  ```

  Then attach the plugin to the element:

  ```
    <select>
        <option>Hello</option>
        <option>Wassup</option>
    </select>

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
    });
  ```

## Options

  Here is the list of options available:

    * `speed`:
    * `eventType`: event used to show the option list - default to click
    * `onChange`: callback function called after the selected value is changed
    * `autoSubmit`: If set to true, the form will be submitted when the selected value is changed - default to false
