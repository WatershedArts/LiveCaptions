# LiveCaptions
PhantomJS script and other resources to enable live subtitles (properly called STT, or Speech To Text) from StreamText.net. NB you will need to hire some STTRs - Speech To Text Reporters - in order to get the live STT in the first place.

You could also consider phantom-scripts/subtitle-server.js a fairly generic implementation of an HTML -> Motion JPEG converter using PhantomJS.

# What's this for?
<b>phantom-scripts/*</b>

These are for embedding live captions from [streamtext.net](http://streamtext.net) into your video stream, by using PhantomJS to turn StreamText's iframe embed into a 720p chroma-keyed Motion JPEG stream that can be superimposed on a normal video feed by streaming software such as Wirecast Pro, or by a decent vision mixer.

See [blogs.wcode.org/2015/10/live-streaming-captions/](http://blogs.wcode.org/2015/10/live-streaming-captions/) for more details.

![Image of chroma-keyed subtitles](http://blogs.wcode.org/wp-content/uploads/2015/10/phantomjs-webpage-1024x655.png)


<b>venue-captions.html</b>

This file is for loading into a full-screen browser on a large screen at the venue, for showing the live STT in the event space itself. It just has our preferred settings from StreamText - all the available settings are visible at [www.streamtext.net/player](http://www.streamtext.net/player?event=IHaveADream) if you want to play. The HTML here is optimised for webkit on a 720p screen.

![Image of venue captions](http://blogs.wcode.org/wp-content/uploads/2015/10/Screen-Shot-2015-10-05-at-13.49.23-1024x570.png)

# How to use phantom-scripts/*

Download PhantomJS for your system, as well as the two files inside phantom-scripts, and run:


`/path/to/phantomjs /path/to/phantom-scripts/subtitle-server.js`

You can then find your Motion JPEG stream at localhost port 8081. For instance, to use StreamText's demo "I Have A Dream" event, go to <b>http://127.0.0.1:8081/IHaveADream</b> with a client that understands Motion JPEG, and you will find a green-screened 3-line subtitle video appearing at 720p. Replace "IHaveADream" with the StreamText name of your own event when going live.

NB Normal Wirecast does *not* support Motion JPEG as an input, you must use the Pro version. There may be other streaming software that supports Motion JPEG as an input, please submit a pull request to this readme if so.

This is very quick and dirty software. You cannot just arbitrarily connect and ask for different streams, since it doesn't close old connections. Therefore if you want to change the streamtext event you're using in Wirecast Pro, the best bet is to change the Stream Source URL in Wirecast, quit Wirecast, stop phantomjs, relaunch phantomjs, and then start Wirecast again. Pull requests welcome.

# I really have to use Wirecast Pro?
Nope. If you have a fancy vision mixer, you could just load phantom-scripts/streamtext-embed.html into a full-screen browser on a Raspberry Pi, and feed its HDMI output into your vision mixer to be keyed in over your video. You may need to adjust the HTML to cope with a 1080p screen size, depending on your setup.

# Anything else?
Bear in mind that your StreamText event should be live and working before you attempt to connect to it.