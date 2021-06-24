# 'Sports Event Planner' website

## Introduction

This website is aimed at sports fans looking for events attend anywhere in the world. Any team, any competition, any sport or any event, in any country in the world can be located in seconds and the details displayed on screen at the click of a button.  

A live website can be found [here]( https://andyb-whg.github.io/sports-event-planner/).

![website preview](assets/images/responsive_screenshot.png)

# Table of Contents
- [1. UX](#ux)
  * [1.1. Strategy](#strategy)
    + [Project Goals](#project-goals)
      - [User Stories:](#user-stories)
      - [User Expectations:](#user-expectations)
      - [Trends of Modern Websites](#trends-of-modern-websites)
      - [Strategy Table](#strategy-table)
  * [1.2. Structure](#structure)
  * [1.3. Skeleton](#skeleton)
  * [1.4. Surface](#surface)
- [2. Features](#features)
- [3. Technologies Used](#technologies-used)
- [4. Testing](#testing)
- [5. Development Cycle](#development-cycle)
- [6. Deployment](#deployment)
- [7. End Product](#end-product)
- [8. Known Bugs](#known-bugs)
- [9. Credits](#credits)

<a name="ux"></a>
# 1. UX
  [Go to the top](#table-of-contents)

<a name="strategy"></a>
## 1.1. Strategy
  [Go to the top](#table-of-contents)

### Project Goals

The main aim of the site is to give users a super-efficient way to locate an event or potential range of sports events at the click of a button.  The user can either quick search for a general date ordered list of events or use the filter buttons to home in on more specific requirements.

### User Stories:
 * As a user I want a simple, quick method of finding an event to attend.

 * As a user I want the page to be intuitive and easy to understand.  

 * As a user I want the site to tell me if I’m doing something wrong and how to fix it.  

 * As a user I want the site to be elegant and easy on the eye.

 * As a user I want the site to be responsive to different screen sizes so that I can still use the site whether I’m using my mobile phone, tablet or PC.

 * As a user I want the more advanced ‘filter’ options to be simple, obvious and intuitive to use.

 * As a user I want the results returned to be informative, concise, easy to view and read and relevant to my search request.

### Strategy Table
Features| Importance| Viability/Feasibility
------------ | -------------------------|---------
Provide a list of scheduled events | 5 | 5
Quick Search function  | 5| 5
Filter Buttons to narrow search parameters | 5 | 5
Responsive design | 5 | 5
Google Map showing location/s of listed results | 4 | 3
Hotels / Restaurants Section beneath map when map location clicked | 4 | 2

## Scope

It is unlikely that all of the features listed above can be implemented in time for initial deployment. The site will therefore be developed in three stages:

### Stage 1

The initial basic site takes user inputs and provides a table of up to ten events, in date order, for the user to view.  Pagination buttons allow the user to view additional results should the list returned be greater than 10 items.

### Stage 2

A google map is to be added in stage 2 with the locations of the listed events marked on the map.

### Stage 3
Details of restaurants, hotels and places of interest to be added below the map enabling users to better plan the trip and improve the travel experience.


<a name="structure"></a>
## 1.2. Structure
  [Go to the top](#table-of-contents)

 - Site to be responsive on all Screen Sizes with information to be selectively added / removed dependent upon the screen size in use.
 - ‘Nav Bar’ section placed prominently at the top of the page to act as an initial prompt for first time visitors.
 - Hero image of a sports event beneath the Quick Search section, with a ‘Call Out’ describing and explaining exactly what the site does for the user.
 - ‘Filter Section’ provided beneath the Hero Image. Placed lower down the page to prevent distractions for new users.  Returning and frequent users will be acquainted with the site and this more confident to move beyond the basic Nav Bar search option.
 - ‘Results Table’ is displayed beneath the filter section, initially listing the current most prestigious upcoming events across the world.  The table to display ten results at a time, with ‘pagination buttons’ provided should a search bring back more than ten events.
 - ‘Google Map’ (Stage 2 development) to be listed below the Results Table marking the listed event locations on the map.  
 - ‘Local Attractions’ (Stage 3 development) to be listed beneath the Google Map.  
 - Footer section at bottom of page displaying social media links to various websites including Twitter, Youtube, Instagram and Facebook.

<a name="skeleton"></a>
## 1.3. Skeleton
  [Go to the top](#table-of-contents)

[Balsamiq](https://balsamiq.com/) was used to create the following wireframes.  
Three variations are provided as examples of differing screen size layouts, namely Mobile, Tablet and Desktop. 'Extended' versions of the mobile and tablet wireframes in order to show the full scrollable content. 

### Wire-frames
Web browser view
[![index.html-web](documentation-assets/wireframe-images/desktopWireframe.png)](documentation-assets/wireframe-images/desktopWireframe.png)

Mobile & Tablet browser view
[![index.html-web](documentation-assets/wireframe-images/mobileTabletExtendedWireframes2.png)](documentation-assets/wireframe-images/mobileTabletExtendedWireframes2.png)



<a name="surface"></a>
## 1.4. Surface
  [Go to the top](#table-of-contents)

### Colours
Please find the colours schemes that I used [here](https://coolors.co/34495e-ffffff-e74c3c-3a3a3a-fafafa).

### Typography
I decided to use Roboto as my font of choice with sans serf as my backup font for browsers that might not support Roboto.

<a name="features"></a>
# 2. Features
  [Go to the top](#table-of-contents)

### All pages:
- Navigation bar is placed at the top of the screen, for ease of use and consistency. It has a hover effect and changes colour to improve the user experience. The page that you have selected also highlights red so the user knows exactly which page they are on.
- Social media links, - all links are placed at the bottom of each page in the footer. All links open in a new tab.
- Logo/text - a Sir Alex Ferguson logo is also placed on the top right of each page. This gives the context that the website is about him.

### Landing page:
- Main image - a large image that shows who the website is about.
- Summary - a summary of what Sir Alex achieved.
- Video - an embedded tribute video from youtube that gives the user the multimedia experience. This helps the user to be engaged with the website.

### Career page:
- Overall statistics - a small bordered box that shows his managerial career stats.
- Timeline - this element shows his career in a chronological experience. Reading from the top (when he started his career) to the bottom (when he finishes his career). This section tells you which clubs he has managed and a summary of what he achieved.
- Club logos - These images add a visual to UI and improving UX as it's not just text on the page.

### Testimonials page:
- Card style view - this gives the user an easy to read card view that breaks information down into small sections. The user can read from card to card.
- Card images - all images are of the same size, giving the UI consistency. This also gives the context of who the quote was from.
- Card quotes - short quotes about Sir Alex admiring him. These quotes are from players who played under him and other managers giving credit.

### Gallery page:
- Collage images - these images are placed in a collage design. This allows me to place multiple sized images to the given screen size. The images show the success and happiness he had in the game.

### Contact page:
- Contact form - this gives the user the ability to message me for any issues they are having with the site, any suggestions of improvement and to give their opinions on any other manager that could potentially take his place.

<a name="technologies-used"></a>
## 3. Technologies Used
  [Go to the top](#table-of-contents)

* [HTML5](https://en.wikipedia.org/wiki/HTML)
  * The project uses HyperText Markup Language.
* [CSS3](https://en.wikipedia.org/wiki/CSS)
  * The project uses Cascading Style Sheets.
* [Atom](https://atom.io/)
  - The project uses Atom to code.
* [Chrome](https://www.google.com/intl/en_uk/chrome/)
  - The project uses Chrome to debug and test the source code using HTML5.
* [Balsamiq](https://balsamiq.com/)
  - Balsamiq was used to create the wireframes during the design process.
* [Google Fonts](https://fonts.google.com/)
  - Google fonts were used to import the "Roboto" font into the style.css file which is used on all pages throughout the project.
* [GitHub](https://github.com/)
  - GitHub was used to store the project's code after being pushed from Git.
* [JS Fiddle](https://jsfiddle.net/)
  - JS Fiddle was used as a playground to test all my code before committing.

<a name="testing"></a>
# 4. Testing
  [Go to the top](#table-of-contents)

## Automated testing
### Google Developer Tools

For every element that I added to my HTML, I would add the basic CSS to my stylesheet. I would then use the inspect element to try different styles. Once I've got it to my liking I would copy the CSS from google into my stylesheet. This allows me to keep track of the code I am using.

### Responsive Tools

I used [Am I Responsive](http://ami.responsivedesign.is/) to make sure that all my pages are responsive to all devices.

### W3C Validator Tools

I used [W3C Markup](https://validator.w3.org/#validate_by_input+with_options) to check for any errors within my HTML pages.

I had an error on the index.html page with the iframe attribute of "frameborder". The HTML checker notified me that this attribute is obsolete and to use CSS instead.

I also had an error on the contact_us.html page with a duplicate ID of "form_inline". I rectified this by changing the ID's to a class instead and updated the CSS for this.

I used [W3C CSS Validation](https://jigsaw.w3.org/css-validator/) to check for any error within my CSS stylesheet.

## Manual Testing

I have tested my site on Safari and google chrome on multiple devices.
I also used [JS Fiddle](https://jsfiddle.net/) as a playground to test all of my code before staging and committing any changes.

These include:
  - iPhone X
  - iPhone XS Max
  - iPad Pro
  - Macbook Pro

Please find below my testing process for all pages via mobile and web:

### All pages:
  - Navigation Bar:
    - Home - When selecting "home", the browser redirects me to the home page. The text in the navigation bar also stays highlighted in red. It worked as expected.
    - Career - When selecting "career", the browser redirects me to the career page. The text in the navigation bar also stays highlighted in red. It worked as expected.
    - Testimonials - When selecting "testimonials", the browser redirects me to the testimonials page. The text in the navigation bar also stays highlighted in red. It worked as expected.
    - Gallery - When selecting "gallery", the browser redirects me to the gallery page. The text in the navigation bar also stays highlighted in red. It worked as expected.
    - Contact - When selecting "contact", the browser redirects me to the contact page. The text in the navigation bar also stays highlighted in red. It worked as expected.

    - Text:
      - I checked that all text is in the correct and consistent size and font. I also checked that there were no typos.

    - Media:
      - I checked that all images and videos on this page load. Making sure that the video played and that all images have alt text if media does not load. It worked as expected.

    - Responsiveness
      - I checked that all pages and elements were responsive. Checking each page on mobile and website and adjusting screen size to find break points. It worked as expected.

  - Footer:
    - Facebook - When selecting the Facebook icon, a new tab opens and redirects to the Facebook website. It worked as expected.
    - Twitter -  When selecting the Twitter icon, a new tab opens and redirects to the Twitter website. It worked as expected.
    - YouTube - When selecting the YouTube icon, a new tab opens and redirects to the YouTube website. It worked as expected.
    - Instagram -  When selecting the Instagram icon, a new tab opens and redirects to the Instagram website. It worked as expected.

### Career page:
  - Managerial Career Statistics:
    - Checking the statistics element is responsive on mobile and web. This worked as expected.

  - Timeline:
    - I checked for consistency within the club logos for each section in the timeline.
    - Making sure the the headers and content text is consistent in size and font.
    - I also checked that the timeline is in chronological order.

### Testimonials page:
  - Cards view:
    - I tested the responsiveness of the cards view, making sure that the columns decreased as the screen got smaller.
    - Making sure that the images do not pixelate when the screen got smaller. It worked as expected.

### Gallery page:
  - Collage:
    - Testing all images respond to the screen getting smaller. The columns show a decrease if this happens. It worked as expected.
    - Hovering over each image to make sure that the hover animation is working and displaying the correct text and colours.

### Contact page:
  - Contact form:
    - Testing that each field of the form is required before submitting. It worked as expected.
    - Checking that the submit button works and processes the form.

<a name="development-cycle"></a>
# 5. Development Cycle
  [Go to the top](#table-of-contents)

There were many elements I changed, re-positioned and added from my original wireframes as they were more visually appealing.

### All pages:
 - Replaced the Sir Alex Photo on the top right with just a text. This is visually more appealing because the text can fit inside the navigation bar.

### Landing page:
  - The original wireframe lacked attention from users. I added an embedded YouTube video to make the user more variety with different media elements. This video is also a short introduction to what the website is about.

### Career page:
  - I added a statistics panel to show the numbers Sir Alex achieved during his career.
  - The original design shows the timeline is continuously on the left side of the page. I decided to change this to make the timeline appear on the centre of the page with the content displaying on the left then the right side of the page. This keeps the user engaged as the content isn't just a block of text.

### Testimonials page:
  - The original wireframe shows this page as an awards page with the same timeline design as the career page however, I changed this to a testimonials page. This is to give the user a better experience with a different format from the career page. As I was planning to use the same design the user would have been less engaged as they felt like they were reading the same content in the same format.
  - I added in a cards view, this gives the user smaller amounts of content so it's easy to process. The image on each card also gives the context of who the quote was from.

### Gallery page:
  - The gallery page has remained the same. I added a hover animation over each photo to give the context of what the image is about.

### Contact page:
 - After coding the contact page to the original design. I thought that it looked dull, so I added other elements to make this page visually appealing to the users.
 - Added google maps location
 - Added icons for location, telephone number and contact email.

<a name="deployment"></a>
# 6. Deployment
  [Go to the top](#table-of-contents)

I used GitHub pages to deploy my final project. To do this I had to:

1. Create a repository on GitHub.
2. Clone the repository on your chosen source code editor (Atom in my case) using the clone link.
4. Add files to Git (staging area) and use the atom commit to master button.
5. Use git within atom to push the code.
7. Go to GitHub and load your repository.
8. Select settings.
9. Select pages on the left menu bar.
10. Click on the master branch.
11. This will now generate a link with your website live.

<a name="end-product"></a>
# 7. End Product
  [Go to the top](#table-of-contents)

  Please fine below a screenshot of each page:

  Home page UI:
  ![home page preview](assets/images/home_end_product)

  Career page UI:
  ![career page preview](assets/images/career_end_product)

  Testimonials page UI:
  ![testimonials page preview](assets/images/testimonials_end_product)

  Gallery page UI:
  ![gallery page preview](assets/images/gallery_end_product)

  Contact page UI:
  ![contact page preview](assets/images/contact_end_product)

<a name="known-bugs"></a>
# 8. Known Bugs
  [Go to the top](#table-of-contents)

  - On some mobile devices the navigation bar appears behind the content. This was rectified by adding a z-index to the CSS for the navigation bar.
  - My first implementation of the navigation bar was not responsive on mobile devices, meaning that the design was floating off the screen. This was rectified by implementing a new navbar that included a hamburger style button when the screen size gets smaller.
  - The form styling on some mobile devices do not match the web styles. This was rectified by adding WebKit appearance, appearance in the CSS and set the value to none.
  - The video on the home page was not responsive. This was fixed by adding a height value in the CSS in smaller media queries.
  - The managerial career stats section was also not responsive. This was fixed by adding a smaller font-size value to the media query of max-width 635px. This allowed the whole section to be visible on mobile devices.

<a name="credits"></a>
# 9. Credits
  [Go to the top](#table-of-contents)

### Code
 * The navigation bar code came from [Code Pen](https://codepen.io/puskuruk/pen/bGbexXd)
 * The cards view on the index.html was inspired from [Code Pen](https://codepen.io/mcraiganthony/pen/NxGxqm)
 * The timeline feature on the career.html and awards.html page was inspired from [W3Schools](https://www.w3schools.com/howto/howto_css_timeline.asp)
 * The footer code came from the Love Running projects
 * The collage design was inspired by [W3Schools](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_grid_responsive)
 * The gallery page has a hover effect on the image the code came from [W3Schools](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_image_overlay_opacity)
 * The icons in the footer and contact page came from [Font Awesome](https://fontawesome.com/)


### Content
 * All quotes on the index.html page came from [Planet Football](https://www.planetfootball.com/quick-reads/19-of-the-best-quotes-about-sir-alex-ferguson-such-an-iconic-person/)
 * The timeline content on the career.html page came from [Wikipedia](https://en.wikipedia.org/wiki/Alex_Ferguson)
 * All images came from [Google Images](https://www.google.com/imghp?hl=en)
