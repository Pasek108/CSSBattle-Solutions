# CSSBattle Solutions - Readme
> [!CAUTION]  
> <h4>Please, don't look at my solutions until you have completed it yourself.</h4>
> Challenges like that are opportunity to become better by coming up with your own solution. Take your time and think about your own approach.<br>
> If you can't complete challenge, skip it and come back to it later. Look at someone's solutions as a last resort but consider it as defeat.

<br>

## Table of Contents
* [What is CSSBattle](#what-is-cssbattle)
  * [Useful links](#useful-links)
* [Project overview](#project-overview)
  * [Technologies](#technologies)
  * [Features](#features)
* [Project details](#project-details)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

## What is CSSBattle
[CSSBattle](https://cssbattle.dev) is an online game where players compete with each other to create the shortest and most effective CSS code to recreate visual shapes and patterns. 
CSSBattle is a fun and challenging way to improve CSS coding skills while competing with other players.

----------------------------------

### Useful links
- [CSSBattle Previewer 2.1](https://tc70f3.csb.app)
- [CSSBattle Unit Converter](https://u9kels.csb.app)
- [CSSBattle getting started](https://cssbattle.dev/blog/getting-started)
- [CSSBattle tips](https://cssbattle.dev/tips)

<br>

## Project overview
The project contains my normal and minimal solutions for [CSSBattle](https://cssbattle.dev) challanges.

Check my [CSSBattle profile](https://cssbattle.dev/player/artur_pas) and see [live demo](https://pasek108.github.io/CSSBattle-Solutions/).

![preview](/_for_readme/preview.png)

----------------------------------

### Technologies
Languages:
- HTML
- CSS
- JS
  
Libraries and frameworks:
- [GoogleFonts](https://fonts.google.com)
- [hilight.js](https://highlightjs.org)

Programs:
- [VSCode](https://code.visualstudio.com)

----------------------------------

### Features
- Nice and responsive UI
- Solution preview
  - Code hilighting
  - Characters counter
  - Loading real html for preview
  - Switching between solutions
- List of challenges
  - Choosing challenge to preview
  - Grouping by battle
  - Disabling not attempted challenges

----------------------------------

## Project details
This section is a general description of the project required to understand how it works, the exact details are in the code or simply are the code.

### User interface
#### Solution preview
![main menu](/_for_readme/solution_preview.png)
Solution preview has 3 sections:
- Code section shows:
  - Hilighted code
  - Characters count
- Preview section shows:
  - Real html solution
  - Switch between solutions
- Target section shows:
  - Image target to recreate
  - Links to challenge and battle
  - Solution match precentage

----------------------------------

#### Challenges list
![achievements](/_for_readme/challenges_list.png)
Challenges list view shows all challenges grouped by battle in increasing order. 

The challenges are numbered and can be in disbaled state that means I didn't attempt the challenge yet.

----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: CSSBattle-Solutions (project folder)
  - :page_facing_up: *github config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Images - :page_facing_up: *images used in the project*
  - :file_folder: Scripts - :page_facing_up: *scripts used in project*
  - :file_folder: Styles - :page_facing_up: *css files used in project*
  - :file_folder: Challenges
    - :file_folder: *challenge_name*
      - :page_facing_up: *.png target to recretae*
      - :page_facing_up: *.html minimal and normal solution*
    - :file_folder: *other challenges...*
  
----------------------------------

### Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

----------------------------------

#### script.js
This is the starting file of the program. 

Contains the required challenges and battles data:
- challenges [solved, folder_name, match_precentage]
- battles [battle_name, last_challenge_id]

Creates:
- ChallengesData
- SolutionPreview 

----------------------------------

#### ChallengesData
Takes required data of challenges and battles and then:
- Creates array of challenges objects with challenge data and links to its resources
- Creates array of battles objects with with battle data and links to its resources
- Connects challenges to the battles which they are part of

----------------------------------

#### SolutionPreview
Takes ChallengesData object, creates ChallengesList and is responsible for:
- Loading solution 
- Counting solution length
- Hilighting code
- Switching between normal and minimal solution

----------------------------------

#### ChallengesList
Takes ChallengesData and  SolutionPreview objects and is responsible for:
- Creating list of challenges grouped by battle 
- Toggling list of all challenges
- Initializing the loading of another challenge solution preview
