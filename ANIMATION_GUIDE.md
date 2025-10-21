# 🎨 Scroll Animation System

A comprehensive animation system for your Next.js application that provides smooth scroll-triggered animations and page load effects.

## ✨ Features

### 🚀 **ScrollAnimation Component**

- **Intersection Observer**: Efficient scroll detection
- **Multiple Animation Types**: fadeIn, slideUp, slideDown, slideLeft, slideRight, scaleUp, rotate, bounce
- **Customizable Timing**: Configurable delays and durations
- **Staggered Animations**: Perfect for lists and grids
- **Performance Optimized**: Uses `requestAnimationFrame` and efficient observers

### 📱 **PageLoadAnimation Component**

- **Page Load Effects**: Animations that trigger when the page loads
- **Smooth Transitions**: Fade-in, slide-up, and scale-up effects
- **Customizable Delays**: Control when animations start

## 🎯 Usage Examples

### Basic Scroll Animation

```tsx
import ScrollAnimation from "@/components/common/ScrollAnimation";

// Simple fade-in animation
<ScrollAnimation animation="fadeIn" delay={200}>
  <div>This will fade in when scrolled into view</div>
</ScrollAnimation>

// Slide up animation
<ScrollAnimation animation="slideUp" delay={100}>
  <h1>This will slide up from below</h1>
</ScrollAnimation>
```

### Specialized Components

```tsx
import { FadeIn, SlideUp, ScaleUp, RotateIn } from "@/components/common/ScrollAnimation";

// Use specialized components for cleaner code
<FadeIn delay={300}>
  <div>Fade in effect</div>
</FadeIn>

<SlideUp delay={200}>
  <div>Slide up effect</div>
</SlideUp>

<ScaleUp delay={100}>
  <div>Scale up effect</div>
</ScaleUp>
```

### Staggered Animations for Lists

```tsx
import { StaggeredAnimation } from "@/components/common/ScrollAnimation";

<StaggeredAnimation staggerDelay={100}>
  {items.map((item, index) => (
    <div key={index}>{item}</div>
  ))}
</StaggeredAnimation>;
```

### Page Load Animations

```tsx
import PageLoadAnimation from "@/components/common/PageLoadAnimation";

<PageLoadAnimation delay={100} duration={800}>
  <div>This animates when the page loads</div>
</PageLoadAnimation>;
```

## 🎨 Animation Types

### Scroll Animations

- **fadeIn**: Smooth opacity transition
- **slideUp**: Slides up from below with fade
- **slideDown**: Slides down from above with fade
- **slideLeft**: Slides in from the right
- **slideRight**: Slides in from the left
- **scaleUp**: Scales up with fade effect
- **rotate**: Rotates and scales in
- **bounce**: Bounces in with scale effect

### Page Load Animations

- **FadeInOnLoad**: Fades in on page load
- **SlideUpOnLoad**: Slides up on page load
- **ScaleUpOnLoad**: Scales up on page load

## ⚙️ Configuration Options

### ScrollAnimation Props

```tsx
interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?:
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scaleUp"
    | "rotate"
    | "bounce";
  delay?: number; // Delay in milliseconds (default: 0)
  duration?: number; // Duration in milliseconds (default: 700)
  threshold?: number; // Intersection threshold (default: 0.1)
  className?: string; // Additional CSS classes
  once?: boolean; // Animate only once (default: true)
  stagger?: boolean; // For staggered animations (default: false)
}
```

### PageLoadAnimation Props

```tsx
interface PageLoadAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number; // Duration in milliseconds (default: 1000)
  delay?: number; // Delay in milliseconds (default: 0)
}
```

## 🎯 Real-World Examples

### Hero Section with Page Load Animation

```tsx
<PageLoadAnimation delay={100}>
  <Hero />
</PageLoadAnimation>
```

### Campaign Cards with Staggered Animation

```tsx
<StaggeredAnimation
  staggerDelay={100}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {campaigns.map((campaign) => (
    <CampaignCard key={campaign.id} {...campaign} />
  ))}
</StaggeredAnimation>
```

### Contact Form with Multiple Animations

```tsx
<ScrollAnimation animation="slideLeft" delay={200}>
  <div className="contact-info">
    {/* Contact information */}
  </div>
</ScrollAnimation>

<ScrollAnimation animation="slideRight" delay={300}>
  <div className="contact-form">
    <ScrollAnimation animation="scaleUp" delay={400}>
      <ContactForm />
    </ScrollAnimation>
  </div>
</ScrollAnimation>
```

## 🚀 Performance Tips

1. **Use `once={true}`** (default) for elements that should only animate once
2. **Set appropriate thresholds** to control when animations trigger
3. **Use staggered animations** for lists to create smooth sequential effects
4. **Combine page load and scroll animations** for maximum impact

## 🎨 Customization

### Custom Animation Timing

```tsx
<ScrollAnimation
  animation="slideUp"
  delay={500}
  duration={1000}
  threshold={0.2}
>
  <div>Custom timing animation</div>
</ScrollAnimation>
```

### Custom CSS Classes

```tsx
<ScrollAnimation animation="fadeIn" className="my-custom-class">
  <div>With custom styling</div>
</ScrollAnimation>
```

## 🔧 Integration

The animation system is already integrated into your main pages:

- **Home Page**: Hero, Countries, GlobalImpact, GazaEmergency sections
- **Campaigns Page**: Alert banner, famous campaigns, filter, cards, pagination
- **Contact Page**: Header, contact info, form sections
- **Terms of Service**: Header, navigation, content sections

All animations are optimized for performance and provide smooth, professional user experiences!
