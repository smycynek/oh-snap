# Oh snap! - A simple object snap demo

Copyright Steven Mycynek 2021-2026

## Basics

I always wanted to implement an object snap, and there's no time like the present. I originally did this in 2021 in AngularJS and recently redid it in SolidJS and now support mobile.

This obviously isn't close to a fully functional drawing system, but essentially:

1. Random lines and circles are drawn,
   and their parameters are added to a small lookup dictionary.

2. When the mouse/touch input moves, depending on snap options, the app iterates through all
   endpoints, midpoints, etc. and checks if their distance is less than or equal to
   the current snap range radius. If it is, that snap point is highlighted.

## Future features

1. Use the currently selected item list
   to allow for more efficient erasing of highlights when the mouse moves out of range (and also allow for app to list/analyze current selections)

1. Support drawing new lines and rubber-banding endpoints to snap-points.

1. Support for snap to perpendicular, parallel, and tangent.

1. Use standard coordinates (+y = up) rather than canvas coordinates.

1. Use of a search library to look for snap candidates, such as <https://github.com/mourner/rbush>

Are there libraries that do this already? Of course -- this is just for fun.

## Usage

`bun run start`

## Live demo

<https://stevenvictor.net/snap>
