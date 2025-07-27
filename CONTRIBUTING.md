# Contributing to SoulScript

Thank you for your interest in contributing to SoulScript! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (`npm install -g @angular/cli`)

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/soulscript-blog.git
   cd soulscript-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 📝 Code Style Guidelines

### TypeScript
- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Angular
- Use standalone components when possible
- Follow Angular style guide conventions
- Use reactive forms for complex forms
- Implement proper error handling

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theming

### Git Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(blog): add like functionality`
- `fix(auth): resolve login token issue`
- `docs(readme): update installation instructions`

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Unit tests with coverage
npm run test:coverage

# E2E tests
npm run e2e
```

### Writing Tests
- Write tests for all new features
- Maintain good test coverage
- Use descriptive test names
- Mock external dependencies

## 🔧 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Write clean, readable code
- Add tests for new functionality
- Update documentation if needed

### 3. Test Your Changes
```bash
npm test
npm run lint
npm run build
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat(scope): description of changes"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design works on all screen sizes

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
```

## 🐛 Reporting Bugs

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Angular Version: [e.g. 19.2.0]

## Additional Context
Any other context about the problem
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear description of the feature

## Use Case
Why this feature would be useful

## Proposed Solution
How you think it should be implemented

## Alternatives Considered
Other approaches you considered

## Additional Context
Any other context or screenshots
```

## 🤝 Community Guidelines

### Be Respectful
- Be kind and respectful to all contributors
- Use inclusive language
- Provide constructive feedback

### Communication
- Use clear, concise language
- Ask questions when unsure
- Help other contributors when possible

### Quality
- Write maintainable code
- Follow established patterns
- Consider the impact of your changes

## 📚 Resources

- [Angular Documentation](https://angular.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🎉 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor hall of fame

Thank you for contributing to SoulScript! 🚀 