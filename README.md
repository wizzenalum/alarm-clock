# Alarm clock for desktop
This a web application that present the time as in old wall clock way with alarm for the day.
## Usage
1. Visit the application. HyperLink given at 4th point.
2. Now, you can read time from wall clock  and add teh alarm.
3. in alram list if color of alarm is continously changing that means this alarm is over.
4. That's it..... NOW, visit [here](https://wizzenalum.github.io/alarm-clock/) 


## For developers
> To know in depth about this application, you can visit my [youtube-video](https://youtu.be/e4N5PMvieXs). \
> Recreation of the application will need vanila javascript, html, css only.

## How to setup on local machine
To use this repository on your local machine, you only need one broweser chrome, firefox etc. 

1. Now clone this repository
```go
git clone https://github.com/wizzenalum/alarm-clock.git
```
2. Change directory to alarm-clock
```go
cd alarm-clock/
```
3. open index.html file in browser that's it.


### Folder structure
this is minimilistic folder structure with entry point index.html.
>├── README.md  \
>├── index.html \
>├── scripts    \
>│   ├── clockTiime.js  \
>│   └── index.js   \
>├── src    \
>│   ├── clock-original.svg \
>│   ├── clock.png  \
>│   ├── hour.png   \
>│   ├── minute.png \
>│   └── second.png \
>└── styles \
>    └── style.css 

### File wise code
Here you will know which file have what and what functionalities it do.

1. Entry point of the project index.html has metadata, link for css, link for script file and all the view elements used in the view. except the list of the alarm that will be created during the run time.
2. style.css has all the styling and animations in it except the clock hand motion which is handle in java script. By the way css is minimilist but enough to make presentable.
3. clockTime.js export a class called "Clock" which will create a object that resembles the actual clock with extra functionalities. it stores the clock name, time, list of alarms and offset angle. To handle these properties it also has functions to calculte, to get, to set the properties.

4. index.js do many tasks like attaching the event listners, creating the list of alarm, handling the events and managing the clock motion.



- Thanks to [TeeFarm], [Phuong-Thai-Thi-Quynh] to providing these high quality matterial freely available.


[TeeFarm](https://pixabay.com/users/teefarm-199315/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1605224)
[Phuong-Thai-Thi-Quynh](https://pixabay.com/users/phuonglucky-20908332/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6556959)
