# Requirements Document: 90s Website Generator

## Introduction

The 90s Website Generator is a web application that enables users to create authentic 1990s-style personal homepages with modern technology. The system generates fully functional HTML websites featuring period-accurate visual elements, interactive features, and social components reminiscent of GeoCities, Angelfire, and early web hosting platforms. Users can customize their sites through a form-based interface, preview them in real-time, save them to a gallery, and download them as standalone HTML files.

## Glossary

- **System**: The 90s Website Generator web application
- **User**: An authenticated person accessing and using the generator to create, save, and manage websites
- **Guest**: An unauthenticated person using the generator to create and preview sites without saving
- **Visitor**: A person viewing a shared generated site via its public URL
- **Generated Site**: The HTML output created by the system based on user configuration
- **Theme**: A predefined visual style (Neon, Space, Rainbow, Matrix, GeoCities, Angelfire)
- **Template Preset**: A pre-configured set of form values representing a specific 90s persona, including audio settings
- **Gallery**: A private collection view displaying only the authenticated user's saved sites
- **Guestbook**: A persistent comment system where visitors can leave messages on a generated site
- **Site Configuration**: The set of user inputs (name, hobby, email, theme, feature toggles, audio settings) that define a generated site
- **Visitor Counter**: A numeric display showing how many times a site has been viewed
- **Preview**: A real-time display of the generated site within the application interface
- **Download**: The action of exporting a generated site as a standalone HTML file
- **BGM**: Background music that plays automatically when a generated site loads
- **Sound Effect**: Audio that plays in response to user interactions on a generated site
- **Edit Mode**: An interface state where users can modify the content and styling of a generated site

## Requirements

### Requirement 1: Site Generation

**User Story:** As a user, I want to generate a 90s-style personal homepage by filling out a simple form, so that I can create an authentic retro website without coding knowledge.

#### Acceptance Criteria

1. WHEN a user provides a name, hobby, and optional email THEN the System SHALL generate a complete HTML website incorporating these details
2. WHEN a user selects a theme from the available options THEN the System SHALL apply the corresponding visual styling to the generated site
3. WHEN a user toggles feature options (cursor effect, animated GIFs, popups, rainbow text) THEN the System SHALL include or exclude these features in the generated site accordingly
4. WHEN a user configures audio settings (BGM track, sound effects) THEN the System SHALL include the specified audio features in the generated site
5. WHEN the System generates a site THEN the System SHALL create valid HTML5 markup that renders correctly in modern browsers
6. WHEN the System generates a site THEN the System SHALL embed all styles and scripts inline within the HTML document

### Requirement 2: Theme System

**User Story:** As a user, I want to choose from multiple authentic 90s visual themes, so that my generated site matches my preferred retro aesthetic.

#### Acceptance Criteria

1. THE System SHALL provide six distinct themes: Neon, Space, Rainbow, Matrix, GeoCities, and Angelfire
2. WHEN a theme is applied THEN the System SHALL set theme-specific background colors, patterns, text colors, header backgrounds, and link colors
3. WHERE a theme includes tiled backgrounds THEN the System SHALL apply repeating background images appropriate to that theme
4. WHEN the Space theme is selected THEN the System SHALL apply a starfield tiled background
5. WHEN the GeoCities or Angelfire themes are selected THEN the System SHALL apply patterns characteristic of those platforms

### Requirement 3: Template Presets

**User Story:** As a user, I want to quickly load pre-configured templates representing classic 90s personas, so that I can start with an authentic example and customize from there.

#### Acceptance Criteria

1. THE System SHALL provide six template presets: 90s Gamer Kid, GeoCities Classic, Webmaster Pro, Ultimate Fan Page, Elite Hacker, and Angelfire Special
2. WHEN a user selects a template preset THEN the System SHALL populate all form fields with the preset configuration values including text content, theme, fonts, colors, layout options, and audio settings
3. WHEN template presets are designed THEN the System SHALL ensure each preset demonstrates different combinations of available features to showcase the full range of capabilities
4. WHEN template presets are designed THEN the System SHALL vary text styles, color schemes, themes, and audio configurations across the six presets
5. WHEN a template preset is loaded THEN the System SHALL allow the user to modify any populated field before generating the site
6. WHEN displaying template presets THEN the System SHALL show the preset name, description, and representative emoji for each option
7. WHEN a user loads a preset THEN the System SHALL immediately update the preview to reflect the preset configuration
8. WHEN a template preset includes BGM THEN the System SHALL configure the appropriate background music for that preset
9. WHEN a template preset includes sound effects THEN the System SHALL configure the appropriate interactive sounds for that preset

### Requirement 4: Visual Effects

**User Story:** As a user, I want my generated site to include authentic 90s visual effects, so that it captures the aesthetic of that era.

#### Acceptance Criteria

1. WHEN a generated site is rendered THEN the System SHALL include animated rainbow text effects on the main heading
2. WHEN a generated site is rendered THEN the System SHALL include blinking text elements using CSS animations
3. WHEN a generated site is rendered THEN the System SHALL include horizontal scrolling marquee text
4. WHEN a generated site is rendered THEN the System SHALL include animated dividers with shimmer effects
5. WHEN a generated site is rendered THEN the System SHALL include ASCII art banners in monospace font
6. WHEN the rainbow text option is enabled THEN the System SHALL apply gradient text effects to the user name
7. WHEN the animated GIFs option is enabled THEN the System SHALL include spinning and bouncing emoji animations
8. WHEN a generated site is rendered THEN the System SHALL include pulsing NEW, HOT, and UPDATED badges

### Requirement 5: Interactive Features

**User Story:** As a user, I want my generated site to include interactive JavaScript features typical of 90s websites, so that visitors experience authentic interactivity.

#### Acceptance Criteria

1. WHEN a generated site is rendered THEN the System SHALL include a digital clock displaying real-time hours, minutes, and seconds
2. WHEN a generated site is rendered THEN the System SHALL disable right-click functionality and display an alert message when attempted
3. WHEN a generated site is rendered THEN the System SHALL rotate the page title among multiple variations every three seconds
4. WHEN the popups option is enabled AND the site is not in an iframe THEN the System SHALL display a welcome alert on page load
5. WHEN the popups option is enabled AND the site is not in an iframe THEN the System SHALL display a confirmation dialog when the user attempts to leave
6. WHEN the popups option is enabled THEN the System SHALL rotate status bar messages every two seconds
7. WHEN the popups option is enabled THEN the System SHALL detect the browser name and display it in a warning message
8. WHEN a generated site includes interactive buttons THEN the System SHALL display alert messages when buttons are clicked
9. WHEN a generated site includes hover buttons THEN the System SHALL change button colors and scale on mouse hover

### Requirement 6: Site Persistence

**User Story:** As a user, I want my generated sites to be saved to a database, so that I can access them later and share them with others.

#### Acceptance Criteria

1. WHEN an authenticated user saves a site THEN the System SHALL store the site configuration in the database with a unique identifier
2. WHEN a site is stored THEN the System SHALL record the name, hobby, email, theme, feature toggles, audio settings, user identifier, and creation timestamp
3. WHEN a site is stored THEN the System SHALL initialize the view count to zero
4. WHEN a site is stored THEN the System SHALL return the unique site identifier to enable retrieval
5. WHEN the System stores site data THEN the System SHALL ensure all required fields are present before saving
6. WHEN a site is stored THEN the System SHALL associate it with the authenticated user's account

### Requirement 7: Gallery System

**User Story:** As a user, I want to view my saved sites in a private gallery, so that I can manage and revisit my own creations.

#### Acceptance Criteria

1. WHEN an authenticated user navigates to the gallery page THEN the System SHALL display only that user's saved sites in reverse chronological order
2. WHEN displaying a site in the gallery THEN the System SHALL show the site name, theme, creation date, view count, and guestbook entry count
3. WHEN a user clicks on a gallery item THEN the System SHALL navigate to the individual site page
4. WHEN the gallery is empty THEN the System SHALL display a message indicating the user has not saved any sites yet
5. WHEN the gallery loads THEN the System SHALL fetch only the authenticated user's site data from the database in real-time
6. WHEN an unauthenticated user attempts to access the gallery THEN the System SHALL redirect to the authentication page

### Requirement 8: Individual Site Pages

**User Story:** As a user, I want each generated site to have its own unique URL, so that I can share specific sites with others.

#### Acceptance Criteria

1. WHEN a user navigates to a site URL with a valid site identifier THEN the System SHALL retrieve the site configuration from the database
2. WHEN a site page loads THEN the System SHALL generate and display the HTML based on the stored configuration
3. WHEN a site page loads THEN the System SHALL increment the view count for that site
4. WHEN a site page loads THEN the System SHALL display the site preview and guestbook side by side
5. WHEN a site identifier is invalid or not found THEN the System SHALL display an appropriate error message

### Requirement 9: Visitor Tracking

**User Story:** As a user, I want to see how many times my generated site has been viewed, so that I can gauge its popularity.

#### Acceptance Criteria

1. WHEN a user views an individual site page THEN the System SHALL increment the view count by one
2. WHEN the System increments a view count THEN the System SHALL persist the updated count to the database
3. WHEN a site is displayed in the gallery THEN the System SHALL show the current view count
4. WHEN a generated site includes a visitor counter THEN the System SHALL display a random number for aesthetic purposes
5. WHEN the System initializes a new site THEN the System SHALL set the view count to zero

### Requirement 10: Guestbook System

**User Story:** As a user, I want visitors to sign a guestbook on my generated site, so that they can leave messages and interact with my page.

#### Acceptance Criteria

1. WHEN a visitor views a site page THEN the System SHALL display a guestbook widget alongside the site preview
2. WHEN a visitor submits a guestbook entry THEN the System SHALL require a name and message
3. WHEN a visitor submits a guestbook entry THEN the System SHALL accept optional email and website fields
4. WHEN a guestbook entry is submitted THEN the System SHALL store the entry with the site identifier, name, message, email, website, and timestamp
5. WHEN a guestbook entry is submitted THEN the System SHALL validate that the name is between 1 and 50 characters
6. WHEN a guestbook entry is submitted THEN the System SHALL validate that the message is between 1 and 500 characters
7. WHEN the guestbook widget loads THEN the System SHALL display all entries for that site in chronological order
8. WHEN displaying guestbook entries THEN the System SHALL show the name, message, timestamp, and optional email and website for each entry
9. WHEN a guestbook entry includes a website THEN the System SHALL render it as a clickable link
10. WHEN the guestbook is empty THEN the System SHALL display a message encouraging visitors to be the first to sign

### Requirement 11: Download Functionality

**User Story:** As a user, I want to download my generated site as a standalone HTML file, so that I can host it elsewhere or save it locally.

#### Acceptance Criteria

1. WHEN a user clicks the download button THEN the System SHALL generate the complete HTML for the site
2. WHEN the System generates HTML for download THEN the System SHALL create a self-contained file with all styles and scripts embedded
3. WHEN the System initiates a download THEN the System SHALL trigger a browser download with a filename based on the site name
4. WHEN a downloaded site is opened THEN the System SHALL display all visual and interactive features correctly
5. WHEN a downloaded site is opened THEN the System SHALL show popups and alerts if that option was enabled

### Requirement 12: Preview System

**User Story:** As a user, I want to see a live preview of my site as I configure it, so that I can make adjustments before finalizing.

#### Acceptance Criteria

1. WHEN a user modifies any form field THEN the System SHALL update the preview within two seconds
2. WHEN the preview is displayed THEN the System SHALL render the generated HTML in an iframe
3. WHEN the preview is in an iframe THEN the System SHALL suppress popup alerts and exit confirmations
4. WHEN the preview loads THEN the System SHALL display all visual effects and animations
5. WHEN the preview loads THEN the System SHALL execute all JavaScript features except iframe-suppressed popups

### Requirement 13: Retro Badges and Indicators

**User Story:** As a user, I want my generated site to include authentic 90s badges and indicators, so that it looks like a genuine period website.

#### Acceptance Criteria

1. WHEN a generated site is rendered THEN the System SHALL include at least ten retro badge images
2. WHEN displaying badges THEN the System SHALL include badges for Netscape Navigator, Internet Explorer, screen resolution, MIDI, Java, Frames Free, Anti-Microsoft, HTML version, GeoCities, and Made with Notepad
3. WHEN a generated site is rendered THEN the System SHALL display badges in a grid layout with borders and shadows
4. WHEN a generated site is rendered THEN the System SHALL include a mock visitor counter with six-digit odometer-style display
5. WHEN a generated site is rendered THEN the System SHALL display "Last updated" timestamp using the site creation date

### Requirement 14: Content Personalization

**User Story:** As a user, I want the generated site to incorporate my personal information throughout, so that it feels like my own homepage.

#### Acceptance Criteria

1. WHEN the System generates a site THEN the System SHALL include the user name in the page title, main heading, and footer
2. WHEN the System generates a site THEN the System SHALL include the user hobby in the About Me section
3. WHERE the user provides an email THEN the System SHALL include a Contact Me section with a mailto link
4. WHEN the System generates a site THEN the System SHALL include the user name in welcome messages and alerts
5. WHEN the System generates a site THEN the System SHALL generate a random ICQ number for display purposes

### Requirement 15: Responsive Layout

**User Story:** As a user, I want the generator interface to work on different screen sizes, so that I can create sites from various devices.

#### Acceptance Criteria

1. WHEN the application is viewed on a desktop THEN the System SHALL display the form and preview side by side
2. WHEN the application is viewed on a mobile device THEN the System SHALL stack the form and preview vertically
3. WHEN the gallery is viewed THEN the System SHALL arrange site cards in a responsive grid
4. WHEN an individual site page is viewed on desktop THEN the System SHALL display the preview and guestbook side by side
5. WHEN an individual site page is viewed on mobile THEN the System SHALL stack the preview and guestbook vertically

### Requirement 16: Data Validation

**User Story:** As a user, I want the system to validate my inputs, so that I don't create broken or invalid sites.

#### Acceptance Criteria

1. WHEN a user submits the generation form THEN the System SHALL require the name field to be non-empty
2. WHEN a user submits the generation form THEN the System SHALL require the hobby field to be non-empty
3. WHEN a user submits the generation form THEN the System SHALL require a theme selection
4. WHERE a user provides an email THEN the System SHALL validate that it contains an @ symbol
5. WHEN validation fails THEN the System SHALL display an error message indicating which field is invalid

### Requirement 17: Real-Time Database Integration

**User Story:** As a developer, I want the system to use real-time database capabilities, so that data updates are reflected immediately across all views.

#### Acceptance Criteria

1. WHEN a new site is created THEN the System SHALL immediately make it available in the gallery without page refresh
2. WHEN a guestbook entry is submitted THEN the System SHALL immediately display it in the guestbook widget without page refresh
3. WHEN a site view count is incremented THEN the System SHALL update the stored value in the database
4. WHEN the System queries the database THEN the System SHALL use reactive queries that update automatically when data changes
5. WHEN multiple users access the gallery simultaneously THEN the System SHALL show consistent data to all users

### Requirement 18: Browser Compatibility

**User Story:** As a user, I want the generator and generated sites to work in modern browsers, so that I can use and share them without compatibility issues.

#### Acceptance Criteria

1. WHEN the application is accessed THEN the System SHALL function correctly in Chrome, Firefox, Safari, and Edge
2. WHEN a generated site is opened THEN the System SHALL render correctly in Chrome, Firefox, Safari, and Edge
3. WHEN CSS animations are used THEN the System SHALL include vendor prefixes where necessary for compatibility
4. WHEN JavaScript features are used THEN the System SHALL use ES5-compatible syntax or provide transpilation
5. WHEN the System detects the browser THEN the System SHALL identify Chrome, Firefox, Safari, and Edge correctly

### Requirement 19: Site Editing

**User Story:** As a user, I want to edit my generated site's content and styling after creation, so that I can refine it without starting over.

#### Acceptance Criteria

1. WHEN a user views their own saved site THEN the System SHALL display an edit button
2. WHEN a user clicks the edit button THEN the System SHALL enter edit mode for that site
3. WHEN in edit mode THEN the System SHALL allow the user to modify text content including name, hobby, and section headings
4. WHEN in edit mode THEN the System SHALL allow the user to change font families, font sizes, and font colors
5. WHEN in edit mode THEN the System SHALL allow the user to modify background colors and patterns
6. WHEN in edit mode THEN the System SHALL allow the user to change the theme
7. WHEN in edit mode THEN the System SHALL allow the user to toggle feature options on or off
8. WHEN in edit mode THEN the System SHALL allow the user to modify audio settings
9. WHEN a user saves edits THEN the System SHALL update the site configuration in the database
10. WHEN a user saves edits THEN the System SHALL preserve the original creation timestamp and view count

### Requirement 20: Audio Features

**User Story:** As a user, I want to add background music and sound effects to my generated site, so that it provides an authentic multimedia 90s experience.

#### Acceptance Criteria

1. WHEN a user enables BGM THEN the System SHALL include an audio element that autoplays background music
2. WHEN BGM is enabled THEN the System SHALL provide controls for visitors to pause or adjust volume
3. WHEN a user selects a BGM track THEN the System SHALL embed the appropriate audio file in the generated site
4. WHEN a user enables sound effects THEN the System SHALL attach audio playback to interactive elements like buttons
5. WHEN sound effects are enabled THEN the System SHALL play appropriate sounds on click, hover, or other interactions
6. WHEN audio features are included THEN the System SHALL use web-compatible audio formats (MP3, OGG, WAV)
7. WHEN a template preset includes audio THEN the System SHALL configure period-appropriate MIDI-style or retro sound effects

### Requirement 21: User Authentication

**User Story:** As a user, I want to sign in with my GitHub account or email/password, so that I can save and manage my personal collection of generated sites.

#### Acceptance Criteria

1. WHEN a user accesses the application THEN the System SHALL provide sign-in options using GitHub OAuth or email/password
2. WHEN a user clicks sign in with GitHub THEN the System SHALL redirect to GitHub for authentication
3. WHEN a user chooses email/password sign-in THEN the System SHALL display email and password input fields
4. WHEN a user submits email/password credentials THEN the System SHALL authenticate the user and establish a session
5. WHEN GitHub authentication succeeds THEN the System SHALL create or retrieve the user account and establish a session
6. WHEN a user is authenticated THEN the System SHALL display their username and profile picture (if available)
7. WHEN a user signs out THEN the System SHALL terminate the session and clear authentication state
8. WHEN a user attempts to save a site without authentication THEN the System SHALL prompt them to sign in
9. WHEN a user is authenticated THEN the System SHALL associate all saved sites with their user account
10. THE System SHALL use Clerk as the authentication provider for both GitHub OAuth and email/password authentication
11. WHEN a user signs up with email/password THEN the System SHALL create a new account and establish a session
12. WHEN a user provides invalid credentials THEN the System SHALL display an appropriate error message

### Requirement 23: Guest Mode

**User Story:** As a visitor, I want to create and preview sites without signing in, so that I can try the generator before committing to an account.

#### Acceptance Criteria

1. WHEN an unauthenticated user accesses the application THEN the System SHALL allow full access to the site generation interface
2. WHEN an unauthenticated user generates a site THEN the System SHALL display the preview immediately
3. WHEN an unauthenticated user generates a site THEN the System SHALL allow downloading the site as HTML
4. WHEN an unauthenticated user attempts to save a site THEN the System SHALL display a message prompting them to sign in
5. WHEN an unauthenticated user attempts to access the gallery THEN the System SHALL display a message prompting them to sign in
6. WHEN an unauthenticated user loads template presets THEN the System SHALL populate the form and show the preview
7. WHEN an unauthenticated user signs in after creating a site THEN the System SHALL preserve their current work and allow them to save it

### Requirement 22: Public Deployment

**User Story:** As a project stakeholder, I want the application deployed to a public URL, so that anyone can access and use the generator.

#### Acceptance Criteria

1. THE System SHALL be deployed on Vercel with a publicly accessible URL
2. WHEN the application is deployed THEN the System SHALL serve the frontend from Vercel's edge network for global CDN distribution
3. WHEN the application is deployed THEN the System SHALL connect to the Convex database backend
4. WHEN code is pushed to the main branch THEN the System SHALL automatically deploy updates to production
5. WHEN the deployment completes THEN the System SHALL be accessible without authentication for public site viewing
6. WHEN environment variables are required THEN the System SHALL securely store them in Vercel's environment configuration
7. WHEN static assets are served THEN the System SHALL leverage Vercel's automatic CDN caching

### Requirement 24: State Management

**User Story:** As a developer, I want efficient state management for client and server data, so that the application performs well and stays responsive.

#### Acceptance Criteria

1. THE System SHALL use Zustand for client-side state management including form values, UI state, and edit mode state
2. THE System SHALL use Convex reactive queries for server state management including sites, guestbook entries, and user data
3. WHEN Convex queries are used THEN the System SHALL automatically cache results and update components when data changes
4. WHEN client state changes THEN the System SHALL update only affected components without unnecessary re-renders
5. WHEN a user navigates between pages THEN the System SHALL preserve relevant state where appropriate
6. WHEN the System fetches data THEN the System SHALL leverage Next.js built-in caching mechanisms
7. WHEN static assets are requested THEN the System SHALL serve them from Vercel's edge cache for optimal performance
