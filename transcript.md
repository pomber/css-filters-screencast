We can use the filter CSS property to change how an element looks.

---

For example, we can blur it.

---

Or add a shadow.

---

One special filter we can use is the URL function.

It takes an id as an argument. That's the id of an svg filter.

---

Somewhere on the html we need an svg element with a filter. And that filter should have the id from the css.

---

Inside the filter, we need to add effects.
We can have a basic effect, like a blur.

---

Or we can have something very complex combining several effects.

---

We are going to focus on the point light effect.
At first it doens't seem to do too much.
Let's see what happens when we change the zed parameter.

---

We have a light source at the top left of the h1, and we just moved it closer to the viewer away from the web page.

The diffuse lighting effect is taking the h1's alpha channel and using it as a bump map. That means that the opaque parts of the H1, the text and the border, are higher than the background, which is transpaent.

So, the browser is taking that height map and the position of the light source to calculate the output.

---

We can change the height of the opaque parts using the surfaceScale. Now the letters and the border are closer to the viewer.

---

We can also change the light color.

---

And we can move the light source to a different position.
Here we are using pixels.

---

But we can change the primitiveUnits property of the filter to objectBoundingBox, and now, instead of pixels, we can use fractions of the H1's size.
