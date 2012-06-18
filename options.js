var defaultSounds = false;
var defaultPomodoroTime = 1500000;
var defaultBreakTime = 15000;

function loadOptions() {
	var options = localStorage.getItem('settings');
  var settings = {};

  if(options){
    settings = JSON.parse(options);
  }

  console.log(settings);

  document.getElementById('break-time').value = settings.breakTime || defaultBreakTime;
  document.getElementById('pomodoro-time').value = settings.pomodoroTime || defaultPomodoroTime;

  document.getElementById('sounds').checked = settings.sounds;
}

function saveOptions() {
  options = {};
  options.sounds = document.getElementById('sounds').checked;
  options.breakTime = document.getElementById('break-time').value;
  options.pomodoroTime = document.getElementById('pomodoro-time').value;

	localStorage["settings"] = JSON.stringify(options);

}

function eraseOptions() {
	localStorage.removeItem("settings");
	location.reload();
}
