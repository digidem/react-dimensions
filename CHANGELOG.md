# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0-alpha2] - 2016-10-24
### Added
- Added peer dependency for React 16

## [2.0.0-alpha1] - 2016-08-12
### Added
- Added a CHANGELOG.md
- **Breaking:** Measure the parent node rather than the wrapper. You will need to wrap this component in a `<div>` and style that.
- **Breaking:** Removed `containerStyle` and `containerClass` options - the wrapper `<div>` is no longer used for calculating dimensions.
- **Breaking:** Removed options `getWidth` and `getHeight`, replaced with `getDimensions`. This will allow replacing the current dimensions calculation with a single call to `getBoundingClientRect()`, rather than two. Currently we are still using `element.clientWidth` and `element.clientHeight` for dimension calculation.

## [1.2.0] - 2016-05-26
### Added
- `getWrappedInstance()` method ([#24](https://github.com/digidem/react-dimensions/pull/24))

## [1.1.1] - 2016-04-29
### Fixed
- Roll back accidental breaking change introduced in v1.1.0 by switching to babel v6 and changing default exports for CommonJS ([#23](https://github.com/digidem/react-dimensions/issues/23))

## [1.1.0] - 2016-04-28
### Added
- Update dimensions when an container element resizes without window resize (#4)
- Allow style of container `div` to be overridden with `containerStyle` option.
- `updateDimensions` function passed as prop passed to children to force a recalculation of dimensions.

### Changed
- Only update state if dimensions actually change (aa5fc1e9f1625f2195259c8fc7d7d041d5d53a66)
- Update to Babel 6
- Switch to documentationjs from doxme for README generation.

### Fixed
- Now works in popup windows and iframes with a different `window` context (#22)


[2.0.0-alpha2]: https://github.com/digidem/react-dimensions/compare/v2.0.0-alpha1...v2.0.0-alpha2
[2.0.0-alpha1]: https://github.com/digidem/react-dimensions/compare/v1.2.0...v2.0.0-alpha1
[1.2.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/olivierlacan/keep-a-changelog/compare/v1.0.2...v1.1.0
