type Dog = { kind: "dog"; bark: () => void };
type Cat = { kind: "cat"; meow: () => void };

type Animal = Dog | Cat; // discriminated union. 'kind' is the discriminant that identitfies the actual kind of object, and which helps narrow down the Animal type to the specific object type

function speak(animal: Animal) {
    if (animal.kind === "dog") {
        // narrow Animal to a Dog
        console.log(animal.bark());
    } else if (animal.kind === "cat") {
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
