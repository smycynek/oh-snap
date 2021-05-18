# oh-snap

Object snap demo

## Basics

I always wanted to implement an object snap, and there's no time like the present.

This obviously isn't close to a fully functional drawing system, but essentially:

1. Random lines and circles are drawn (or a test pattern),
and their parameters are addded to a small lookup dictionary.

2. When the mouse moves, depending on snap options, the app iterates through all
endpoints, midpoints, etc. and checks if their distance is less than or equal to
the current snap range radius.  If it is, that snap point is highlighted.  If not,
the snap point highlight is erased.

## Future features

1. Use the currently selected item list
to allow for more efficient erasing of highlights when the mouse moves out of range (and also allow for app to list/analyze current selections)

1. Support drawing new lines and rubber-banding endpoints to snap-points.

2. Support for snap to perpendicular, parallel, and tangent.

3. Use standard coordinates (+y = up) rather than canvas coordinates.

Are there libraries that do this already?  Of course -- this is just for fun.

## Usage

`yarn start` -> <http://localhost:8080/snap>

## Testing

Uses protractor and webdriver-manager, see `src/test`

## Live demo

<https://stevenvictor.net/snap>
