// NOTE: Run this code in the browser console

function outer() {
    console.log('outer this = ', this);

    // old syntax (function expression syntax)
    const innerOld = function () {
        console.log('innerOld this = ', this); // has its own context ("this") - Window
    };

    innerOld();

    const innerArrow = () => {
        console.log('innerArrow this = ', this); // does NOT have its own context ("this") - it borrows the "this" from the enclosing scope (i.e. outer function)
    };

    innerArrow();
}

outer.call({ name: 'John' });