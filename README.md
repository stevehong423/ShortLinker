SHORTLINK - Custom URL Generator

START THE APPLICATION: 
1. Clone the Repository onto your local machine.
2. Open the Project onto your IDE. 
3. Open your terminal, and type in 'npm i', to install node_modules.
4. Navigate to the client directory, with 'cd client'.
5. Install client-side node_modules with 'npm i'.
6. Navigate back out to the root directory with 'cd ..'
7. Run the application with 'npm run dev', which will run client and server side together with concurrently.




ALGORITHM/SOLUTION TO GENERATE RANDOM LINK:

I installed the package 'uniqid' to generate a random string.  If you navigate to shortenURL.js inside of the Routes/Api directory,
you will discover a POST Request (which is invoked upon the user clicking a button), that checks if the URL already exists in the database
(which is a MongoDB database).  If it's a branch new URL, the algorithm creates a new instance of the URL schema, putting in uniqid() as the value
for the ID.  This ID is than attached to "http://short.link/<insert id hash here>".  This can be seen in App.js on the client side, where I used 'data.id' 
and 'result.data.hash'.  
