# Credit Score Simulator SDK

An embeddable credit score simulator that can be integrated into any React application.

## Installation

```bash
npm install credit-score-simulator
```

## Usage

### Basic Usage

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

### With Custom Theme

```jsx
import { EmbeddableSimulator } from "credit-score-simulator";

function App() {
  return (
    <EmbeddableSimulator
      theme={{
        colors: {
          poor: "#FF6B6B",
          fair: "#FFA07A",
          good: "#98FB98",
          veryGood: "#87CEEB",
          excellent: "#9370DB",
          primary: "#6366f1",
          secondary: "#64748b",
          background: "#ffffff",
          text: "#1e293b",
        },
        fonts: {
          primary: "your-font, system-ui, sans-serif",
          secondary: "your-font, system-ui, sans-serif",
        },
      }}
      onScoreChange={(score) => {
        console.log("New score:", score);
      }}
    />
  );
}
```

### Iframe Embedding

For non-React applications, you can embed the simulator using an iframe:

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

## Props

| Prop          | Type                         | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| theme         | ThemeConfig                  | Custom theme configuration   |
| onScoreChange | (score: CreditScore) => void | Callback when score changes  |
| className     | string                       | Additional CSS classes       |
| locale        | string                       | Locale for number formatting |

## Theme Configuration

The theme configuration allows you to customize the appearance of the simulator:

```typescript
interface ThemeConfig {
  colors: {
    poor: string;
    fair: string;
    good: string;
    veryGood: string;
    excellent: string;
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
}
```

## Credit Score Types

```typescript
interface CreditScore {
  score: number;
  range: "Poor" | "Fair" | "Good" | "VeryGood" | "Excellent";
}
```

## Requirements

- React 18 or higher
- TailwindCSS 3 or higher

## License

MIT
