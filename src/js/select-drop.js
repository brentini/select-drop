/**
 * Select Drop
 * Simple jQuery plugin to convert select to dropdown
 *
 * https://github.com/romainberger/select-drop
 * @version 0.4
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

  'use strict';

  var SelectDrop = function(element, options) {
    this.element        = $(element)
    this.options        = options
    this.parent         = this.element.parent()
    this.dropDown       = $('<div>')
    this.activeValue    = $('<span>')
    this.isListVisible  = false
    this.selectedOption = false

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
        , groups         = self.element.find('optgroup')
        , options        = self.element.find('option')


      // try to find the selected value
      options.each(function() {
        if ($(this).attr('selected') === 'selected') {
          self.selectedOption = $(this)
        }
      })

      if (groups.length) {
        groups.each(function() {
          var label = $(this).attr('label')
            , groupLabel = $('<li>').addClass('optgroup-label').text(label)

          list.append(groupLabel)
          // insert label thingy
          $(this).find('option').each(function() {
            var li = self.createOption(this, first)
            first = false
            list.append(li)
          })
        })
      }
      else {
        // create the elements
        options.each(function() {
          var li = self.createOption(this, first)
          first = false
          list.append(li)
        })
      }

      self.dropDown
        .addClass('select-drop')
        .append(self.activeValue)
        .append(list)

      // insert the dropdown and hide the select
      self.parent.append(self.dropDown)
      self.element.hide()

      // bind the events
      if (this.options.eventType === 'hover') {
        self.dropDown.on({
            mouseenter: function() { $.proxy(self.showList(), self) }
          , mouseleave: function() { $.proxy(self.showList(), self) }
        })
      }
      else {
        self.dropDown.on(this.options.eventType, $.proxy(self.showList, self))
      }
      self.dropDown.find('.select-value').click(function() {
        self.changeValue(self, this)
      })
    }

  , createOption: function(option, first) {
      option = $(option)
      var self   = this
        , li     = $('<li>').attr('id', self.element.attr('name')+'-'+option.attr('value'))
                            .text(option.text())
                            .addClass('select-value')

      if (self.selectedOption) {
        if (self.selectedOption.attr('value') === option.attr('value')) {
          li.addClass('selected')
          self.activeValue.addClass('active-value')
          if (self.options.label) {
            self.activeValue.text(self.options.label+' '+option.text())
          }
          else {
            self.activeValue.text(option.text())
          }
        }
      }
      else {
        if (first) {
          li.addClass('selected')
          self.activeValue.addClass('active-value')
          if (self.options.label) {
            self.activeValue.text(self.options.label+' '+option.text())
          }
          else {
            self.activeValue.text(option.text())
          }
          first = false
        }
      }

      return li
    }

    /**
     * Show / hide the dropdown
     */
  , showList: function() {
      if (this.isListVisible) {
        this.dropDown.removeClass('open').find('ul').stop().slideUp(this.options.speed)
        this.isListVisible = false
      }
      else {
        this.dropDown.addClass('open').find('ul').stop().slideDown(this.options.speed)
        this.isListVisible = true
      }
    }

    /**
     * Change the selected value
     */
  , changeValue: function(self, choice) {
      // assign the value to the select
      choice = $(choice)
      var value  = choice.attr('id').replace(self.element.attr('name')+'-', '')
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
