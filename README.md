# Fitness Tracker
https://main--activity-tracker-pro.netlify.app

Plan:

1. ✅ DONE. Implement User Authentication + Add Google Auth from Firebase.
   <img width="400" alt="fitness-tracker" src="https://github.com/catherinekomi/fitness-tracker/assets/64502672/03d5ee8d-ffb3-4905-a76e-9665877ba85d">

2. ✅ DONE. Add Header to every page for easy navigation
   What Pages?

   - '/'
   - '/profile'
   - '/my-workout-log'
     What is in the header?
     IF login:
     SHOW:
   - my profile
   - my workouts
   - record a workout
   - explore with Google Map(just the redirect for now)
     ELSE:
     SHOW:
   - login
   - explore with Google Map(just the redirect for now)

   <img width="400" alt="Screen Shot 2024-06-17 at 4 08 47 PM" src="https://github.com/catherinekomi/fitness-tracker/assets/64502672/f813995f-9e52-4e45-990f-67b9a3bb6f95">

3. ✅ DONE. Add More Info to Profile Page ->
   ADD:
   Name, Height, Weight, City, State, Picture,
   Fav Hobbies
<img width="400" alt="Screen Shot 2024-06-17 at 4 08 27 PM" src="https://github.com/catherinekomi/fitness-tracker/assets/64502672/026a409b-af2e-4a61-b6ee-52b52ebf4222">

4. Start building a record workout page
   Pick a workout(button with small logo): Run, Hike, Walk for now
   When you click on button it will start recording in 3..2..1
   Then it will show timer with:

- add timer 3-2-1 functionality before it starts recording
- add dummy user for showing’s
- Upload a picture?
- Update City and State on the same level on the page
- ✅ add sport type svg/png
- ✅ Pause
- ✅ Stop functionality
- ✅ Then add permission to fetch and write Workout data
- ✅ Show recent workouts first
- ✅ Build components for displaying workout history (WorkoutLog.js)
<img width="400" alt="Screen Shot 2024-07-25 at 1 12 43 PM" src="https://github.com/user-attachments/assets/1a886456-6d4e-4ed7-863a-4d495862a54f">
<img width="400" alt="Screen Shot 2024-07-29 at 7 12 36 PM" src="https://github.com/user-attachments/assets/884d8b83-cd1a-42a3-931c-b5221d1ffcaf">

5. Add ft. to height in the profile or add another window for cm
6. Figure How to upload and store profile Picture
7. Should I add a main page with API articles about sport? Olympics? Achievements?
8. Set Up Google Maps API to showcase the route for the hike/run etc?
9. Add 'Delete Workout' Button AND 'Rename Button' for every recorded workout
10. Add location such as city to the workout?
11. Integrate Chart.js or D3.js for data visualization
12. Add amount of calories burnt for every activity(util file likely)
13. Add Socials
14. Integrate from wearable devices, apple watch?
15. maybe add notifications and reminders
16. write documentation

PS
Add logic where page does not exsists, 404 it

React, JavaScript, React Router, Material-UI?, Firebase, Redux
Chart.js or D3.js
Google Maps API
