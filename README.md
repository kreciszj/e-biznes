# E-Biznes

**Zadanie 1** Docker

:white_check_mark: 3.0 | Obraz ubuntu z Pythonem w wersji 3.10 [Link do commita 1](https://github.com/kreciszj/e-biznes/commit/6f28b05109c240d68d841c38e0db4ea354f14379)

:white_check_mark: 3.5 | Obraz ubuntu:24.04 z Javą w wersji 8 oraz Kotlinem [Link do commita2 ](https://github.com/kreciszj/e-biznes/commit/6f28b05109c240d68d841c38e0db4ea354f14379)

:white_check_mark: 4.0 | Do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle) [Link do commita 3](https://github.com/kreciszj/e-biznes/commit/6f28b05109c240d68d841c38e0db4ea354f14379)

:white_check_mark: 4.5 | Stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle [Link do commita 4](https://github.com/kreciszj/e-biznes/commit/6f28b05109c240d68d841c38e0db4ea354f14379)

:white_check_mark: 5.0 Dodać konfigurację docker-compose [Link do commita 5](https://github.com/kreciszj/e-biznes/commit/6f28b05109c240d68d841c38e0db4ea354f14379)

Kod: [Zadanie1](./zadanie1/) <br>
Demo: [zadanie1_eb_demo.zip](./demos/zadanie1_eb_demo.zip)

**Zadanie 2**

:white_check_mark: 3.0 | Należy stworzyć kontroler do Produktów [Link do commita 1](https://github.com/kreciszj/e-biznes/commit/b9666627df8fb85c1ec1cc029a17b26401bdba51)

:white_check_mark: 3.5 | Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane pobierane z listy [Link do commita2 ](https://github.com/kreciszj/e-biznes/commit/92e7b874d69bfc25d7c9584c46f303acad1477a8)

:white_check_mark: 4.0 | Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy zgodnie z CRUD [Link do commita 3](https://github.com/kreciszj/e-biznes/commit/a3e87f6ba4765a8f2662831c71cce3bb97b9e142)

:x: 4.5 | Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok [Link do commita 4](https://github.com/kreciszj/e-biznes/commit/)

:x: 5.0 Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD [Link do commita 5](https://github.com/kreciszj/e-biznes/commit/)

Kod: [Zadanie2](./zadanie2/) <br>
Demo: [zadanie2_eb_demo.zip](./demos/zadanie2_eb_demo.zip)


**Zadanie 3** 

:white_check_mark: 3.0 | Należy stworzyć aplikację kliencką w Kotlinie we frameworku która pozwala na przesyłanie wiadomości na platformę Discord [Link do commita 1](https://github.com/kreciszj/e-biznes/commit/44589ed7082d403b919dbf00e28707bd95c2d8bc)

:white_check_mark: 3.5 | Aplikacja jest w stanie odbierać wiadomości użytkowników z platformy Discord skierowane do aplikacji (bota) [Link do commita 2](https://github.com/kreciszj/e-biznes/commit/e3fa6453d20f65548f37be58394d20f16962d52d)

:white_check_mark: 4.0 | Zwróci listę kategorii na określone żądanie użytkownika [Link do commita 3](https://github.com/kreciszj/e-biznes/commit/cf3a26b1cf12bed8cf523461aa519ea35b96a8c2)

:white_check_mark: 4.5 | Zwróci listę produktów wg żądanej kategorii [Link do commita 4](https://github.com/kreciszj/e-biznes/commit/5462b4c5aa50a3c7c74b8da01407a6e2af3ef061)

:x: 5.0 | Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger, Webex [Link do commita 5]()

Kod: [Zadanie3](./zadanie3/) <br>
Demo: [zadanie3_eb_demo.zip](./demos/zadanie3_eb_demo.zip)

**Zadanie 4** 

:white_check_mark: 3.0 | Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD [Link do commita 1](https://github.com/kreciszj/e-biznes/commit/1b57dadf3aed8c9705f7d7b62947af263b8db016)

:white_check_mark: 3.5 | Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy) [Link do commita 2](https://github.com/kreciszj/e-biznes/commit/26b8b285e3610e184ca5a9cb141d2d4ba38fbc19)

:white_check_mark: 4.0 | Należy dodać model Koszyka oraz dodać odpowiedni endpoint [Link do commita 3](https://github.com/kreciszj/e-biznes/commit/9ef863bf0a29205492239c64cafc92c2dbc3ff78)

:white_check_mark: 4.5 | Należy stworzyć model kategorii i dodać relację między kategorią, a produktem [Link do commita 4](https://github.com/kreciszj/e-biznes/commit/67f57be554885eb134d812180eec6c87f6735cad)

:x: 5.0 | Pogrupować zapytania w gorm’owe scope'y [Link do commita 5]()

Kod: [Zadanie4](./zadanie4/) <br>
Demo: [zadanie4_eb_demo.zip](./demos/zadanie4_eb_demo.zip)

**Zadanie 5** Frontend

:white_check_mark: 3.0 | W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej [Link do commita 1](https://github.com/kreciszj/e-biznes/commit/5fb66928854237596374af0c1f93dc2a3b18daa8)

:white_check_mark: 3.5 | Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing [Link do commita 2](https://github.com/kreciszj/e-biznes/commit/ce24711845eac1ac97bc160e756fde847cb88ca2)

:white_check_mark: 4.0 | Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks [Link do commita 3](https://github.com/kreciszj/e-biznes/commit/0b4934feee67f16030ed172a5644d31cbfd96095)

:white_check_mark: 4.5 | NNależy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose [Link do commita 4](https://github.com/kreciszj/e-biznes/commit/e5c9428f262ad0909d824f92eaecff74807356da)

:white_check_mark: 5.0 | Należy wykorzystać axios’a oraz dodać nagłówki pod CORS [Link do commita 5](https://github.com/kreciszj/e-biznes/commit/d7dbfc5ac27b78618b9cb4bcf4a60d2b3d32168e)

Kod: [Zadanie5](./zadanie5/) <br>
Demo: [zadanie5_eb_demo.zip](./demos/zadanie5_eb_demo.zip)