# BloodMates

Red Hope is a platform dedicated to connecting blood donors with hospitals in need. Our mission is to save lives through efficient blood donation coordination.

**STEPS TO USE:**
1 : Online Form - Donors complete a simple online form. Basic information is all that's needed.
2 : Profile Creation - A secure profile is created. This allows for easy updates and management.
3 : Confirmation - Donors receive confirmation. They are then ready to be contacted.

**🚀 KEY FEATURES :**
1. User Authentication: Secure authentication for donors and hospitals.
2. Blood Donation Requests: Donors can register and respond to donation requests.
3. Hospital Management: Hospitals can request blood donations and manage stocks.
4. Real-Time Location Sharing: Uses Socket.IO to share donor locations.
5. Automated Blood Stock Checks: Periodically checks blood stock levels using node-cron.
6. Email Notifications: Uses nodemailer to send alerts and confirmations.
7. Session Management: Implements express-session and connect-flash for user sessions and notifications.
8. View Engine: Uses EJS for rendering dynamic pages.

**TECHNOLOGY USED :**

● 𝗕𝗮𝗰𝗸𝗲𝗻𝗱: Node.js, Express.js
● 𝗗𝗮𝘁𝗮𝗯𝗮𝘀𝗲:: MongoDB with Mongoose ORM
● 𝗙𝗿𝗼𝗻𝘁𝗲𝗻𝗱: EJS (Embedded JavaScript)
● 𝗥𝗲𝗮𝗹-𝗧𝗶𝗺𝗲 𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝗰𝗮𝘁𝗶𝗼𝗻: Socket.IO
● 𝗔𝘂𝘁𝗵𝗲𝗻𝘁𝗶𝗰𝗮𝘁𝗶𝗼𝗻 & 𝗦𝗲𝗰𝘂𝗿𝗶𝘁𝘆: bcrypt, JSON Web Token (JWT)
● 𝗘𝗻𝘃𝗶𝗿𝗼𝗻𝗺𝗲𝗻𝘁 𝗩𝗮𝗿𝗶𝗮𝗯𝗹𝗲𝘀: dotenv
● 𝗧𝗮𝘀𝗸 𝗦𝗰𝗵𝗲𝗱𝘂𝗹𝗶𝗻𝗴: node-cron
● 𝗘𝗺𝗮𝗶𝗹 𝗦𝗲𝗿𝘃𝗶𝗰𝗲𝘀: nodemailer

**Installation**

Clone the repository:
      git clone https://github.com/yourusername/BloodMates.git
      cd BloodMates

Install dependencies:
      npm install

Configure environment variables: Create a .env file and add:
      PORT=8000
      MONGO_URI=mongodb://localhost:27017/bloodmates
      SESSION_SECRET=your_secret_key

Start the server:
      npm start
