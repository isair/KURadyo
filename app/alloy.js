// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// Global app settings.
Titanium.Media.audioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;
Titanium.App.idleTimerDisabled = true;

// Initialize streamer.
Alloy.Globals.streamer = Ti.Media.createAudioPlayer(
{
    url : "http://majestic.wavestreamer.com:4255",
    allowBackground : true
});

// Force portrait orientation on Android.
if (Ti.Platform.osname == "android")
{
	Ti.Gesture.addEventListener("orientationchange", function(e)
	{
		Ti.Android.currentActivity.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
	});
}

// Set UI style globals that are dependant on screen dimensions.
Alloy.Globals.buttonHeight = Math.round(Ti.Platform.displayCaps.platformHeight * .065);
Alloy.Globals.fontSize = Math.round(Ti.Platform.displayCaps.platformHeight * .035) + "px";
Alloy.Globals.borderWidth = Math.round(Ti.Platform.displayCaps.platformHeight * .005);
Alloy.Globals.borderRadius = Math.round(Ti.Platform.displayCaps.platformHeight * .01);
