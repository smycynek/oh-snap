# oh-snap
Object snap demo

## Basics
I always wanted to implement an object snap, and there's no time like the present.

This obviously isn't a fully functional CAD system, but essentially:

1.  Random lines and circles are drawn, and their parameters are addded to a small
lookup dictionary.

2.  When the mouse moves, depending on snap options, the app iterates through all
endpoints, midpoints, etc.. and checks if their distance is less than or equal to 
the current snap range radius.  If it is, that snap point is highlighted.  If not,
the snap point is erased.

## Future optimizations

1.  Better interfaces for functions --- avoid converting from point objects
to x-y params, etc...

2.  Condense some repetitive code around iteration and highlight/erase.


## Future features

1.  Support drawing new lines and rubber-banding endpoints to snap-points.

2.  Support for snap to perpendicular, parallel, and tangent.

Are there libraries that do this already?  Of course -- this is just for fun.


## Live demo
https://stevenvictor.net/snap

