# encoding: UTF-8

require 'fileutils'

check = "\033[32m✔ Done\033[39m"

task :default => :jshint

task :jshint do
  system "jshint src/js/select-drop.js"
end

task :build do
  print "\033[36mCopying uncompressed file...\033[39m"
  FileUtils.cp 'example/js/select-drop.js', 'src/js/select-drop.js'
  FileUtils.cp 'example/css/select-drop.css', 'src/css/select-drop.css'
  puts '             '+check

  print "\033[36mMinifying source file...\033[39m"
  system "uglifyjs src/js/select-drop.js -o src/js/select-drop.min.js"
  file = "src/js/select-drop.min.js"
  text = File.read(file)
  File.open(file, 'w') do |f|
    content = "/*! Select Drop v0.5.0 | (c) 2013 Romain Berger | https://github.com/romainberger/select-drop */\n"+text
    f.write(content)
  end
  puts '                 '+check
end
