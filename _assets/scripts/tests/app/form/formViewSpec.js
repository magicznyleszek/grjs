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
                    name: 'email',
                    type: 'email',
                    liveValidate: false
                }
            ]
        };
        var mockForm = document.createElement('form');
        var mockInput = document.createElement('input');

        mockForm.setAttribute('id', 'fooForm');

        mockInput.setAttribute('name', 'email');
        mockInput.setAttribute('id', 'fooForm-email');

        document.body.appendChild(mockForm);
        mockForm.appendChild(mockInput);

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
            var el = window.mockView._findInputEl('email');
            expect(el.attributes.id.value).toEqual('fooForm-email');
        });

    });

    describe('bindInput method', function () {

        it('should exist', function () {
            expect(window.mockView.bindInput).toBeDefined();
        });

        it('should publish formInputValueChanged on value changes', function () {
            var inputElem = document.getElementById('fooForm-email');
            var tester = {
                eventFunc: function () {}
            };

            spyOn(tester, 'eventFunc');

            window.mockView.bindInput({ name: 'email' });

            window.mockView._broadcaster.subscribe(
                window.mockView._broadcaster.actions.formInputValueChanged,
                tester.eventFunc
            );

            // dispatch input event
            inputElem.dispatchEvent(new Event('input'));

            expect(tester.eventFunc).toHaveBeenCalled();
        });

        it('should publish formInputFocusChanged on focus', function () {
            var inputElem = document.getElementById('fooForm-email');
            var tester = {
                eventFunc: function () {}
            };

            spyOn(tester, 'eventFunc');

            window.mockView.bindInput({ name: 'email' });

            window.mockView._broadcaster.subscribe(
                window.mockView._broadcaster.actions.formInputFocusChanged,
                tester.eventFunc
            );

            // dispatch input event
            inputElem.dispatchEvent(new Event('focus'));

            expect(tester.eventFunc).toHaveBeenCalled();
        });

        it('should publish formInputFocusChanged on blur', function () {
            var inputElem = document.getElementById('fooForm-email');
            var tester = {
                eventFunc: function () {}
            };

            spyOn(tester, 'eventFunc');

            window.mockView.bindInput({ name: 'email' });

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
            var inputElem = document.getElementById('fooForm-email');
            var mockInputModel = {
                name: 'email',
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


        // TODO: this test, although working properly, is making PhantomJS to
        // not load properly for some weird reason.

        // it('should publish event on form submit button click', function () {
        //     var wasCalled = false;
        //     var mockButton = document.createElement('button');
        //     mockButton.setAttribute('id', 'fooForm-submit');
        //     window.mockView._containerEl.appendChild(mockButton);
        //
        //     window.mockView.bindSubmit('fooForm-submit');
        //
        //     window.mockView._broadcaster.subscribe(
        //         window.mockView._broadcaster.actions.formSubmitted,
        //         function () { wasCalled = true; }
        //     );
        //
        //     // dispatch click event
        //     mockButton.click();
        //
        //     expect(wasCalled).toBeTruthy();
        // });

    });

});
