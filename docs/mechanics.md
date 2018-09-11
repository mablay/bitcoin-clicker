# Game Mechanics

It's a clicker game, so UX must be most intuitive / self explaining.

Only clicking buttons and seeing number count might be a bit
lame. Story telling mechanics will spice UX.

## Actions
Actions are represented by buttons.
If an action requires time to process, the button
will turn into a progress bar until the process completes.

## History
Any event worth showing to the user can be pushed to the
history pane were it is displayed until newer events
supersede it.

## State
Application state is managed by vuex and persisted to
localStorage.
