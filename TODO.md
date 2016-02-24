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

+ app
    + init notifier
    - init dataKeeper
    - init promoform
+ eventer
    + actions
    + broadcaster (publish, subscribe)
+ notifier
    + model
        + type (error, info)
        + message
        + generated id
    + view
        + find #container element
        + add element to html method
        + remove element from html method
    + controller
        + handle add notification event
        + create new notification with model
        + add to view
        + set lifespan
        + remove from view
+ validator
    + number range (1-20)
    + length under (6, 11, 21)
    + length over (7, 0)
    + has digits
    + has no digits
    + has only digits
    + has letters
    + has special characters
    + email
+ storage
    + create localStorage data object if none there
    + save data to localStorage
    + get data from localStorage
- form
    + model for inputs
        + validate callback
        + name
        + is live validated
        + is empty
        + is focused
        + is errored
    - view
        - update attributes by input id (is-empty, is-error)
        - send event on input lost focus
        - send event on input keyup
    - controller
        - has inputs ids list
        - finds all inputs and applies model to them (bind in view)
        - on lost focus event validate input
        - on keyup event validate input after a while (cancel previous)
        - after validation notify error if necessary
        - handle submit button
            - find submit button
            - on submit button:
                1. loop through inputs: validate input, (notify error) and go next
                2. if all valid save data with dataKeeper and notify success
+ notification styles
+ textbox white styles

Refactoring:

- notifier should move html creation from model to view
- notifier view should set container with methods by controller
- storage should handle save data on broadcaster event
- form view should only need broadcaster, rest should be set with methods by controller
- write missing test for storage, form view and form controller

Form flow:

- controller receives:
    - input model
    - view
    - broadcaster
    - form data
- controller builds fields from models
- controller sends fields to view for binding
- view receives list of inputs to watch
- view binds on input:
    - focus and lost focus = send focus event(id, isFocused)
    - value changes (typing?) = send value event(id, value)
- view binds on submit = send submit event(inputs array {id, value})
- controller watches events
    - focus
        - set model flag
        - view refresh input status
    - value
        - set model value
        - validate value
        - send notification on error for some
        - view refresh input status
    - submitted
        - validate all loop = send notification event on any error
        - send notification event on all success
        - send save storage data event on all success
