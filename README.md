# AwesomeModal

A vanilla, lightweight JavaScript plugin for creating custom modals.
Live Demo [click](http://tsymbal01.beget.tech/awesomeModal/).

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install AwesomeModal.

```bash
npm install awesomemodal
yarn add awesomemodal
```

## Usage
```
**CSS**
<link href="css/AwesomeModal.css" rel="stylesheet" type="text/css">

**JS**
import AwesomeModal

const myCustomModal = new AwesomeModal('.awesomeModal', {options})
```
## Options, Methods, Events
### Options
```
@string (default: empty) - { overlayClass: '.anyClass' } - adding new custom classes for overlay,
@string (default: 'rgba(0,0,0,.1)') - { overlayBackground: (color, image or gradient) } - changing overlay background,
@boolean (default: false) - { overlayCloseAbleDisabled: true/false } - defines whether the modal will be closed when the overlay is clicked,
@boolean (default: false) - { modalAnimateDisabled: true/false } - defines whether the modal will animate
 ```
### Methods
```
instance.open(), instance.close()
```
### Events
Note: add event listeners to modalElement, not overlay.
```
close - Event will fired right after modal closing
open - Event will fired right after modal opening
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
