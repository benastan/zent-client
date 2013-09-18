Smoother = require 'breathe-easy/dist/smoother'
Zent = Smoother.new 'http://zentapp.herokuapp.com'
Zent.register 'Message', ->
  @base ''
  @get 'zen', 'zen.txt'
  @proto -> @processData = (data) -> data.data if data
  @member ->
    @setup (id) -> @id = id
    @base -> @id
window.Zent = Zent if typeof window isnt 'undefined'
