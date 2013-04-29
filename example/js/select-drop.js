/**
 * Select Drop
 * Simple jQuery plugin to convert select to dropdown
 *
 * https://github.com/romainberger/select-drop
 * @version 0.3
 * @author: Romain Berger <romain@romainberger.com>
 *
 * Basic Usage:
 *  $('select').selectDrop({
 *    speed: 500,                // speed of the list opening (default to 300)
 *    label: 'Option: ',         // label added before the first value (optionnal)
 *    onChange: function() {},   // callback function when the value is changed
 *    autoSubmit: true           // autosubmit the form on change (default to false)
 *  })
 * For more see the documentation at:
 * https://github.com/romainberger/select-drop
 *
 */

!function($) {

  'use strict'

  var SelectDrop = function(element, options) {
    this.element       = $(element)
    this.options       = options
    this.parent        = this.element.parent()
    this.dropDown      = $('<div>')
    this.activeValue   = $('<span>')
    this.isListVisible = false

    this.init()
  }

  SelectDrop.prototype = {

    /**
     * Creates the dropdown element
     * and hide the select
     * Attacht the event to the dropdown
     */
    init: function() {
      var self           = this
        , list           = $('<ul>')
        , first          = true
        , selectedOption = false
        , options        = self.element.find('option')

      // try to find the selected value
      options.each(function() {
        if ($(this).attr('selected') === 'selected') {
          selectedOption = $(this)
        }
      })

      // create the elements
      options.each(function() {
        var li = $('<li>').attr('id', self.element.attr('name')+'-'+$(this).attr('value'))
                          .text($(this).text())

        if (selectedOption) {
          if (selectedOption.attr('value') === $(this).attr('value')) {
            li.addClass('selected')
            self.activeValue.addClass('active-value')
            if (self.options.label) {
              self.activeValue.text(self.options.label+' '+$(this).text())
            }
            else {
              self.activeValue.text($(this).text())
            }
          }
        }
        else {
          if (first) {
            li.addClass('selected')
            self.activeValue.addClass('active-value')
            if (self.options.label) {
              self.activeValue.text(self.options.label+' '+$(this).text())
            }
            else {
              self.activeValue.text($(this).text())
            }
            first = false
          }
        }

        list.append(li)
      })

      self.dropDown
        .addClass('select-drop')
        .append(self.activeValue)
        .append(list)

      // insert the dropdown and hide the select
      self.parent.append(self.dropDown)
      self.element.hide()

      // bind the events
      self.dropDown.on(this.options.eventType, $.proxy(self.showList, self))
      self.dropDown.find('li').click(function() {
        self.changeValue(self, this)
      })
    }

    /**
     * Show / hide the dropdown
     */
  , showList: function() {
      if (this.isListVisible) {
        this.dropDown.removeClass('open').find('ul').slideUp(this.options.speed)
        this.isListVisible = false
      }
      else {
        this.dropDown.addClass('open').find('ul').slideDown(this.options.speed)
        this.isListVisible = true
      }
    }

    /**
     * Change the selected value
     */
  , changeValue: function(self, choice) {
      // assign the value to the select
      var choice = $(choice)
        , value  = choice.attr('id').replace(self.element.attr('name')+'-', '')
      self.element.val(value)

      // udpate the displayed value
      self.dropDown.find('.active-value').text(choice.text())
      self.dropDown.find('li').removeClass('selected')
      choice.addClass('selected')

      if (self.options.onChange) {
        self.options.onChange()
      }
      if (self.options.autoSubmit) {
        self.element.closest('form').submit()
      }
    }

  }

  $.fn.selectDrop = function(option) {
    return this.each(function() {
      var options = $.fn.extend({}, $.fn.selectDrop.defaults, typeof option == 'object' && option)
        , select  = new SelectDrop(this, options)

      // close the dropdown on click outside
      $(document).ready(function() {
        $(document).mouseup(function(e) {
          if (select.isListVisible && select.dropDown.has(e.target).length === 0) {
            select.showList()
          }
        })
      })
    })
  }

  $.fn.selectDrop.defaults = {
      speed: 300
    , label: false
    , eventType: 'click'
    , onChange: false
    , autoSubmit: false
  }

  $.fn.selectDrop.Constructor = SelectDrop

}(window.jQuery);
