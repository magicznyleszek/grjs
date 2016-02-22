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
    - email
+ storage
    + create localStorage data object if none there
    + save data to localStorage
    + get data from localStorage
- form
    - model for inputs
        - validation options
        - id
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
