describe('form: view', function () {

    'use strict';

    beforeEach(function () {
        // mock form elements
        var broadcaster = new app.broadcaster(new app.actions());
        var formSettings = {
            id: 'fooForm',
            submitButtonId: 'fooForm-submit',
            fields: [
                {
                    name: 'one',
                    type: 'email',
                    liveValidate: false
                },
                {
                    name: 'two',
                    type: 'person',
                    liveValidate: true
                }
            ]
        };
        var mockForm = document.createElement('form');
        var mockInput1 = document.createElement('input');
        var mockInput2 = document.createElement('input');
        var mockButton = document.createElement('button');

        mockForm.setAttribute('id', 'fooForm');

        mockInput1.setAttribute('name', 'one');
        mockInput1.setAttribute('id', 'fooForm-one');

        mockInput2.setAttribute('name', 'two');
        mockInput2.setAttribute('id', 'fooForm-two');

        mockButton.setAttribute('id', 'fooForm-submit');

        document.body.appendChild(mockForm);
        mockForm.appendChild(mockInput1);
        mockForm.appendChild(mockInput2);
        mockForm.appendChild(mockButton);

        window.mockView = new app.form.view(broadcaster, formSettings);
    });

    afterEach(function () {
        var mockForm = document.getElementById('fooForm');
        mockForm.parentElement.removeChild(mockForm);

        window.mockView = undefined;
    });

    it('should exist', function () {
        expect(app.form.view).toBeDefined();
    });

    describe('_findInputEl method', function () {

        it('should exist', function () {
            expect(window.mockView._findInputEl).toBeDefined();
        });

        it('should return an input node found by it\'s name', function () {
            var el = window.mockView._findInputEl('one');
            expect(el.attributes.id.value).toEqual('fooForm-one');
        });

    });

    describe('bindInput method', function () {

        it('should exist', function () {
            expect(window.mockView.bindInput).toBeDefined();
        });

        it('should publish formInputValueChanged on value changes', function () {
            var inputElem = document.getElementById('fooForm-one');
            var tester = {
                eventFunc: function () {}
            };

            spyOn(tester, 'eventFunc');

            window.mockView.bindInput({ name: 'one' });

            window.mockView._broadcaster.subscribe(
                window.mockView._broadcaster.actions.formInputValueChanged,
                tester.eventFunc
            );

            // dispatch input event
            inputElem.dispatchEvent(new Event('input'));

            expect(tester.eventFunc).toHaveBeenCalled();
        });

        it('should publish formInputFocusChanged on focus', function () {
            var inputElem = document.getElementById('fooForm-one');
            var tester = {
                eventFunc: function () {}
            };

            spyOn(tester, 'eventFunc');

            window.mockView.bindInput({ name: 'one' });

            window.mockView._broadcaster.subscribe(
                window.mockView._broadcaster.actions.formInputFocusChanged,
                tester.eventFunc
            );

            // dispatch input event
            inputElem.dispatchEvent(new Event('focus'));

            expect(tester.eventFunc).toHaveBeenCalled();
        });

        it('should publish formInputFocusChanged on blur', function () {
            var inputElem = document.getElementById('fooForm-one');
            var tester = {
                eventFunc: function () {}
            };

            spyOn(tester, 'eventFunc');

            window.mockView.bindInput({ name: 'one' });

            window.mockView._broadcaster.subscribe(
                window.mockView._broadcaster.actions.formInputFocusChanged,
                tester.eventFunc
            );

            // dispatch input event
            inputElem.dispatchEvent(new Event('blur'));

            expect(tester.eventFunc).toHaveBeenCalled();
        });

    });

    describe('refreshInputState method', function () {

        it('should exist', function () {
            expect(window.mockView.refreshInputState).toBeDefined();
        });

        it('should change state attribue value of input', function () {
            var inputElem = document.getElementById('fooForm-one');
            var mockInputModel = {
                name: 'one',
                value: '',
                validate: function () {},
                isLiveValidated: false,
                isEmpty: true,
                isFocused: false,
                isValid: false
            };
            window.mockView.refreshInputState(mockInputModel);

            expect(inputElem.attributes['data-state-empty']).toBeDefined();
            expect(inputElem.attributes['data-state-focused']).toBeUndefined();
            expect(inputElem.attributes['data-state-valid']).toBeUndefined();
        });

    });

    describe('bindSubmit method', function () {

        it('should exist', function () {
            expect(window.mockView.bindSubmit).toBeDefined();
        });

        it('should publish event on form submit button click', function () {
            var buttonEl = document.getElementById('fooForm-submit');
            var wasCalled = false;

            window.mockView.bindSubmit('fooForm-submit');

            window.mockView._broadcaster.subscribe(
                window.mockView._broadcaster.actions.formSubmitted,
                function () { wasCalled = true; }
            );

            // dispatch click event
            buttonEl.dispatchEvent(new Event('click'));

            expect(wasCalled).toBeTruthy();
        });

    });

});
