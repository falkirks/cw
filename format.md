## Tag specification 

cw works magically. It can detect standard "\CW: thing, another thing" format using a regular expression. It also attempts to pull out words in the text which could suggest triggering content. 

However, if you want cw to work even better on your website, you can use our meta tags and content attributes. 

### The meta tag

```
<meta name="cw" content="default">
```

You don't need to include a tag for the default setting. In this mode, cw will perform all its tests, but it won't look for attributes on your page.

```
<meta name="cw" content="yes">
```

This tag will prompt cw to scan for attributes on your page in addition to the tests it already performs.

```
<meta name="cw" content="full">
```

This tells cw to stop using it's built in scanner and rely entirely on your attributes.

```
<meta name="cw" content="no">
```

This disables cw entirely on your page. Maybe you already have your own content warning system which cw is interfering with?

### Attributes API
cw listens for changes to the DOM, so it will work perfectly with dynamically added elements, no config needed. 

Adding content warnings to elements is really easy

```
<p cw-data="one warning, a second warning, a third one">This is an element.</p>
```

