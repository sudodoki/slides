title: Insert Title here
author:
  name: Джон, просто Джон
  github: sudodoki
  twitter: sudodoki
theme: sudodoki/reveal-cleaver-theme-bright
output: index.html

--

<style>
//.reveal code {
//  font-family: "Joystix";
//}

.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6 {
  font-family: "Upheaval Pro";
}

.reveal .roll {
  vertical-align: middle;
}
.reveal .truncate code,
.reveal .truncate pre {
  display: inline-block;
  width: auto;
}
</style>

## Джон для khjs #1

<img src="images/journey.gif" style="max-height: 500px">


--

#### Кто такой Джон ~~Галт~~?

+ Тимлид в R⚡️R
+ Соорганизатор [KyivJS](http://kyivjs.org)
+ Котан в [kottans.org](http://kottans.org)

--

### Почему я делаю этот доклад?

+ **Меня пригласили**
+ **Я в очередной раз интересуюсь ClojureScript**
+ **Слежу за языком и вам советую**

--

### Команда энтерпрайза
![](images/team.jpg)
<div style="margin: 15px 0px;text-align: left; ">
<span class="fragment" style="vertical-align:middle;text-align:center; display: inline-block; width:25%">Your Generic language</span>
<span class="fragment" style="text-align:center; display: inline-block; width:18%">Java</span>
<span class="fragment" style="text-align:center; display: inline-block; width:15.5%">Haskell</span>
<span class="fragment" style="text-align:center; display: inline-block; width:21.5%">Clojure</span>
<span class="fragment" style="text-align:center; display: inline-block; width:12%">JS</span>
<span class="fragment" style="text-align:center; display: inline-block; width:12%;margin-left: -125px;">––</span>
</div>
<span class="fragment">В данной аналогии JS = двигатель энтерпрайза</span>

--

# ClojureScript
+ "Младший брат" Clojure
+ Clojure использует JVM / CLR / JS как хоста
+ Минус вещи для работы с многопоточностью

--

## Простота vs Легкость
Рич Хикки топит за простоту, а [кложура делает её легкой](https://www.infoq.com/presentations/Simple-Made-Easy)

--

### Также в номере
+ Воспитывает функциональное мышление
+ Фронтенд на cljs = пуля в борьбе с JS снобами
+ Иммутабельность по дефолту
+ Практичность и разумные компромиссы
+ Нормально встраиваемый
+ Комьюнити
+ Эксперименты
+ Ну и кладезь для идей

--

## Синтаксис
<img src="images/engine.gif" style="max-height: 500px">


--

> Тут у меня if и выполнится эта ветка, но скобочек нет, значит выполнится только первое выражение из неё, а эти выражения тогда что?

![](images/padazzhi.png)

--

```js
/*
<Str>
  <span>hello</span>
  <span>world</span>
</Str>
*/
React.createElement(
  Str, null,
    React.createElement('span', null, 'hello'),
    React.createElement('span', null, 'world'))
```

--

```clojure
;function      arg2   arg3
;↓              ↓      ↓
(+      1       2      3)
(str "hello" "world")
;       ↑
;      arg1
```


--

## Вложенность
```clj
(def r 5)
(defn square [x] (* x x))

(* (.-PI js/Math) (square r))
```
--

```clj
(map #(* (.-PI js/Math) (square %))
      [1 2 3])

(map (fn [radius]
        (* (.-PI js/Math) (square radius)))
     [1 2 3])
```

--

Список 
<div class="truncate"><pre><code>(1 2 3)</code></pre></div>
Вызов функции
<div class="truncate"><pre><code>(fn arg1 arg2)</code></pre></div>

--

## Постойте…

![](images/fry.png)

--

# Код = Данные

![](images/oh-man.gif)

--

# Система макросов
## для расширения языка

--

# Простые типы
+ Числа `5`, `12.15`, `3/10`
+ Ключевые слова `:when`, `:id`, `:foobar`
+ Символы `my-fn`, `my-var`, `+`, `/`
+ Строки `"Hello"`, `"World"`
+ Буквы `\newline`, `\a`

--

## Основные коллекции
+ Списки `(list 1 2 3)`, `'(1 2 3)`
+ Векторы `(vector 1 2 3)`, `[1 2 3]`
+ Хеш-таблицы `(hash-map :a 1 :b 2)`, `{:a 1 :b 2}`
+ Множества `(set '(1 2 3))`, `#{1 2 3}`

--

> Зачастую то, что работает на одном типе коллекции – будет работать и на других

--

## Иммутабельность

![](images/everywhere.jpg)

--

```clj
; Ignoring OdessaJS, LvivJS, TernopilJS, ChernivtsiJS, …
(def cityjs {:kyiv ["KyivJS"] :kharkiv ["KharkivJS"]})

(assoc cityjs :kharkiv (conj (:kharkiv cityjs) "KhJS"))
; => {:kharkiv ["KharkivJS" "KhJS"], :kyiv ["KyivJS"]}

(update-in cityjs [:kharkiv] #(conj % "KhJS"))
; => {:kharkiv ["KharkivJS" "KhJS"], :kyiv ["KyivJS"]}

(println cityjs)
; => {:kharkiv [KharkivJS], :kyiv [KyivJS]}
```

--

## Преимущества
+ производительность структур и их сравнения
+ общие структурные элементы

--

## Функции и ФП
+ функции как объекты первого класса
+ композиция, частичное применение
+ поддержка нескольких арностей
+ диспатчинг по функции

--

```clojure
(defn greet
    ([salutation]
        (greet salutation "world"))
    ([salutation who]
        (println salutation who)))
; cljs.user=> (greet "hey" "there")
; hey there
; nil
; cljs.user=> (greet "hey")
; hey world
; nil
```

--

```clojure
(defmulti what-to-do-with-project :framework)
; same as (defmulti what-to-do #(% :framework))

(defmethod what-to-do-with-project :angular
  [{name :name}]
  (println "Throw" name "away, let's rewrite everything in react"))  
(defmethod what-to-do-with-project :react
  [{name :name}]
  (println "Fork CRA so" name "can be PWA with high ROI"))  
(defmethod what-to-do-with-project :reagent
  [{name :name}]
  (println "Ship" name "and learn cljs"))  

(what-to-do-with-project {:framework :angular :name "My TODO App"})
; Throw My TODO App away, let's rewrite everything in react
; nil
```

--

## In -| transform |-> Out

> Вообще, в итоге построение программы сводится к тому, чтобы придумать, какую структуру данных вы получаете на входе, какую вы хотите получить на выходе и написать трансформацию на основании функций, что превратит первое во второе

--

## Практичность
+ Вещи, которые считаются плохими, делаются явными (мутации и !, …)
+ Доступ к хост платформе `(.random js/Math)`
+ При принятии решения "умное/чистое vs практичное" – выбирают практичное

--

## Дайте мне точку входа и я весь переколбашу проект`*`
`*` – предполагаем, что у вас Leiningen

--
project.clj
```clojure
(defproject color-clock "0.1.0-SNAPSHOT"
  :description "FIXME: write this!"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.456"]
                 [reagent "0.6.0"]]
  :jvm-opts ^:replace ["-Xmx1g" "-server"]
  :plugins [[lein-npm "0.6.1"]]
  :npm {:dependencies [[source-map-support "0.4.0"]]}
  :source-paths ["src" "target/classes"]
  :clean-targets ["out" "release"]
  :target-path "target")
```
--

## Как такой получить?
+ написать руками
+ сделать lein new %template% project-name

--

## %template%
+ [mies](https://github.com/swannodette/mies)
+ [reagent](https://github.com/reagent-project/reagent-template)
+ [luminus](http://www.luminusweb.net/)
+ [macchiato](https://macchiato-framework.github.io/)

--

## Работа с DOM
+ Google Closure library
+ jQuery
+ React wrapper ([Om](https://github.com/omcljs/om), [Quiescent](https://github.com/levand/quiescent), [Reagent](http://reagent-project.github.io/), [Rum](https://github.com/tonsky/rum))

--

```clojure
(defn clock-page []
  (let [current-time (r/atom (get-current-time))]
    (add-watch current-time :seconds println)
    (fn []
      (js/setTimeout #(reset! current-time (get-current-time)) 1000)
      [:div {:class "holder" 
             :style {"backgroundColor" (time-to-rgb @current-time)}} 
        [:h1 (interpose ":" @current-time)]])))
;; -------------------------
;; Initialize app
(r/render [clock-page] (.getElementById js/document "app"))
```

--

## let он и в Африке let
```clojure
(let [somevar "somevalue"]
  (use-local-binding somevar))
```

--

# Atom
```clojure
(def my-answer (atom 42))

(println (deref my-answer)) ; => 42
(println @my-answer) ; => 42

(swap! my-answer inc) ; => 43
(swap! my-answer #(* 2 %)) ; => 86

(compare-and-set! my-answer 42 13) ; => false

(reset! my-answer 42) ; => 42
```
using reagent/atom to get automagical rerendering
--

# Markup
```clojure
[:div {:class "holder" 
       :style {"backgroundColor" (time-to-rgb @current-time)}} 
  [:h1 (interpose ":" @current-time)]]
```
Хотите просто хтмл – [enlive](https://github.com/cgrand/enlive) 
--

```clojure
(ns color-clock.core
  (:require [reagent.core :as r]
            [goog.string :as str]))
; (:require-macros [cljs.core.async.macros :refer [go]])
; (:require [cljs.core.async :as async
;             :refer [>! <! put! chan alts!]]
;            [goog.events :as events]
;            [goog.dom.classes :as classes])
; (:import [goog.events EventType])
```       
Имя неймспейса ↔ путем к файлу
Поэтому, в примере выше src/color_clock/core.cljs
--

```clojure
(defn clock-page []
  (let [current-time (r/atom (get-current-time))]
    (add-watch current-time :seconds println)
    (fn []
      (js/setTimeout #(reset! current-time (get-current-time)) 1000)
      [:div {:class "holder" 
              :style {"backgroundColor" (time-to-rgb @current-time)}} 
        [:h1 (interpose ":" @current-time)]])))
;; -------------------------
;; Initialize app
(r/render [clock-page] (.getElementById js/document "app"))
```

--

## За кадром
+ комьюнити (спасибо [@roman01la](http://twitter.com/roman01la), [@lambdadmitry](https://twitter.com/lambdadmitry), [clojurians](http://clojurians.net))
+ новый синтаксис взмахом макроса ([csp](https://github.com/clojure/core.async), [типы](https://github.com/clojure/core.typed), [логическое программирование](https://github.com/clojure/core.logic))
+ [clojure.spec](https://clojure.org/about/spec)
+ эксперименты
+ богатая экосистема

--

# <img src="images/cljs.svg" style="vertical-align: bottom;width: 100px"> ➕ 👀 = 💡
# <img src="images/cljs.svg" style="vertical-align: bottom;width: 100px"> ➕ ⌨️ = 🤓


--
## Continue? Y/N
<img src="images/fly-away.gif" style="max-height: 500px">