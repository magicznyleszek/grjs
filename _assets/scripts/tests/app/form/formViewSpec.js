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
        }
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

    it('should exist', function () {
        expect(app.form.view).toBeDefined();
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

            console.log(window.mockView._broadcaster.subscribe);

            window.mockView._broadcaster.subscribe(
                'formInputValueChanged',
                tester.eventFunc
            );

            // dispatch input event
            inputElem.dispatchEvent(new Event('input'));

            expect(tester.eventFunc).toHaveBeenCalled();
        });

        it('should publish formInputFocusChanged on focus changes', function () {

        });

    });

    describe('bindSubmit method', function () {

        it('should exist', function () {
            expect(window.mockView.bindSubmit).toBeDefined();
        });

        it('should publish event on form submit', function () {
        });

    });

    describe('refreshInputState method', function () {

        it('should exist', function () {
            expect(window.mockView.refreshInputState).toBeDefined();
        });

        it('should change state attribue value of input', function () {
        });

    });

});
