## React and Next JS training
- LTI Mindtree
- March 26 - April 10 (10 half days)
- 9:30 AM - 1:30 PM

## Mantra store online server
https://mantra-server-nzl2.onrender.com/api

## Clarifications
- Client components can have their markup rendered on the server, but their interactivity (hooks, event handlers) only kicks in on the client (though the process of __hydration__).
- External images used with `<Image>` are not downloaded at build time. Instead, it
    - Proxies it through the built-in image optimization API route (`/_next/image`)
    - Downloads the image on-demand, the first time it's requested
    - Caches it (if possible) for future requests (on the server or CDN like Vercel)
- __Any downside to using server action instead of normal API requests?__

## Todos
- Fix bugs: product pagination, app/api/products/route.test.ts

## Videos on unit testing in React apps

-   Find the starter project in [supplied-files/mantra-store-unit-testing](./supplied-files/mantra-store-unit-testing/). The accompanying guide can be found [here](./documents/09-unit-testing-react-mantra-store-react.md).

-   [Step 1: Install the necessary libraries](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-01-install-the-necessary-libraries.mp4)
-   [Step 2: Set up a simple unit test](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-02-set-up-a-simple-unit-test.mp4)
-   [Step 3: Add Jest DOM at test startup](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-03-add-jest-dom-at-test-startup.mp4)
-   [Step 4: Set up the AllProviders test utility component](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-04-set-up-the-allproviders-test-utility-component.mp4)
-   [Step 5: Render the ProductsList component and set up the loading state test](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-05-test-for-loading-spinner.mp4)
-   [Step 6: Set up API service mocks using Mock Service Worker (msw)](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-06-set-up-msw-mock-api-server.mp4)
-   [Step 7: Add a unit test to check if the component is able to show the list of products fetched at the time of load](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-07-test-if-products-are-shown.mp4)
-   [Step 8: Add a unit test to check if the component is able to show an error message if products could not be fetched at the time of load
    ](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-08-test-if-error-message-is-shown.mp4)
-   [Step 9: Add pagination test](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-09-test-pagination.mp4)
-   [Step 10: Setup helpers for AddProduct component tests](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-10-setup-helpers-for-add-product-component-tests.mp4)
-   [Step 11: Add a test that displays an error message when title input is not provided](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-11-test-if-error-message-is-shown.mp4)
-   [Step 12: Add a test that checks that no error messages are displayed when all inputs have valid values when the form is submitted](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/step-12-test-if-error-message-is-not-displayed-on-valid-input.mp4)

## Video on setting up unit tests in Next JS

-   [Setting up unit testing using Vitest in Next JS](https://corporate-trainings.s3.amazonaws.com/digikey/react-next-mar-apr-2024/setting-up-unit-testing-using-vitest-in-next-js.mp4)


## Videos on React Testing Library

-   [01 - Workshops List | Shows the loading message](https://it-video-recording.s3.amazonaws.com/react-testing-library/01-workshops-list-shows-the-loading-message.mp4)
-   [02 - Setting up a mock server using MSW](https://it-video-recording.s3.amazonaws.com/react-testing-library/02-setting-up-a-mock-server-using-msw.mp4)
-   [03 - Workshops List | Shows the list of workshops on load](https://it-video-recording.s3.amazonaws.com/react-testing-library/03-workshops-list-shows-the-list-of-workshops-on-load.mp4)
-   [04 - Workshops List | Shows an error when list of workshops cannot be fetched](https://it-video-recording.s3.amazonaws.com/react-testing-library/04-workshops-list-shows-an-error-when-list-of-workshops-cannot-be-fetched.mp4)
-   [05 - Workshops List | Shows the next and previous page of workshops](https://it-video-recording.s3.amazonaws.com/react-testing-library/05-workshops-list-shows-the-next-and-previous-page-of-workshops.mp4)
-   [06 - Workshop Details | Shows the loading message](https://it-video-recording.s3.amazonaws.com/react-testing-library/06-workshop-details-shows-the-loading-message.mp4)
-   [07 - Workshop Details | Shows the details of workshop or shows an error](https://it-video-recording.s3.amazonaws.com/react-testing-library/07-workshop-details-shows-the-details-of-workshop-or-shows-an-error.mp4)
-   [08 - Sessions List | Loading tests](https://it-video-recording.s3.amazonaws.com/react-testing-library/08-sessions-list-loading-tests.mp4)
-   [09 - Sessions List | Voting up and down on a session works](https://it-video-recording.s3.amazonaws.com/react-testing-library/09-sessions-list-voting-up-and-down-on-a-session-works.mp4)
