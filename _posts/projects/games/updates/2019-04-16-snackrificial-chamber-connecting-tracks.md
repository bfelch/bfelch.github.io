---
title: 'Connecting Tracks'
project: 'Snackrificial Chamber'
series: 'Let''s Make a Game'
categories: updates games
date: 2019-04-16 16:00:00
youtube: ZzhePjHEUE4
---
I add automatic track connections so unused track pieces are hidden and tracks are appropriately displayed.

<!-- more -->

I use a series of raycasts to determine if there is an adjacent track.  If there is no adjacent track, the connecting piece in that direction remains hidden.  I also added logic to determine if the adjacent track is facing toward the current track.  This prevents tracks from having a connection when neither track points to the other.

I use Unity and Visual Studio Code.