# EDICO Designs Portfolio Project

This project was created with React, Firebase, and Supabase; Its still in progress but is a representation of a desktop oS with the user's preference between Windows oS and Mac oS for the Theme toggle. This imitation will eventually have:

- Portfolio images that open an iFrame to their live codepen ✅
- Downloadable resume✅
- Booking Calendar ✅
- 'Email' client for contact form✅
- For mobile screen sizes, toggle between Android oS and iOS
- Ability to open multiple file explorers at the same time ✅
- Address the theme toggle zindex when Dialogs are open vs maximized✅
- Add more portfolio items and the option to toggle between 'live projects', websites / videos , graphics etc.
- add onto the skills to make it more of a resume
- look at the navbar height/taksbar offset custom properties and figure out why they are still wonky.
- Drag the dialogs?
- Ensure the most recently opened dialog has the highest zindex; when they are minimized they shouldnt go on top of each other;
- address the height styling: on apple, if natural size (not maximized) it should be between the navbar and the taskbar, on microsoft, should be above the navbar.✅

## Disclaimer: This will not have all the functionality as a desktop computer; It is just a fun interface and hopefully an interesting UX but is an emulation not an exact replica

# Updating github Actions

- Navigate to settings > Environments and Secrets
- for the secret SSH_PRIVATE_KEY, log in via ssh and use cmd cat ~/.ssh/id_rsa
- copy the entire conents including “-----BEGIN OPENSSH PRIVATE KEY----- “and "-----END OPENSSH PRIVATE KEY-----"
- paste it into gh SSH_PRIVATE_KEY value
