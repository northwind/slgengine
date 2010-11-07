(function define_horde_sound () {

horde.sound = {};

var api = "SoundManager2";
var sounds = {};
var muted = false;

horde.sound.init = function horde_sound_init (callback) {
};

horde.sound.create = function horde_sound_create (id, url, loops, volume) {
};

horde.sound.play = function horde_sound_play (id) {
};

horde.sound.stop = function horde_sound_stop (id) {
};

horde.sound.stopAll = function horde_sound_stopAll () {
};

horde.sound.pauseAll = function horde_sound_pauseAll () {
};

horde.sound.resumeAll = function horde_sound_resumeAll () {
};

horde.sound.toggleMuted = function horde_sound_toggleMuted () {
};

horde.sound.isMuted = function horde_sound_isMuted () {
	return muted;
};

horde.sound.setMuted = function horde_sound_setMuted (muteSound) {
};

}());
