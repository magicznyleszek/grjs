# task description

Czego od Ciebie oczekujemy:

1. Przygotowania własnej obsługi placeholder’a dla inputów i textarea użytych w formularzu. Efektem ma być działanie jak w HTML5 (atrybut placeholder);
2. dynamicznego pozycjonowania zawartości strony na środku okna przeglądarki (wertykalnie i horyzontalnie) za pomocą CSS lub JS;
3. walidacji wprowadzonych do formularza danych po kliknięciu buttona REGISTER przy założeniach:
    - Pole (First name) --> nie może być puste, nie może zawierać cyfr z zakresu 0-9;
    - Pole (Last name) --> nie może być puste, nie może zawierać cyfr z zakresu 0-9;
    - Pole (Textarea 1) --> nie może być puste, maksymalnie 10 dowolnych znaków;
    - Pole (Textarea 2) --> nie może być puste, maksymalnie 20 dowolnych znaków;
    - Pole (Email) --> nie może być puste, adres e-mail musi mieć prawidłowy format;
    - Pole (Password) --> nie może być puste, hasło musi mieć minimum 8 znaków, jedną liczbę, jedną literę i jeden znak specjalny.
    - Pole (VID Number) --> nie może być puste, może przyjąc tylko cyfry z zakresu 0-9, maksymlanie 5 znaków;
    - Pole (Number of tickets) --> nie może być puste, nie przyjmuje wartości większych niż 20 i mniejszych niż 1.

Informacje o błędach formularza zaprezentuj nam w formie "wyskakujących" komunikatów jak na filmie z załącznika. Jeśli w trakcie wprowadzania danych użytkownik przekroczy maksymalną ilość znaków w Textarea 1, Textarea 2 lub VID Number wyświetl w “dymku" komunikat o przekroczeniu limitu wraz z jego wartością.

Jeśli formularz zostanie wypełniony prawidłowo po kliknięciu buttona REGISTER wyświetl w "dymku" komunikat “Wysłano”
i umieść w localStorage wartości z poszczególnych pól formularza.

Wymagania dotyczące zadania:

1. Nie korzystamy z framework’ów (natywny JS);
2. Strona (formularz) musi poprawienie dzialać w: IE10, IE11; IE Edge; najnowsze: Firefox, Safari, Chrome + mobile;
3. Narzucona [konwencja kodowania JS](http://javascript.crockford.com/code.html)
