"use strict";
function speak(animal) {
    if (animal.kind === "dog") {
        // narrow Animal to a Dog
        console.log(animal.bark());
    }
    else if (animal.kind === "cat") {
        // narrow animal to a Cat
        console.log(animal.meow());
    }
}
speak({
    kind: "dog",
    bark() {
        console.log("Bow wow");
    },
});
