# CompassApp

The Compass App is a comprehensive full-stack application that I designed and developed to assist me in having a structured, organized, and efficient lifestyle. Originally created as a Java application in 2022, I later transformed it into a React Native application to enhance its functionality and accessibility. This app acts as my compass and guides me in the right direction to achieve all personal and professional goals. I use the Compass App daily, and it has significantly contributed to my growth across all areas of life. This application includes various useful features such as a Todo List, Budget Tracker, Diet Tracker, and a framework for setting and tracking weekly, monthly, and yearly goals. I will go through the app's key features, explain their impact on my life, and provide insights into technical implementation details.

**Disclaimer:** Some of the data shown in screenshots and videos, such as financial information, is randomly generated to simulate realistic usage within the application. It does not represent actual data or reflect any real-life information.

**Sections**
- [Todo List](#todo-list)
- [Diet Tracker](#diet-tracker)
- [Life Ultimate Team](#life-ultimate-team)
- [Compass](#compass)
- [Dashboard](#dashboard)
- [Login and Security](#login-and-security)


---

### Todo List

<div style="display: flex; align-items: flex-start; gap: 20px;" align = "left">
    <p>
  The Todo List section allows me to systematically get difficult tasks done by adding them to my Todo List and breaking it down into manageable sub-tasks, which I finish one hour at a time. The app tracks how many hours I spend on completing tasks on a daily, weekly, and monthly basis. Whenever I finish an hour of work, the app logs the hour and also tracks which responsibility the task was for, such as Training, Career, or a University Course. This allows me to effectively manage and allocate my time and maximize my efficiency. I can add tasks to the Todo List by selecting subtasks from my responsibilities. The demo below illustrates how the Todo List component works.
  </p>
  
[Click for Demo](https://kshoker12.github.io/CompassApp/images/demos/tododemo.mp4)
  
  <img 
    src="https://github.com/user-attachments/assets/79dd2b0a-edd1-407c-bc28-1219df1c7ded" 
    width="200" 
    alt="Todo List Demo"
  />
</div>

---

### Diet Tracker

<div>
  <p>
    The Diet Tracker section allows me to monitor my nutritional intake systematically by logging my daily fitness activities and the macronutrient content of my daily meals. 
    The app provides daily, weekly, and monthly summaries of my dietary habits and helps me stay on track with my fitness and health goals. It also includes my favourite recipes. 
    The demo below illustrates how the Diet Tracker component works.
  </p>

  [Click for Demo](https://kshoker12.github.io/CompassApp/images/demos/dietdemo.mp4)
  
  <img 
    src="https://github.com/user-attachments/assets/5de2ad5b-2b43-4ca3-a81d-f301d26eb30e" 
    width="200" 
    style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" 
    alt="Diet Tracker Demo"
  />
</div>

---

### Life Ultimate Team

<div>
  <p>
      Life Ultimate Team is inspired by Hockey Ultimate Team and Fifa Ultimate Team from the video games I played when I was younger. Essentially, it provides me with quantifiable metrics to track my progress in life by giving myself a daily rating from 1-10 for various attributes such as mindset, work-ethic, and social skills and my overall rating is an average of my rating for all attributes. This allows me to hold myself accountable and reflect on my day and what areas I need to improve on. The images below compares my implementation of a Life Ultimate Team card compared to a Fifa Ultimate Team card of Lionel Messi. The demo illustrates how Life Ultimate Team section works. 
  </p>
  
  [Click for Demo](https://kshoker12.github.io/CompassApp/images/demos/ratingdemo.mp4)

<img 
    src="https://github.com/user-attachments/assets/ae175302-809b-4642-b739-512764ffa32e"
    width="200" 
    style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" 
    alt="Diet Tracker Demo"
  />
  <img 
    src="https://github.com/user-attachments/assets/78251a9c-3a2c-4ce6-acde-e16d58817dbd"
    width="300" 
    style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" 
    alt="Diet Tracker Demo"
  />

</div>



---

### Compass

<div>
  <p>
   The compass section is a framework which I developed which allows me to set Yearly, Monthly, and Weekly goals. Every week I get assigned a percentage for the week based on my progression towards my weekly goals. The weekly percentage, hours I spend working, and mistakes I make are all tracked for each week, allowing me to analyze patterns and trends in my progression which lets make effective decisions and systematically track my progress. Additionally, if I achieve a score of 90% or higher in a week, I reward myself with a champion status which gives me motivation to keep achieving my weekly goals. This championship status is inspired by watching UFC and boxing. The compass section has been life-changing and helped me progress towards my goals. The demos below illustrates how the compass section works. 
  </p>

[Click for Demo 1](https://kshoker12.github.io/CompassApp/images/demos/wcompassdemo.mp4)

[Click for Demo 2](https://kshoker12.github.io/CompassApp/images/demos/compassdemo.mp4)

  <img 
    src="https://github.com/user-attachments/assets/87a1777e-9db9-4169-ad46-7881ebe0d3b0"
    width="200" 
    style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" 
    alt="Diet Tracker Demo"
  />
</div>

---

### Dashboard

<div>
    <p>
        The dashboard for the Compass App has a summary and charts to track progression for each section such as my overall rating from Life Ultimate Team, hours I have spent working during the week, number of tasks completed in Todo List, my networth, and the number of times I have had champion status and if I have champion status, a UFC championship belt is displayed in dashboard. Additionally, I use Zen Quotes API to generate motivational quotes which is highlighted as the Quote of the Day to motivate me and inspire me with new ideas. It also has a picture of my favourite boxer Dmitry Bivol since he inspires me to work hard and achieve my goals. It also allows me to manage my responsibilities and add tasks for each responsibility. The demos illustrate key features of Dashboard.
  </p>

[Click for Demo 1](https://kshoker12.github.io/CompassApp/images/demos/dashboarddemo.mp4)

[Click for Demo 2](https://kshoker12.github.io/CompassApp/images/demos/dashboarddemo2.mp4)
  
  <img 
    src="https://github.com/user-attachments/assets/6b5b1d3d-6b41-45cc-8353-80e12e25800d"
    width="200" 
    style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" 
    alt="Diet Tracker Demo"
  />
</div>

---


### Login and Security

<div>
    <p>
       Everytime I open Compass App, I'm prompted to provide my 6-digit passcode for authentication. If the password is correct, an API call to the backend Django database is made and all the data for the Compass App is retrieved. This is implemented in a highly secure manner and uses authenticated sessions via tokens which keeps my personal data for the app secure. The demo illustrates the login process. 
  </p>

[Click for Demo](https://kshoker12.github.io/CompassApp/images/demos/login.mp4)
  
  <img 
    src="https://github.com/user-attachments/assets/21f9331c-7a0b-41cc-9023-90f45bd128cd"
    width="200" 
    style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" 
    alt="Diet Tracker Demo"
  />
</div>

