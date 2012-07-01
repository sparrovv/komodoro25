input_files = ['js/init.js', 'js/templates.js', 'js/local_storage.js', 'js/timer.js', 'js/pomodoro_log.js', 'js/pomodoro_log_view.js', 'js/pomodoro_logs_overview_view.js', 'js/pomodoro_view.js', 'js/app.js']


bundle_file = File.new 'js/komodoro_bundle.js' , "w"

bundle_file << "try {\n"
input_files.each do |file|
  file_content = File.open(file).read

  bundle_file << file_content
end
bundle_file << "} catch(e) { console.log(e); }\n"

puts "js/komodoro_bundle.js generated"
