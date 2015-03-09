# WIP

This is a work in progress. I'll take the big WIP off when it's worth using.
Until then, feel free to make suggestions.

## About

This is a basic css dropdown. My goal is to use the aria API effectively, such
that using the default styles gets you good aria for free.

## Usage

### Copy/paste CSS file

The easiest way is to simply copy this file into your project:
[./css/dropdown.css](https://github.com/chantastic/dropdown.css/blob/master/dst/dropdown.css)

### Node

If you're using a node-based build system, you can `npm i dropdown.css` in your
project and link to it locally `./node_models/dropdown.css/css.dropdown.css`.

## Features

You can see the working sample here:

See a working example in
[./examples/index.html](https://github.com/chantastic/dropdown.css/blob/master/examples/index.html).

This depends on some custom JavaScript. I'm [doing
this](https://github.com/chantastic/dropdown.css/blob/master/examples/js/dropdown.js)
for the sake of demo.

## Reference

### `dropdown`

The dropdown container.

**MUST** wrap both `dropdown-content` and the dropdown trigger.

```html
<div class="dropdown" aria-expanded="false">
```

#### `[aria-expanded="false"]`

When the `aria-expanded` prop is `false`, the dropdown is hidden.

#### `[aria-expanded="true"]`

When the `aria-expanded` prop is `true`, the dropdown is shown.

### `dropdown` trigger (button)

The trigger for interacting with the dropdown.

**MUST** be nested within `dropdown` and **SHOULD BE** first-child.

```html
<button
 aria-haspopup="true"
 class="dropdown-trigger"
 id="sampleDropdown"
 role="botton">
  a trigger button
</button>
```

### `dropdown-content`

This where the dropdown content goas (bewildering, right?). You can put whatever you want in
here. But there are a few content classes that are nicer to work with.

#### `dropdown-content-header`

By default, this is just bottom border for whatever markup you jam in here.

```html
<div class="dropdown-content" aria-labelledby="sampleDropdown">
  <header class="dropdown-content-header">
    I'm soooo obviously seperated from the body
  </header>

  ...
</div>
```

#### `dropdown-content-footer`

By default, this is just top border for whatever text/markup you jam in here.

```html
<div class="dropdown-content" aria-labelledby="sampleDropdown">
  ...

  <footer class="dropdown-content-footer">
    I'm soooo obviously seperated from the body
  </footer>
</div>
```

#### `dropdown-content-dismiss`

A nice little dismiss icon with a big tap target pulled to the right of the
header.

```html
<div class="dropdown-content" aria-labelledby="sampleDropdown">
  <header class="dropdown-content-header">
    ...
    <button class="dropdown-content-dismiss" aria-label="close"></button>
  </header>

  ...
</div>
```

#### `dropdown-content-hr`

A sibling separator.

```html
<div class="dropdown-content" aria-labelledby="sampleDropdown">
  ...

  <hr class="dropdown-content-hr">

  ...

  <hr class="dropdown-content-hr">
</div>
```

#### `dropdown-action`

Just some hover styles to suggest an action.

```html
...

  <li class="dropdown-action"> ... </li>

...
```

#### `dropdown-menu`

Default-styles for an action-list.

```html
<div class="dropdown-content" aria-labelledby="sampleDropdown">
  <ul class="dropdown-menu" role="menu">
    <li class="dropdown-action" role="menuitem"> ... </li>
    <li class="dropdown-action" role="menuitem"> ... </li>
  </ul>
</div>
```
