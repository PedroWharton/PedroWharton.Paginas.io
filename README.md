# A Page for my mother
#### Video Demo:  <https://youtu.be/JdodVQkHRRE>
#### Description:

My Name is Pedro Wharton and this is my Final Project for cs50 introduction to computer science.
When I was wondering what should my project be about I went through a lot of ideas, but I was always circling
back to making a webpage for my mother who is a photographer.
I wanted to make a very simple webpage that was elegant and easy to use and to achieve this I used a Content Management System.
I believe that after a lot of work I have exceeded my own expectations and I'm very happy with the project.

I will now carry on to explain each file in the project:

###### index.html:

This is the main page where I create the navigation bar, the page footer and a full screen photo slider.
   For the navigation bar I wanted to make it simple and easy to use but at the same time responsive and nice to look at.
To do this I created a div that contained the page logo with an unordered list containing the links to every page and its responsive copy.
   Then for the photo slider I created a section with an unordered list containing the photos and buttons to the different pages, the slider function was made with javascript by the CMS.
The hard thing about this was to make it responsive cause some photos didn't respond the way they should so I struggled with the css for this section.
   For the footer I simply added a logo with an href to the homepage and text with the copyright for the photos.

###### Inicio.css:

This is the css file for index.html.
   In this file I set all pictures to look the way they should and try to make it correctly responsive,
I also added there should be no pointer events on images so as to make it harder to download the pictures for non coders.

###### Paisajes.html:

This is one of the photo display pages, in here I copied and pasted the nav bar and the footer from index.html.
   For this page I simply created a section with divisions in which each division is a different picture.
And I also added a shade and expansion with mouseover and responsive design for the display of the pictures.

###### Retratos.html:

This is another one of the photo display pages, it is basically the same code as Paisajes.html but with more and different pictures.

###### Deportes.html:

This is the last of the photo display pages, it is again basically the same  as Paisajes.html and Retratos.html but with different pictures.

###### Paisajes.css Retratos.css Deportes.css:

These 3 are basically the same file but modified for every different html one. Setting the picture's size and responsive design.
These files also have the no pointer events on images to make it harder to download the pictures.

###### Contacto.html:

This is the last of the pages, it's the content page that has a picture of the photographer and a button with an href to the photographer's instagram.
It has a logo and other contact information, number and email.
The challenge in this file was to make it correctly responsive because I made a lot of mistakes and it took me a lot of time to correct it.

###### Contacto.css:

This is the css file for Contacto.html and as mentioned above the challenge here was to make it responsive specially because of the picture format.

###### jquery.js nicepage.js:

These are the two files containing the javascript of the page.
This file was written by the CMS.

###### nice page.css:

This is the css file containing the css for the footer and the nav bar for all the other html files.
This file was written by the CMS.


