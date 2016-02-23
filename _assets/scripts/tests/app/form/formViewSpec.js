describe('form: view', function () {

    'use strict';

    beforeEach(function () {
        // mock form elements
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

        window.mockView = new app.form.view('fooForm', 'fooForm-submit');
    });

    it('should exist', function () {
        expect(app.form.view).toBeDefined();
    });

    describe('bindInput method', function () {

        it('should exist', function () {
            expect(window.mockView.bindInput).toBeDefined();
        });

        it('should publish event on value changes', function () {
        });

        it('should publish event on focus changes', function () {
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
