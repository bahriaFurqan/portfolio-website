# Portfolio Website

A modern, responsive portfolio website built with React, featuring 3D effects and smooth animations.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **3D Effects**: Interactive 3D elements for enhanced user experience
- **Responsive**: Fully responsive design that works on all devices
- **Fast Loading**: Optimized for performance and speed
- **Contact Form**: Integrated contact form with EmailJS
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Programming language
- **HTML5** - Markup language
- **CSS3** - Styling
- **EmailJS** - Email service integration
- **Netlify** - Deployment platform

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the website

## 🔧 Configuration

### EmailJS Setup

To enable the contact form functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Follow the setup guide in `EMAILJS_SETUP.md`
3. Update your service ID, template ID, and public key in the contact form component

### Environment Variables

Create a `.env` file in the root directory and add your EmailJS credentials:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

## 🚀 Deployment

This project is configured for easy deployment on Netlify:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`

For detailed deployment instructions, see `DEPLOYMENT_GUIDE.md`.

## 📁 Project Structure

```
portfolio-website/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
└── README.md
```

## 🎨 Customization

### Colors and Themes

The website uses Tailwind CSS for styling. You can customize colors, fonts, and spacing in:

- `tailwind.config.js` - Main configuration
- `src/App.css` - Custom styles
- `src/index.css` - Global styles

### Content

Update the following files to customize your portfolio content:

- `src/App.js` - Main component with portfolio sections
- `public/index.html` - Meta tags and page title

### Fonts

The project uses Google Fonts (Inter and JetBrains Mono). You can change fonts in:

- `public/index.html` - Font imports
- `tailwind.config.js` - Font family configuration

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [EmailJS](https://www.emailjs.com/) - Email service
- [Netlify](https://www.netlify.com/) - Hosting platform

---

⭐ Star this repository if you found it helpful!
