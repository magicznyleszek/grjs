# todo

- html5 placeholder polyfill/simulator
- dynamic form centering
- mobile styles
- support: IE10, IE11, IE Edge, Firefox (latest), Safari (latest + mobile), Chrome (latest + mobile)


## architecture elements

- custom placeholder system
- input validation: live and on form submit
- stacking notifications system
- localStorage endpoint

Details:

- app
    - init notificationsController
    - init dataKeeper
    - init formController
- eventer
    - actions
    - dispatch
    - listen
- notificationsController
    - create html container for adding
    - add notification on event
    - items
- notificationModel
    - type: [ error, info, warning ]
    - message
    - lifespan
- dataKeeper
    - create localStorage data object
    - save data to localStorage
- inputModel
    - validates on lost focus or after some time
    - sends notification event on error
- formController
    - finds all inputs and applies model to them
    - find submit button
    - on submit button validate all inputs
    - save data with dataKeeper if all valid + notify
