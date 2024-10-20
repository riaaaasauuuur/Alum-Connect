GITHUB REPOSITORY LINK:
https://github.com/riaaaasauuuur/Alum-Connect

Cloning a GitHub Repository
1. Install Git (if you haven't already):
- On Windows: Download from [git-scm.com](https://git-scm.com/).
- On macOS: You can install via Homebrew with `brew install git`.
- On Linux: Use your package manager, e.g., `sudo apt install git` for Debian-based systems.

2. Open your terminal/command prompt

3. Clone the repository
Replace `REPOSITORY_URL` with the URL of the repository you want to clone.
git clone REPOSITORY_

Installing the NPM Web App
1. Navigate to the project directory
cd project-directory

Replace `project-directory` with the name of the cloned repository folder.

2. Install dependencies
Ensure you have Node.js and NPM installed. If not, download from [nodejs.org](https://nodejs.org/).
Then run:
npm install

3. Start the app
Typically, you can start the application using:
npm start

npm run dev

Database Installation with PostgreSQL
1. Install PostgreSQL
- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).
- Follow the installation instructions specific to your operating system.

2. Install TablePlus
- Download TablePlus from [tableplus.com](https://tableplus.com/download).
- Install it according to your OS instructions.

3. Create a Database
- Open TablePlus and connect to your PostgreSQL server.
- Click on the `Create a New Database` button.
- Enter a name for your database and click `Create`.

4. Configure the Application
- Update the application’s configuration file (often `.env`) with the database connection details:

DB_HOST= localhost
DB_PORT= 5000
DB_NAME= pup_db 
DB_USER= root
DB_PASSWORD= pupalumconnect


5. Run Migrations (if applicable):
- If your app uses migrations, run the migration command (this may vary by framework, e.g., Sequelize, Knex):

npm run migrate

6. Seed the Database (if applicable):
- If your app has seed data, run the seed command:

npm run seed


ACCOUNT INFORMATION
1. GMAIL ACCOUNTS (FOR NOTIFICATIONS & CHANGE PASSWORD)
USER SIDE:
Email: rheacrystalang@gmail.com
Password: 5331_4526

ADMIN SIDE:
Email: pupalumconnect@gmail.com
Password: 4526_5331

2. ALUMCONNECT SYSTEM (FOR SYSTEM FUNCTIONALITY)
USER SIDE:
Email: rheacrystalang@gmail.com
Password: 123

ADMIN SIDE:
Email: pupalumconnect@gmail.com
Password: 123

