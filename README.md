# typescript-training

## install

Run:

    npm install

## run

single run (compile & test once, useful for CI):

    npm test -- --single-run

development run (compile & test initially + for each file change, useful for development):

    npm test

## running single tests

You can temporarily adapt jasmine tests to run *only few specific tests* (one
or more) to save time, not to execute all the tests you have. In order to do
that, use [focus](http://jasmine.github.io/2.6/focused_specs.html)
and [exclude](https://jasmine.github.io/2.6/introduction.html#section-Disabling_Suites):

 * replace `it()` with `fit()`/`xit()` **and/or**
 * replace `describe()` tiwh `fdescribe()`/`xdescribe()`

Important thing, however, is **not to push** these temporary changes (`fit`,
`xit`, `fdescribe`, `xdescribe`) to the repository.

## custom matchers

 * see [Jasmine-Matchers](https://github.com/JamieMason/Jasmine-Matchers)

## progress

In the beginning, most of the tests are failing:

      Something
        important
          ×can be used
          ×is useful
          ×works like a charm

Your task is to learn TypeScript and make tests pass. Eventually, tests should look more or less like the following:

      Something
        important
          √can be used
          √is useful
          √works like a charm
