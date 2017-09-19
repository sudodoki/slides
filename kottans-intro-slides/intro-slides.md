title: Kottans 101
author:
  name: sudodoki
  email: smd.deluzion@gmail.com
  github: sudodoki
  twitter: sudodoki
theme: sudodoki/reveal-cleaver-theme
output: index.html

--

# Kottans 101

--

# [@sudodoki](https://twitter.com/sudodoki)
+ 5 лет опыта коммерческой разработки, в основном, FE
+ js направление kottans
+ сейчас full-stack в Verified


--

### Спойлер
## самая гуманитарная лекция в этом курсе

--

# Прежде, чем мы начнем

--

<blockquote style="width: 100%">We are dedicated to providing an inclusive and harassment-free experience for everyone regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, age, religion, or socioeconomic status. We welcome participation and do not tolerate harassment of participants in any form. Sexual language and imagery is not appropriate for any venue, including talks. Participants violating these rules may be sanctioned or expelled from the group at the discretion of the organizers</blockquote>

--

# Советы про/для вас

--

## Учите английский
## (или китайский)
### это открывает
+ новые источники информации
+ возможности для карьеры
+ новый уровень осознания кода

--

## Занимайтесь собой
+ ваш мозг – ваш главный инструмент
+ издержки сидячей работы за компом
+ никто кроме вас не знает, чем вы хотите заниматься

--

## Мозг
+ выгорание/депрессии - не шутка
+ не зазорно ходить к психотерапевту
+ кровообращение / витамины
+ здоровый сон
+ не гореть без лишней надобности

--

## Сидячая работа
+ шея / спина
+ хороший стул
+ периодическая активность
+ периодическое целенаправленное занятие спортом

--

## Глаза
+ не работайте за монитором в темноте 
+ [MacOS night shift](https://www.macrumors.com/how-to/night-shift-macos-sierra-10-12-4/), [f.lux](https://justgetflux.com/)
+ упражнения а-ля http://blimb.su/

--

## Про гореть
+ уметь сказать "нет" когда ставят нереалистичные дедлайны
+ трудовые подвиги чаще нужны при неграмотном менеджменте
+ вы – не ваш код

--

## Вы и учеба
+ есть куча всего, что может быть интересно
+ есть куча источников и много интересных линков
+ очень мало времени все это освоить

--

## Что делать
+ приоритеты / не распыляться
+ откуда взять время?
  1. воровать у менее важных вещей ([rescuetime.com](http://rescuetime.com/) / etc)
  2. учиться по работе
  3. pomodoro, etc ([Pomodoro One](http://rinik.net/pomodoro/))
+ пайплайн/роадмап и умение вычленять хайлевел информацию

--

+ [Making Badass Developers - Kathy Sierra (Serious Pony)](https://youtu.be/FKTxC9pl-WM)
+ [Andrey Listochkin — Anti hype как не гнаться за технологиями и начать жить](https://youtu.be/xPFRUM_oDKA)

--

## Вы и тулинг
### больше всего времени мы
+ пыримся в браузер
+ пишем код
+ чем-то манипулируем
+ (сидим на митингах)

--

# Chrome DevTools
+ [discover-devtools.codeschool.com](http://discover-devtools.codeschool.com/)

--

## Поиск информации
+ google и расширенный поиск (+/-/site:/OR/image search)
+ github (и хаки квери парамс)
+ SO (stack overflow)
+ awesome листы, cheatsheet'ы

--

## Клавиатура > мышь – быстрее для очень многих задач
+ терминал / шелл
+ горячие клавиши

--

## …ака "конпелять в консоли"
+ cd / rm / cp
+ touch / mkdir
+ tail / head / cat / ls / tree
+ less / grep 
+ curl / wget / ssh
+ sed / awk / […](https://gist.github.com/sudodoki/3841f26d2a910716d126b2b0700cc1ba)

--

# git
+ VCS / <abbr title="Source control management">SCM</abbr> created by Linux core developers coming from frustrations of using tools of that time
+ Based on snapshot* of trees (not diffs)

--

## SHA1
### `BADF00D`
### Helps keep track of things

--

# Storing
+ blob
+ tree
+ commit

--

## Blob
- file content 
+ `git cat-file -p 9ff9838005211028123c1a8190509577f08a6f30`
```
markdown: rdiscount⏎
```

--

## Tree
- mode, blob / tree, sha1, name
+ `git cat-file -p 9b3bc842f3c364539235052d6ddb957a06494c9c`
```
100644 blob 19f3e164fa7904ccf3563c96a33c5a9c6269defa  .gitignore
100644 blob bc782b70ada00943f8c65f4fa2489f0015a51dca  README.md
100644 blob 9ff9838005211028123c1a8190509577f08a6f30  _config.yml
040000 tree 1863648476392b381bdbf73d57f3db8c25e2ab9e  che-parser
040000 tree dde0cb98b9f38d6b5644ea8a4d7efda43968ed2e  cljs-for-impatient
…
```
--

## Commit
+ can have 2 lines with 'parent'
+ `git cat-file -p 02c5dfd6530c6b3579b919195b2cd250683c0e68`

```
tree 9b3bc842f3c364539235052d6ddb957a06494c9c
parent 4a6ae7140522837b9f8170613e1959898aba96e1
author sudodoki <smd.deluzion@gmail.com> 1505812082 +0300
committer sudodoki <smd.deluzion@gmail.com> 1505812143 +0300

Typoes / fonts / wording
```

--

## Ok, where is history stored?
### Nowhere, it calculated based on parent
![](http://sudodoki.github.io/slides/lviv-js-august-2016/images/git-graphs.png)

--

![](http://sudodoki.github.io/slides/lviv-js-august-2016/images/branch-2.png)

--

### Merge
![](http://sudodoki.github.io/slides/lviv-js-august-2016/images/merge.png)

--

### Rebase
![](http://sudodoki.github.io/slides/lviv-js-august-2016/images/rebase.png)

--

## Ok, what are branches?
### It's just refs
+ ref = hash of commit

--

### git - обычно самое сложное,
### с чем приходится начинать работать
+ rebase vs merge
+ refs / HEAD
+ хуки
+ куча странных вещей (`git instaweb --start -p 8000 -d webrick`, `master@{one.week.ago}`)

--

# UI - удобнее, но
+ при ssh у вас не будет UI
+ люди из своих терминалов смотрят свысока
+ за UI могут быть скрыты некоторые возможности git'а

--

# [dotfiles & configs](https://github.com/webpro/awesome-dotfiles)

--

+ [gitmagic](http://www-cs-students.stanford.edu/~blynn/gitmagic/)
+ [oh shit, git!](http://ohshitgit.com/)

--

## Этот курс
### (мое мнение может отличаться от мнения редакции)
+ мы не сможем научить вас всему
+ мы почти не говорим о глобально базовых вещах
+ но сможем дать приблизительное понимание объема информаци в сфере
+ роадмап и дальнейший вектор развития

--

## Есть более глобальные вещи
+ ⏫ CS ([teachyourselfcs](https://teachyourselfcs.com/))
+ ❔ Software Architecture ([SO](https://softwareengineering.stackexchange.com/questions/22146/best-books-on-the-theory-and-practice-of-software-architecture)), DDD
+ ⏫ Решение проблем (с точки зрения бизнеса)
+ Рефакторинг ([Martin Fowler](https://martinfowler.com/books/refactoring.html), [Source Making](https://sourcemaking.com/refactoring#))
+ Дебаг
+ ⏫ Анализ

--

# Фронтенд
## [Очень много всего](https://www.mindomo.com/mindmap/front-end-development-e999af6b49404020b63ca473111c4b02)

--

## Разные аспекты
+ HTML
+ CSS
+ JS
+ Вебмастеринг и прочая (SEO, …)
+ Инфраструктура

--

## Разные проекты
+ Лендинги
+ Порталы
+ Приложения
+ Инструменты
+ Фронтендобекенд

--

# Разные сферы

--

## Разные применния
+ Классический веб
+ Библиотеки / СДК
+ Визуализации
+ Игры
+ Работа со звуком / видео
+ …

--

## На самом деле, просто куча всего
+ стоит знать, что вообще бывает
+ и что возможно сделать в браузере
+ и что вам нравится
+ и так или иначе вы найдете тех, кто готов за это платить деньги

--

## Вы и команда на работе
### Самые важные скиллы
+ уметь договариваться (убеждать в правильности своего решения, компромиссы, anger management)
+ уметь просить помощи

--

## Вы и комьюнити
+ [cityjs](https://github.com/web-standards-ru/cityjs-list)
+ митапы / конфы
+ [dev-ua](https://gitter.im/dev-ua)
+ [BeerJSKyiv](t.me/beerjskyiv) / [React Kyiv](https://t.me/reactkyiv)

--

## Правильное взаимодействие (в интернете)
+ нейтральный текст чаще воспринимается как негативный
+ уважайте собеседников

--

## Про вопросы (в интернете)
+ пользуйтесь поиском: в гугле, SO, issues проекта, с которым проблемы
+ если не можете найти специфичную проблему, перефразируйте в более общую проблему
+ если задаете вопрос, то делайте reproducible кейс в jsbin/plnkr/jsfeedle
+ не бывает глупых вопросов, все мы чего-то не знаем
+ но и вашу работу за вас делать не будут

--

## [The Passionate Programmer](https://pragprog.com/book/cfcar2/the-passionate-programmer)
Абстрактная полухудожественная книга

--

# Q/A

--

>Эстимейты и задачи

Приходит со временем. Записывать оценку до, после, сравнивать и искать причины разницы. Почитать что-то про риск менеджмент, осозновать, что является внешними факторами (чужой АПИ, зависимость от несделанного модуля, необходимость согласовать что-то с заказчиком)

--

>Нужен ли ООП подход

ООП – одна из парадигм организации вашего представления о проблеме и её решении в виде кода. Taken to extreme - это будет Domain Driven Design. Альтернативы - думать о всем с точки зрения структур данных и функций (FP), с точки зрения фактов и утверждений (LP), этс. 

--

>react/redux
>продвинутая верстка
>тесты
>accessibility

Почти по всему этому есть много литературы / докладов. Ничего такого, что нельзя было бы освоить самостоятельно или для особо ленивых сходить на 1-2х дневный тренинг. Главное, не забивать на это потом и использовать в проектах. Многое будет в этом курсе.

--

>перфоманс

Слушать Лешу и те доклады, что он посоветует. Прочитать/посмотреть про устройство браузеров / жс движков, оптимизирующие компиляторы, этс. Читать/смотреть про кейс стади про производительность в нужных вам аспектах.

--

>понятность кода для других разработчикав

Сложная субъективная метрика, но можно:
- спросить у них непосредственно мнение (code review)
- читать чужой код
- делать все по принятому стандарту (styleguides, linters)
- добавить тесты / документацию (TDD, self documenting code, TS/Flow, JSDoc)

--

>что нужно вот точно знать/учить?

Жизнь – это choose your own adventure. Делайте то, что вам нравится в компании хороших людей, решайте глобальные проблемы и смотрите, что происходит вокруг. Программирование, в конечном итоге, – это про людей и решение их проблем, но с щепоткой самообучения и эндорфинов от познания чего-то нового.
