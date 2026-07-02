# Space-Today 🚀

> A beautiful, interactive space exploration dashboard powered by NASA's open APIs

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=github)](https://sarangnayak.github.io/Space-Today/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![NASA APIs](https://img.shields.io/badge/powered_by-NASA%20APIs-navy?style=for-the-badge&logo=nasa)](https://api.nasa.gov/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A front-end web application that brings the wonders of space right to your browser. Fetches real-time data from NASA's APIs to display daily astronomy content, stunning space imagery, and cosmic facts with smooth animations and an engaging user interface.

## ✨ Features

- **🌌 NASA APOD (Astronomy Picture of the Day)** – Daily high-resolution space images with explanations
- **🛰️ Real-time Space Data** – Fetch and display current NASA datasets
- **🚀 Interactive UI** – Smooth animations, hover effects, and responsive design
- **📱 Mobile-Friendly** – Fully responsive layout that works on all devices
- **🌓 Dark Theme** – Space-appropriate dark color scheme with good contrast
- **⚡ Fast Performance** – Optimized assets and efficient API calls
- **🎨 Clean Design** – Modern, bootstrapped-friendly interface

## 🚀 Live Demo

Visit the live site: [https://sarangnayak.github.io/Space-Today/](https://sarangnayak.github.io/Space-Today/)

## 📁 Project Structure
```
Space-Today/
├── index.html # Main application entry point
├── style.css # All styles (layout, theme, animations)
├── script.js # NASA API integration and UI logic
└── README.md # Project documentation
```


## 🛠️ Getting Started

### Option 1: Quick View
Simply open `index.html` in any modern web browser.

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/sarangnayak/Space-Today.git
   cd Space-Today
   ```
   Serve the files using any HTTP server:


2. Using Python
```
python -m http.server 8000
```

   Using Node.js with http-server
```
npx http-server
```
3. Open http://localhost:8000 in your browser

### Option 3: GitHub Pages
The project is automatically deployed to GitHub Pages from the `main` branch.

## 🔧 Technical Details

### API Integration
- **NASA APOD API** – Fetches daily astronomy images and descriptions
- **NASA Open APIs** – Utilizes various NASA data endpoints
- **Fetch API** – Modern JavaScript for asynchronous data loading
- **Error Handling** – Graceful fallbacks for API failures

### Architecture
- **Vanilla JavaScript** – No frameworks or external dependencies
- **Modular CSS** – Organized styles with clear separation of concerns
- **Responsive Design** – CSS Grid and Flexbox for adaptive layouts
- **Asset Optimization** – Efficient loading of images and resources

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

## 📸 NASA APIs Used

This project leverages NASA's open APIs including:
- **APOD (Astronomy Picture of the Day)** – Daily space imagery
- **EPIC (Earth Polychromatic Imaging Camera)** – Earth imagery
- **Mars Rover Photos** – Images from Mars rovers
- **Asteroids NeoWs** – Near Earth Object Web Service

## 🎯 Use Cases

- **Education** – Astronomy and space science learning tool
- **Inspiration** – Daily dose of space exploration wonder
- **Development** – Example of API integration and front-end design
- **Portfolio** – Showcase of modern web development skills
- **Dashboard** – Space data visualization reference

🔧 Customization
Want to extend the project? Here are some ideas:

1. Add More NASA APIs:
> javascript
```
// In script.js, add new API endpoints
const NEW_API_URL = 'https://api.nasa.gov/planetary/apod';
```

2. Change Theme:

> css
```
/* In style.css, modify CSS custom properties */
:root {
  --primary-color: #your-color;
  --background-color: #your-bg-color;
}
```

3. **Add Features**:
   - Save favorite images to localStorage
   - Add image download functionality
   - Implement search by date
   - Add share functionality
   - Create image galleries

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Issues** – Found a bug? Open an issue
2. **Suggest Features** – Have an idea? Share it in discussions
3. **Submit PRs** – Implement improvements and submit pull requests
4. **Improve Docs** – Help make the documentation better

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **NASA** – For providing amazing open APIs and data
- **NASA API Team** – For maintaining accessible space data
- **Open Source Community** – For tools and inspiration
- **GitHub** – For hosting and GitHub Pages

## 🌌 About the Developer

Built with curiosity and passion for space exploration. This project aims to make space science accessible and engaging for everyone through modern web technologies.

---

> "The universe is under no obligation to make sense to you." – Neil deGrasse Tyson  
> This project tries to make it a little more comprehensible, one API call at a time.

**Keep looking up!** 🌠

