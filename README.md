### Project Overview

The **Credit Score Simulator SDK** is an embeddable tool designed to simulate credit scores. It can be integrated into any React application, allowing users to interact with a credit score simulator directly within their app. The SDK provides flexibility in terms of theming and can also be embedded in non-React applications using an iframe.

### Installation

To install the SDK, you can use npm:

```bash
npm install credit-score-simulator
```

### Basic Usage in React

To use the simulator in a React application, you need to import the `EmbeddableSimulator` component from the SDK and include it in your component tree. Here's a basic example:

```jsx
import { EmbeddableSimulator } from "credit-score-simulator";

function App() {
  return (
    <EmbeddableSimulator
      onScoreChange={(score) => {
        console.log("New score:", score);
      }}
    />
  );
}
```

### Custom Theming

The SDK allows for custom theming, enabling you to adjust colors and fonts to match your application's design. Here's how you can apply a custom theme:

```jsx
import { EmbeddableSimulator } from "credit-score-simulator";

function App() {
  return (
    <EmbeddableSimulator
      onScoreChange={(score) => {
        console.log("New score:", score);
      }}
    />
  );
}
```

### Embedding in Iframes

For non-React applications, you can embed the simulator using an iframe. This is useful if you want to integrate the simulator into a website or application that doesn't use React. Here's how you can do it:

```html
<iframe
  src="https://your-domain.com/embed"
  width="100%"
  height="600"
  frameborder="0"
  title="Credit Score Simulator"
></iframe>

<script>
  window.addEventListener("message", (event) => {
    if (event.data.type === "SCORE_UPDATE") {
      console.log("New score:", event.data.score);
    }
  });
</script>
```

### Props and Configuration

The `EmbeddableSimulator` component accepts several props for customization:

- **onScoreChange**: A callback function that is triggered whenever the score changes.
- **className**: Additional CSS classes for styling.

### Requirements

- **React**: Version 18 or higher
- **TailwindCSS**: Version 3 or higher

### License

The project is licensed under the MIT License.
