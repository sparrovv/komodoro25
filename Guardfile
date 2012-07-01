guard 'coffeescript', :input => 'coffee', :output => 'js', :bare => true

guard :shell do
  watch %r{js\/(?!komodoro_bundle).+\.js} do |m|
    `ruby bundle_js.rb`
  end
end
