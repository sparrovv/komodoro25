function loadOptions() {
	var options = localStorage.getItem('settings');
  var settings = {};

  if(options){
    settings = JSON.parse(options);
  }else{
    settings.breakTime = 30000;
    settings.pomodoroTime = 1500000;
    settings.sounds = true;
  }

  document.getElementById('break-time').value = settings.breakTime;
  document.getElementById('pomodoro-time').value = settings.pomodoroTime;
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
