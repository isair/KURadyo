$.index.open();

// Set volume slider value according to streamer volume.
$.volumeSlider.value = Alloy.Globals.streamer.volume;

// Set toggle button image according to streamer status.
if (Alloy.Globals.streamer.playing)
{
    $.toggleButton.image = "/pause.png";
}
else
{
    $.toggleButton.image = "/play.png";
}

// Feed button handling.
$.feedButton.addEventListener("click", function(e)
{
    Alloy.createController("feed").getView().open();
});

// Stream toggle button click handling.
$.toggleButton.addEventListener("click", function(e)
{
    $.toggleButton.image = "/disabled.png";
    $.toggleButton.enabled = false;

    if (Alloy.Globals.streamer.playing)
    {
        Alloy.Globals.streamer.stop();
        $.toggleButton.image = "/play.png";
    }
    else
    {
        Alloy.Globals.streamer.play();
        $.toggleButton.image = "/pause.png";
    }

    $.toggleButton.enabled = true;
});

// Volume slider handling.
$.volumeSlider.addEventListener("change", function(e)
{
    Alloy.Globals.streamer.volume = $.volumeSlider.value;
});
