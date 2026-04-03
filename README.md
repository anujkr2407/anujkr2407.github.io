# Anuj Kumar - Portfolio Website

A modern, visually stunning, and highly interactive personal portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Modern Design**: Glassmorphism effects, soft gradients, and premium aesthetics
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Fade-in effects, parallax scrolling, and microinteractions
- **Interactive Particles**: Animated particle background with mouse interaction
- **Performance Optimized**: Fast loading, debounced scroll events, and lazy loading
- **SEO Friendly**: Semantic HTML and meta tags for better search visibility

## Sections

1. **Hero Section**: Animated introduction with particle background
2. **About**: Professional summary and key highlights
3. **Skills**: Animated progress bars and skill badges
4. **Projects**: Interactive project cards with hover effects
5. **Statistics**: Animated counters showcasing achievements
6. **Resume Timeline**: Detailed experience and education history
7. **Testimonials**: Sliding testimonial cards
8. **Contact**: Modern contact form with animation

## Technologies Used

- HTML5
- CSS3 (Glassmorphism, CSS Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter, Space Grotesk)

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. No build process required!

## Deployment to GitHub Pages

This website is designed to be deployed on GitHub Pages at `https://anujkr2407.github.io/`

### Deployment Steps:

1. Initialize Git repository:
```bash
cd portfolio-website
git init
git add .
git commit -m "Initial commit: Portfolio website with animations and dark mode"
```

2. Create a new repository on GitHub named `anujkr2407.github.io`

3. Push to GitHub:
```bash
git remote add origin https://github.com/anujkr2407/anujkr2407.github.io.git
git branch -M main
git push -u origin main
```

4. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Set Source to "main" branch
   - Save changes

5. Your website will be live at: `https://anujkr2407.github.io/`

## File Structure

```
portfolio-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── particles.js
├── assets/
│   ├── images/
│   └── resume/
│       └── Anuj_Kumar_Resume.pdf
└── README.md
```

## Customization

### Colors
Edit the CSS variables in `:root` section of `style.css`:
```css
--primary-color: #6366f1;
--secondary-color: #ec4899;
--accent-color: #8b5cf6;
```

### Content
- Update personal information in `index.html`
- Modify project details in the Projects section
- Add your own resume PDF in `assets/resume/`
- Replace placeholder images with your photos

### Animations
- Adjust animation timings in `main.js`
- Modify particle count in `particles.js`
- Customize scroll behavior and effects

## Performance Tips

- Images are lazy-loaded for faster initial load
- Scroll events are debounced to reduce CPU usage
- CSS animations use `transform` and `opacity` for better performance
- Theme preference is cached in localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal and commercial use.

## Contact

- Email: aka24.ak7@gmail.com
- LinkedIn: [linkedin.com/in/anujkr2407](https://linkedin.com/in/anujkr2407)
- GitHub: [github.com/anujkr2407](https://github.com/anujkr2407)

---

Built with passion and code 🚀
