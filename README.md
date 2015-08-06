# node-srtScript
Node script that increments/decrements the number of seconds for .srt files

I had a .srt file that's timing was way out of sync with the dialogue, so I made a basic script
that I could use to change the time when subtitles were displayed. The .srt wasn't consistent in its
off timing so it was a fail overall, but trying different values got me something of a good average that was 
watchable (success?).

Usage

```
$ node [pathToSRTScript.js] [pathToSRTFile] [# of seconds to add/subtract]

$ node srtScript.js /path/subtitles.srt 5

$ node srtScript.js /path/subtitles.srt -5
```
